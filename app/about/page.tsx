"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TimelineNode } from "@/components/sections/experience/TimelineNode";
import { TimelinePath } from "@/components/sections/experience/TimelinePath";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { siteConfig } from "@/content/site.config";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function AboutPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://divkix.me/#author",
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    jobTitle: "Software Developer",
    description: siteConfig.about,
    url: "https://divkix.me",
    email: siteConfig.email,
    image: "https://divkix.me/divanshu-chauhan.jpeg",
    sameAs: siteConfig.socials
      .filter((s) => s.label !== "Email")
      .map((s) => s.href),
    alumniOf: siteConfig.education.map((edu) => ({
      "@type": "CollegeOrUniversity",
      name: edu.title.split(" — ")[1] || edu.title,
    })),
    knowsAbout: siteConfig.skills.map((s) => s.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tempe",
      addressRegion: "Arizona",
      addressCountry: "USA",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-20"
        >
          {/* Hero Section */}
          <motion.section variants={staggerItem} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-primary/20">
                  <Image
                    src="/divanshu-chauhan.jpeg"
                    alt={siteConfig.name}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                    {siteConfig.name}
                  </h1>
                  <div className="flex flex-wrap gap-3 text-foreground/70 text-lg">
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Software Developer
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {siteConfig.location}
                    </span>
                  </div>
                </div>

                <p className="text-lg text-foreground/80 leading-relaxed">
                  {siteConfig.about}
                </p>

                <div className="flex flex-wrap gap-3">
                  {siteConfig.socials.map((social) => (
                    <Button
                      key={social.label}
                      asChild
                      variant="outline"
                      size="sm"
                    >
                      <a
                        href={social.href}
                        target={social.label !== "Email" ? "_blank" : undefined}
                        rel={
                          social.label !== "Email"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {social.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Professional Bio */}
          <motion.section variants={staggerItem} className="space-y-6">
            <h2 className="text-3xl font-display font-bold">About Me</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                I'm a graduate student at Arizona State University pursuing a
                Master's in Computer Science with a focus on AI/ML and Data
                Science. With over 250,000 users impacted across my projects, I
                bring together technical expertise and a passion for building
                tools that solve real problems.
              </p>
              <p>
                My journey in software development started with open source
                contributions, where I built Alita Robot—a Telegram bot that
                scaled to serve over 1 million users. This experience taught me
                the importance of performance, scalability, and user-centric
                design. Today, I work across the full stack using TypeScript,
                Go, Python, and modern frameworks to create fast, reliable
                applications.
              </p>
              <p>
                At ASU, I've had the privilege of teaching and mentoring 500+
                students across multiple computer science courses, sharing
                knowledge in data structures, operating systems, and software
                engineering. I believe the best way to master a craft is to
                teach it.
              </p>
              <p>
                When I'm not coding, you'll find me trekking through Arizona's
                desert trails, playing soccer, or exploring new technologies
                through side projects. I'm always shipping—whether it's a new
                feature, a bug fix, or an entirely new product.
              </p>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={staggerItem} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-display font-bold">Education</h2>
            </div>

            <div className="relative">
              <div className="absolute left-2 top-8">
                <TimelinePath nodeCount={siteConfig.education.length} />
              </div>

              {siteConfig.education.map((edu, index) => (
                <div key={edu.title} className="relative mb-6">
                  <div className="absolute left-0 top-6">
                    <TimelineNode index={index} isActive={index === 0} />
                  </div>

                  <div className="pl-10">
                    <Card className="glass-surface">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <CardTitle className="text-xl mb-1">
                              {edu.title.split(" — ")[0]}
                            </CardTitle>
                            <p className="text-foreground/60">
                              {edu.title.split(" — ")[1]}
                            </p>
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            {edu.year}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {"focus" in edu && (
                            <div className="flex items-start gap-2">
                              <span className="text-sm font-semibold text-foreground/70">
                                Focus:
                              </span>
                              <span className="text-sm text-foreground/60">
                                {edu.focus}
                              </span>
                            </div>
                          )}
                          {"honors" in edu && (
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                {edu.honors}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section variants={staggerItem} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-display font-bold">
                Work Experience
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-2 top-8">
                <TimelinePath nodeCount={siteConfig.experience.length} />
              </div>

              {siteConfig.experience.map((company, companyIndex) => (
                <div key={company.company} className="relative mb-8">
                  <div className="absolute left-0 top-6">
                    <TimelineNode
                      index={companyIndex}
                      isActive={companyIndex === 0}
                    />
                  </div>

                  <div className="pl-10">
                    <Card className="glass-surface">
                      <CardHeader>
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-4">
                            <CardTitle className="text-xl">
                              {company.company}
                            </CardTitle>
                            <Badge variant="secondary" className="shrink-0">
                              {company.duration}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <MapPin className="h-4 w-4" />
                            {company.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6 relative">
                          {company.positions.length > 1 && (
                            <div className="absolute left-2 top-8 bottom-8 w-0.5 bg-border" />
                          )}

                          {company.positions.map((position) => (
                            <div key={position.title} className="relative pl-8">
                              {company.positions.length > 1 && (
                                <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                              )}

                              <div className="space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                  <h4 className="font-semibold text-foreground">
                                    {position.title}
                                  </h4>
                                  <span className="text-sm text-foreground/60 shrink-0">
                                    {position.year}
                                  </span>
                                </div>
                                <ul className="space-y-2 text-sm text-foreground/70">
                                  {position.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                      <span className="text-primary mt-1.5">
                                        •
                                      </span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section variants={staggerItem} className="space-y-6">
            <h2 className="text-3xl font-display font-bold">
              Technical Skills
            </h2>

            <div className="grid gap-8">
              {["Languages", "Frameworks", "Databases", "Tools"].map(
                (category) => {
                  const categorySkills = siteConfig.skills.filter(
                    (skill) => skill.category === category,
                  );

                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground/90">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant="outline"
                            className="text-sm py-1.5 px-3"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section variants={staggerItem} className="space-y-6">
            <h2 className="text-3xl font-display font-bold">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {siteConfig.projects.slice(0, 4).map((project) => (
                <Card key={project.name} className="glass-surface">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-foreground/60">{project.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-2">
                          {project.links.map((link) => (
                            <Button
                              key={link.label}
                              asChild
                              size="sm"
                              variant="outline"
                            >
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.label}
                              </a>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/#projects">View All Projects</Link>
              </Button>
            </div>
          </motion.section>

          {/* Impact Stats */}
          <motion.section variants={staggerItem} className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Impact</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-surface text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {siteConfig.facts.impact}
                  </div>
                  <div className="text-foreground/60">Users Impacted</div>
                </CardContent>
              </Card>

              <Card className="glass-surface text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {siteConfig.facts.projects}
                  </div>
                  <div className="text-foreground/60">Projects Built</div>
                </CardContent>
              </Card>

              <Card className="glass-surface text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {siteConfig.facts.oss}
                  </div>
                  <div className="text-foreground/60">
                    Open Source Contributions
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            variants={staggerItem}
            className="text-center space-y-6 py-12"
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-bold">
                Let's Work Together
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                I'm always interested in hearing about new opportunities,
                collaborations, or just connecting with fellow developers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticWrapper strength={0.2}>
                <Button asChild size="lg" className="rounded-full">
                  <a href="/#contact">Get In Touch</a>
                </Button>
              </MagneticWrapper>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </a>
              </Button>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
}
