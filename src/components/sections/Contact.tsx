import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TerminalWindow } from "@/components/shared/TerminalWindow";
import { siteConfig } from "@/data/site.config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function TypewriterSuccess() {
  const text = "[OK] Message sent. Expect a response within 24h.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12 text-center">
      <p
        className="text-lg text-[oklch(0.7_0.2_140)]"
        style={{ textShadow: "0 0 4px oklch(0.7 0.2 140)" }}
      >
        {displayed}
        <span className="terminal-cursor-block" />
      </p>
    </div>
  );
}

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
      className="relative py-32"
      style={{ background: "oklch(0.08 0 0)" }}
    >
      <div className="container mx-auto px-4">
        <SectionLabel number="05" label="contact" variant="terminal" />

        <div className="max-w-2xl mx-auto">
          <TerminalWindow title="mail@divkix — compose">
            {isSuccess ? (
              <TypewriterSuccess />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="contact-prompt shrink-0">{">"}</span>
                    <label htmlFor="contact-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="name"
                      autoComplete="name"
                      className="contact-input"
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1 ml-5 font-mono">
                      error: {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="contact-prompt shrink-0">{">"}</span>
                    <label htmlFor="contact-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="email"
                      autoComplete="email"
                      className="contact-input"
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1 ml-5 font-mono">
                      error: {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-start gap-2">
                    <span className="contact-prompt shrink-0 mt-1">{">"}</span>
                    <label htmlFor="contact-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="message"
                      rows={5}
                      className="contact-input resize-none"
                      {...register("message")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.message && (
                    <p className="text-xs text-red-400 mt-1 ml-5 font-mono">
                      error: {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-mono text-sm border border-[oklch(0.7_0.2_140)] text-[oklch(0.7_0.2_140)] px-6 py-2.5 rounded cursor-pointer transition-all hover:bg-[oklch(0.7_0.2_140_/_0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ textShadow: "0 0 2px currentColor" }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      sending...
                    </span>
                  ) : (
                    "$ send --message"
                  )}
                </button>
              </form>
            )}
          </TerminalWindow>

          {/* Social links as terminal output */}
          <div className="mt-8 font-mono text-sm space-y-2">
            <p
              className="text-[oklch(1_0_0_/_0.4)]"
              style={{ textShadow: "0 0 2px currentColor" }}
            >
              or reach me at:
            </p>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[oklch(0.72_0.12_185)] hover:text-[oklch(0.82_0.12_185)] transition-colors"
                style={{ textShadow: "0 0 2px currentColor" }}
              >
                {"-> "}
                {social.href
                  .replace(/^https?:\/\/(www\.)?/, "")
                  .replace(/\/$/, "")}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient: terminal black → page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0 0), var(--background))",
        }}
        aria-hidden="true"
      />

      <style>{`
        .contact-prompt {
          color: oklch(0.7 0.2 140);
          font-size: 0.875rem;
          font-family: var(--font-mono);
          text-shadow: 0 0 2px currentColor;
        }

        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid oklch(1 0 0 / 0.2);
          outline: none;
          padding-bottom: 0.25rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: oklch(0.9 0 0);
          text-shadow: 0 0 2px currentColor;
          transition: border-color 0.2s;
        }

        .contact-input::placeholder {
          color: oklch(1 0 0 / 0.3);
        }

        .contact-input:focus {
          border-bottom-color: oklch(0.7 0.2 140);
        }

        .contact-input:disabled {
          opacity: 0.5;
        }

        .terminal-cursor-block {
          display: inline-block;
          width: 0.5rem;
          height: 1.25rem;
          background: oklch(0.7 0.2 140);
          vertical-align: middle;
          margin-left: 0.25rem;
          animation: contact-cursor-blink 1s steps(1) infinite;
          box-shadow: 0 0 6px oklch(0.7 0.2 140);
        }

        @keyframes contact-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-cursor-block {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
