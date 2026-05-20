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
    <section id="contact" className="text-band min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[var(--space-xl)] items-start min-w-0">
        <div className="min-w-0 space-y-[var(--space-md)]">
          <SectionHeading
            title="Say hello"
            description="I'm open to full-time software engineering roles starting May 2026. Backend, infrastructure, developer tools, AI platform work. Also happy to chat about side projects, Cloudflare Workers, or anything you're stuck on."
          />

          <div className="space-y-2 text-muted-foreground">
            <p>
              <a
                href="mailto:divkix@divkix.me"
                className="text-primary link-underline-grow whitespace-nowrap uppercase text-xs tracking-[0.18em]"
                rel="me author"
              >
                divkix@divkix.me
              </a>
            </p>
            <p>
              <a
                href="/resume"
                className="text-primary link-underline-grow whitespace-nowrap uppercase text-xs tracking-[0.18em]"
              >
                Download resume
              </a>
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-[var(--space-md)] gap-y-2 m-0 p-0 list-none">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-xs text-muted-foreground hover:text-foreground link-underline-grow whitespace-nowrap transition-colors uppercase tracking-[0.18em]"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <div className="border border-border bg-card p-[var(--space-md)] md:p-[var(--space-lg)]">
            {isSuccess ? (
              <p
                role="status"
                aria-live="polite"
                className="text-base text-primary font-medium py-[var(--space-lg)] text-center"
              >
                Message sent. I'll reply within a day or two.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-[var(--space-md)]"
              >
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
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
