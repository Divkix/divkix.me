"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { Slide } from "yet-another-react-lightbox"

// Dynamic import for lightbox to reduce initial bundle size
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
})

interface ProjectImage {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

interface ProjectLightboxProps {
  images: readonly ProjectImage[]
  open: boolean
  index: number
  onClose: () => void
}

/**
 * Lightbox wrapper for project image gallery
 * Uses yet-another-react-lightbox with basic navigation
 */
export function ProjectLightbox({
  images,
  open,
  index,
  onClose,
}: ProjectLightboxProps): React.JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Convert ProjectImage to Lightbox Slide format
  const slides: Slide[] = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }))

  // Only render on client side
  if (!mounted) {
    return null
  }

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      carousel={{
        finite: true,
      }}
      render={{
        // Add captions
        slide: ({ slide }) => (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={slide.src}
              alt={slide.alt || "Project image"}
              className="max-w-full max-h-full object-contain"
            />
            {slide.alt && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                <p className="text-sm">{slide.alt}</p>
              </div>
            )}
          </div>
        ),
      }}
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
        },
      }}
    />
  )
}
