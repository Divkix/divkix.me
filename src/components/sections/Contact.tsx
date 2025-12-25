import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { GradientText } from "@/components/shared/GradientText";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  return (
    <section id="contact" className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto space-y-12 animate-fade-in-up">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-display font-bold">
            Get in <GradientText>Touch</GradientText>
          </h2>
          <p className="text-xl text-foreground/70">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you.
          </p>
        </div>

        <div>
          <Card className="p-8 glass-surface">
            {isSuccess ? (
              <div className="text-center space-y-4 py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-display font-bold">
                  Message Sent!
                </h3>
                <p className="text-foreground/70">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={6}
                    {...register("message")}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
