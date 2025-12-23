"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/content/site.config";

/**
 * Author bio component with E-E-A-T optimization
 * Displays author expertise, authority, and trustworthiness signals
 * Includes schema.org Person microdata for SEO
 */
export function AuthorBio() {
  // Calculate years of experience from first experience entry
  const firstExperienceYear = 2019; // Based on CBSE x IBM internship (Sep 2019)
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - firstExperienceYear;

  // Get social links
  const githubLink = siteConfig.socials.find((s) => s.label === "GitHub");
  const linkedinLink = siteConfig.socials.find((s) => s.label === "LinkedIn");
  const emailLink = siteConfig.socials.find((s) => s.label === "Email");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      itemScope
      itemType="https://schema.org/Person"
    >
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Author Image */}
            <div className="shrink-0">
              <Image
                src="/divanshu-chauhan.jpeg"
                alt={`${siteConfig.name} - ${siteConfig.tagline}`}
                width={120}
                height={120}
                className="rounded-full border-2 border-primary/20"
                itemProp="image"
                priority
              />
            </div>

            {/* Author Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-1" itemProp="name">
                  {siteConfig.name}
                </h3>
                <p
                  className="text-foreground/60 text-sm mb-2"
                  itemProp="jobTitle"
                >
                  {siteConfig.tagline}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-foreground/50">
                  <span
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <span itemProp="addressLocality">
                      {siteConfig.location}
                    </span>
                  </span>
                  <span>•</span>
                  <span>{yearsOfExperience}+ years of experience</span>
                </div>
              </div>

              <p
                className="text-foreground/80 leading-relaxed"
                itemProp="description"
              >
                {siteConfig.about}
              </p>

              {/* Education & Credentials */}
              <div className="text-sm space-y-1">
                <div
                  itemProp="alumniOf"
                  itemScope
                  itemType="https://schema.org/EducationalOrganization"
                >
                  <span className="font-semibold">Education:</span>{" "}
                  <span itemProp="name">{siteConfig.education[0].title}</span>
                  {siteConfig.education[1].honors && (
                    <span className="text-foreground/60">
                      {" "}
                      ({siteConfig.education[1].honors})
                    </span>
                  )}
                </div>
              </div>

              {/* Social Links & CTA */}
              <div className="flex flex-wrap gap-2 pt-2">
                {githubLink && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={githubLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="sameAs"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                )}
                {linkedinLink && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={linkedinLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="sameAs"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                )}
                {emailLink && (
                  <Button variant="default" size="sm" asChild>
                    <Link href={emailLink.href} itemProp="email">
                      <Mail className="h-4 w-4" />
                      Get in Touch
                    </Link>
                  </Button>
                )}
              </div>

              {/* Hidden schema.org metadata */}
              <meta itemProp="url" content={`https://divkix.me`} />
              <meta itemProp="knowsAbout" content="Software Development" />
              <meta itemProp="knowsAbout" content="Web Development" />
              <meta itemProp="knowsAbout" content="Computer Science" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
