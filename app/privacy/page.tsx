"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function PrivacyPage() {
  const lastUpdated = "December 24, 2025";

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <motion.div variants={staggerItem} className="space-y-4">
          <h1 className="text-5xl font-display font-bold">Privacy Policy</h1>
          <p className="text-foreground/70">Last updated: {lastUpdated}</p>
        </motion.div>

        <motion.section
          variants={staggerItem}
          className="prose prose-lg dark:prose-invert max-w-none space-y-8"
        >
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              This privacy policy describes how {siteConfig.name} ("I", "me", or
              "my") collects, uses, and shares your personal information when
              you visit divkix.me (the "Site").
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Information I Collect
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              I collect minimal information necessary to provide and improve the
              Site:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside ml-4">
              <li>
                <strong>Contact Form Data:</strong> When you submit the contact
                form, I collect your name, email address, and message content.
                This information is used solely to respond to your inquiry.
              </li>
              <li>
                <strong>Analytics Data:</strong> I may use privacy-focused
                analytics to understand how visitors interact with the Site.
                This data is aggregated and does not personally identify you.
              </li>
              <li>
                <strong>Technical Information:</strong> Like most websites, the
                Site automatically collects certain technical information
                including your IP address, browser type, device type, and
                referring website.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              How I Use Your Information
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              I use the information I collect for the following purposes:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside ml-4">
              <li>To respond to your inquiries and provide support</li>
              <li>
                To improve and optimize the Site's content and user experience
              </li>
              <li>To analyze Site usage and identify technical issues</li>
              <li>To protect against fraudulent or malicious activity</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Cookies and Local Storage
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              The Site may use cookies and browser local storage to enhance your
              experience. These technologies are primarily used for:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside ml-4">
              <li>Remembering your theme preference (light/dark mode)</li>
              <li>Maintaining session state and user preferences</li>
              <li>Analytics and performance monitoring</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              You can control cookies through your browser settings. Disabling
              cookies may affect some functionality of the Site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Third-Party Services
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              The Site may integrate with third-party services that have their
              own privacy policies:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside ml-4">
              <li>
                <strong>Cloudflare:</strong> The Site is hosted on Cloudflare's
                edge network. Cloudflare may collect certain technical
                information as described in their{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong>External Links:</strong> The Site contains links to
                external websites (GitHub, LinkedIn, etc.). I am not responsible
                for the privacy practices of these third-party sites.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Data Retention and Security
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              I retain your personal information only as long as necessary to
              fulfill the purposes outlined in this privacy policy. Contact form
              submissions are retained for up to one year unless you request
              deletion.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              I implement reasonable security measures to protect your
              information from unauthorized access, alteration, or disclosure.
              However, no method of transmission over the internet is 100%
              secure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Your Rights
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              You have the right to:
            </p>
            <ul className="space-y-2 text-foreground/80 list-disc list-inside ml-4">
              <li>Access the personal information I hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of certain data collection practices</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              To exercise these rights, please contact me at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Children's Privacy
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              The Site is not intended for children under the age of 13. I do
              not knowingly collect personal information from children. If you
              believe I have collected information from a child, please contact
              me immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Changes to This Policy
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              I may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated "Last updated" date.
              Your continued use of the Site after changes are posted
              constitutes your acceptance of the updated policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Contact Information
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have questions about this privacy policy or how I handle
              your personal information, please contact me:
            </p>
            <ul className="space-y-2 text-foreground/80 list-none ml-4">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <strong>Location:</strong> {siteConfig.location}
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-foreground/60 text-sm">
              This privacy policy is effective as of {lastUpdated}. By using the
              Site, you acknowledge that you have read and understood this
              policy.
            </p>
          </div>
        </motion.section>

        <motion.div
          variants={staggerItem}
          className="text-center pt-8 border-t border-border"
        >
          <Link href="/" className="text-primary hover:underline font-medium">
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
