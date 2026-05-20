import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SectionHeading } from "@/components/shared/SectionHeading";
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
        toast.success("Message sent", {
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
      className="container mx-auto px-4 py-16 md:py-24 max-w-6xl"
    >
      <div className="split-studio">
        <div className="split-studio-content min-w-0 space-y-6">
          <SectionHeading
            title="Say hello"
            description="Open to full-time software engineering roles starting May/June 2026 — backend, infrastructure, developer tools, and platform work."
          />

          <div className="space-y-3 text-muted-foreground">
            <p>
              <a
                href="mailto:divkix@divkix.me"
                className="text-primary link-underline-grow whitespace-nowrap"
              >
                divkix@divkix.me
              </a>
            </p>
            <p>
              <a
                href="/resume"
                className="text-primary link-underline-grow whitespace-nowrap"
              >
                Download resume
              </a>
            </p>
          </div>

          <ul className="space-y-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground link-underline-grow whitespace-nowrap transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="split-studio-proof min-w-0">
          <div className="border border-border bg-card p-6 md:p-8">
            {isSuccess ? (
              <p className="text-lg text-primary font-medium py-8 text-center">
                Message sent. I'll reply within a day or two.
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                    className="input-focus-ring w-full rounded-[var(--radius-input)] border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    aria-required="true"
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    aria-invalid={errors.name ? true : undefined}
                    {...register("name")}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-xs text-destructive mt-1"
                      role="alert"
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
                    className="input-focus-ring w-full rounded-[var(--radius-input)] border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    aria-required="true"
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    aria-invalid={errors.email ? true : undefined}
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-xs text-destructive mt-1"
                      role="alert"
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
                    placeholder="What's on your mind?"
                    rows={5}
                    className="input-focus-ring w-full rounded-[var(--radius-input)] border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none"
                    aria-required="true"
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    aria-invalid={errors.message ? true : undefined}
                    {...register("message")}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="text-xs text-destructive mt-1"
                      role="alert"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-[var(--radius-input)] bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 h-11 px-6 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </span>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
