"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { validateEmail } from "@/lib/utils";
import { cn } from "@/lib/utils";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, send to API here
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <SectionContainer id="contact" className="relative bg-background overflow-hidden gradient-mesh">
      <div className="relative z-10 space-y-16">
        {/* Header */}
        <FadeIn className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </FadeIn>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                <p className="text-muted-foreground mb-8">
                  I&apos;m always open to discussing new projects, creative ideas, or
                  opportunities to be part of your visions. Whether you have a
                  question or just want to say hi, I&apos;ll try my best to get back
                  to you!
                </p>
              </div>

              {/* Contact Details - Tilted cards */}
              <div className="space-y-6">
                <motion.div
                  className="p-4 glass-strong flex items-center gap-4"
                  style={{
                    borderRadius: "20px",
                    transform: "rotate(-2deg)",
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                  }}
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-medium hover:text-purple-500 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 glass-strong flex items-center gap-4"
                  style={{
                    borderRadius: "20px",
                    transform: "rotate(2deg)",
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                  }}
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{PERSONAL_INFO.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links - Floating bubbles */}
              <div>
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                    const Icon =
                      socialIcons[key as keyof typeof socialIcons] || Mail;
                    return (
                      <motion.a
                        key={key}
                        href={url}
                        target={key === "email" ? "_self" : "_blank"}
                        rel={key === "email" ? undefined : "noopener noreferrer"}
                        className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10"
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
                        }}
                        transition={{ duration: 0.6 }}
                        aria-label={key}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Contact Form - Organic shape */}
          <SlideIn direction="right">
            <motion.div
              className="p-8 glass-strong"
              style={{ borderRadius: "30px" }}
              initial={{ rotate: -2 }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-background/50 backdrop-blur-sm border blob-4",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500",
                      "transition-colors",
                      errors.name ? "border-red-500" : "border-purple-500/30"
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-background/50 backdrop-blur-sm border blob-4",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500",
                      "transition-colors",
                      errors.email ? "border-red-500" : "border-purple-500/30"
                    )}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 bg-background/50 backdrop-blur-sm border blob-3",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500",
                      "transition-colors resize-none",
                      errors.message ? "border-red-500" : "border-purple-500/30"
                    )}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button - Blob shaped */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full px-8 py-4 text-lg font-semibold text-white overflow-hidden button-liquid blob-1 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                  whileHover={{
                    scale: isSubmitting || isSubmitted ? 1 : 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSubmitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      <Send className="inline h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-500 font-medium"
                  >
                    Thank you! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </SlideIn>
        </div>
      </div>
    </SectionContainer>
  );
}
