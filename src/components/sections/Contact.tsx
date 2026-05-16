import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { siteConfig } from "@/data/site.config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xgvreprq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        toast.success("Message sent!", {
          description: "I'll get back to you soon.",
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = (await response
          .json()
          .catch(() => ({ message: "Unknown error" }))) as {
          message?: string;
          errors?: Array<{ message: string }>;
        };
        toast.error("Failed to send message", {
          description:
            errorData.errors?.[0]?.message ||
            errorData.message ||
            "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("Failed to send message", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = siteConfig.socials.filter((s) => s.label !== "Email");

  return (
    <section
      id="contact"
      className="container mx-auto px-4 py-24 reveal-on-scroll"
    >
      <SectionLabel number="05" label="contact" />

      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-display font-semibold mb-2">
            Get in touch
          </h2>
          <p className="text-muted-foreground mb-8">
            Looking for 2026 new-grad SWE roles in backend, infrastructure,
            devtools, AI tooling, and platform engineering.
          </p>

          <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-border">
            <a
              href="mailto:divkix@divkix.me"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/divkix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/divkix/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/resume/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Resume
            </a>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center">
              <p className="text-lg text-primary font-medium">
                Message sent. Expect a response within 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  className="input-focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                  aria-required="true"
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  {...register("name")}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="input-focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                  aria-required="true"
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Your message..."
                  rows={5}
                  className="input-focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none"
                  aria-required="true"
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  {...register("message")}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-sm text-muted-foreground space-y-1">
          <p>Or reach me directly:</p>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} profile`}
              className="block text-primary hover:text-primary/80 transition-colors"
            >
              {social.href
                .replace(/^https?:\/\/(www\.)?/, "")
                .replace(/\/$/, "")}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
