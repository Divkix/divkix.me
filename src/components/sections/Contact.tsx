import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site.config";

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const DRAFT_KEY = "contact-draft";
const FORMSPREE_URL = "https://formspree.io/f/xgvreprq";
const NETWORK_ERROR = `Could not reach the server. Check your connection and try again, or email ${siteConfig.email}.`;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z.string().trim().max(254).pipe(z.email("Invalid email address.")),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, `Message must be at least ${MESSAGE_MIN} characters.`)
    .max(MESSAGE_MAX, `Message must be at most ${MESSAGE_MAX} characters.`),
});

const draftSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactErrorSchema = z.object({
  message: z.string().optional(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    subscribe,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const messageLength = (useWatch({ control, name: "message" }) ?? "").trim()
    .length;

  // ClientRouter re-mounts this island on every visit, so keep the unsent
  // draft in sessionStorage to survive Back and reload. Storage can throw when
  // the browser blocks site data; the draft is best-effort.
  useEffect(() => {
    try {
      const draft = draftSchema.safeParse(
        JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "null"),
      );
      if (draft.success) reset(draft.data, { keepDefaultValues: true });
      return subscribe({
        formState: { values: true },
        callback: ({ values }) =>
          sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values)),
      });
    } catch {
      return undefined;
    }
  }, [reset, subscribe]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch(FORMSPREE_URL, {
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
          description: "I'll reply within a day or two.",
        });
      } else {
        const errorResult = contactErrorSchema.safeParse(
          await response.json().catch(() => ({ message: "Unknown error" })),
        );
        const errorData = errorResult.success ? errorResult.data : undefined;
        const errorMessage =
          errorData?.errors?.[0]?.message ||
          errorData?.message ||
          "Please try again later.";
        setServerError(errorMessage);
        toast.error("Failed to send message", {
          description: errorMessage,
        });
      }
    } catch {
      setServerError(NETWORK_ERROR);
      toast.error("Failed to send message", {
        description: NETWORK_ERROR,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = siteConfig.socials.filter((s) => s.label !== "Email");

  return (
    <section
      id="contact"
      className="text-band min-w-0 scroll-mt-40 md:scroll-mt-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-(--space-xl) items-start min-w-0">
        <div className="min-w-0 space-y-(--space-md)">
          <SectionHeading
            title="Say hello"
            description="Happy to talk side projects, Cloudflare Workers, or something you're stuck on."
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
                Download resume{" "}
                <span aria-hidden="true" className="ascii-arrow">
                  -&gt;
                </span>
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
              <div className="py-(--space-lg) text-center space-y-(--space-md)">
                <p
                  role="status"
                  aria-live="polite"
                  className="text-base text-primary font-medium"
                >
                  Message sent. I'll reply within a day or two.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="btn-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                // Without JS this posts straight to Formspree. Astro's router
                // strips <noscript> on client navigation, so a separate
                // noscript form would break hydration.
                action={FORMSPREE_URL}
                method="POST"
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
                    required
                    maxLength={100}
                    className="input-focus-ring w-full min-h-11 rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
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
                    required
                    maxLength={254}
                    className="input-focus-ring w-full min-h-11 rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
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
                    placeholder="Describe your question or project"
                    rows={5}
                    required
                    className="input-focus-ring w-full rounded-(--radius-input) border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground resize-none"
                    aria-required="true"
                    aria-describedby={
                      errors.message
                        ? "contact-message-hint contact-message-error"
                        : "contact-message-hint"
                    }
                    aria-invalid={errors.message ? true : undefined}
                    {...register("message")}
                    disabled={isSubmitting}
                  />
                  <p
                    id="contact-message-hint"
                    className="flex justify-between gap-2 text-xs text-muted-foreground mt-1"
                  >
                    <span>
                      {MESSAGE_MIN} to {MESSAGE_MAX.toLocaleString("en-US")}{" "}
                      characters.
                    </span>
                    <span
                      className={
                        messageLength > MESSAGE_MAX
                          ? "text-destructive"
                          : undefined
                      }
                    >
                      {messageLength.toLocaleString("en-US")} /{" "}
                      {MESSAGE_MAX.toLocaleString("en-US")}
                    </span>
                  </p>
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
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
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

                <p className="text-xs text-muted-foreground">
                  Your name, email, and message are sent through Formspree. Read
                  the{" "}
                  <a
                    href="/privacy"
                    className="text-primary link-underline-grow"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </form>
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
