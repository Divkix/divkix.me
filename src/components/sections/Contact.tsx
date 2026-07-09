import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site.config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
    setServerError(null);

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
        const errorMessage =
          errorData.errors?.[0]?.message ||
          errorData.message ||
          "Please try again later.";
        setServerError(errorMessage);
        toast.error("Failed to send message", {
          description: errorMessage,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setServerError(errorMessage);
      toast.error("Failed to send message", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = siteConfig.socials.filter((s) => s.label !== "Email");

  return (
    <section id="contact" className="text-band min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-(--space-xl) items-start min-w-0">
        <div className="min-w-0 space-y-(--space-md)">
          <SectionHeading
            title="Say hello"
            description="Open to full-time software engineering roles — backend, infrastructure, developer tools, AI platforms. Also happy to talk side projects, Cloudflare Workers, or something you're stuck on."
          />

          <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
            Email is fastest. Resume is one click. Or send a short note with the
            form.
          </p>

          <div className="space-y-3">
            <p className="m-0">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-base text-primary link-underline-grow"
                rel="me author"
                aria-label={`Email ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="m-0">
              <a
                href="/resume"
                className="text-sm text-foreground link-underline-grow"
              >
                Download resume <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-(--space-md) gap-y-2 m-0 p-0 list-none">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-sm text-muted-foreground hover:text-foreground link-underline-grow whitespace-nowrap transition-colors"
                  aria-label={`Opens in new tab: ${social.label}`}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground mb-(--space-sm)">
            Prefer a form? Leave a note below.
          </p>
          <div className="border border-border bg-card p-(--space-md) md:p-(--space-lg)">
            {isSuccess ? (
              <p
                role="status"
                aria-live="polite"
                className="text-base text-primary font-medium py-(--space-lg) text-center"
              >
                Message sent. I'll reply within a day or two.
              </p>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-(--space-md)"
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
                      className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
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
                      className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
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
                      className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none"
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

                  {serverError && (
                    <p
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {serverError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={
                      isSubmitting ? "Sending message" : "Send message"
                    }
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

                <noscript>
                  <form
                    action="https://formspree.io/f/xgvreprq"
                    method="POST"
                    className="space-y-(--space-md) mt-(--space-md)"
                  >
                    <div>
                      <label
                        htmlFor="noscript-contact-name"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="noscript-contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noscript-contact-email"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="noscript-contact-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noscript-contact-message"
                        className="block text-sm font-medium mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="noscript-contact-message"
                        name="message"
                        placeholder="What's on your mind?"
                        rows={5}
                        required
                        className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary">
                      Send message
                    </button>
                  </form>
                </noscript>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactWithBoundary() {
  return (
    <ErrorBoundary>
      <Contact />
    </ErrorBoundary>
  );
}
