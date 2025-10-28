import { Hero3D } from "@/components/sections/Hero3D"
import { Highlights } from "@/components/sections/Highlights"
import { Projects } from "@/components/sections/Projects"
import { Experience } from "@/components/sections/Experience"
import { Skills } from "@/components/sections/Skills"
import { Contact } from "@/components/sections/Contact"
import { siteConfig } from "@/content/site.config"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: "https://divkix.me",
    image: "https://divkix.me/og-image.png",
    jobTitle: "Software Developer",
    description: siteConfig.about,
    email: siteConfig.email,
    alumniOf: siteConfig.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.title.split("—")[1]?.trim() || edu.title,
    })),
    knowsAbout: siteConfig.skills,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero3D />
      <Highlights />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  )
}
