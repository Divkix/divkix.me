"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"
import { ProjectLightbox } from "./ProjectLightbox"

interface ProjectImage {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

interface ProjectGalleryProps {
  images: readonly ProjectImage[]
  projectName: string
}

/**
 * Grid of thumbnail images for project gallery
 * Opens lightbox on click with lazy loading
 */
export function ProjectGallery({ images, projectName }: ProjectGalleryProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [photoIndex, setPhotoIndex] = useState<number>(0)

  if (!images || images.length === 0) {
    return <></>
  }

  const openLightbox = (index: number): void => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground/70 flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Gallery ({images.length} {images.length === 1 ? "image" : "images"})
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 200px"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <ProjectLightbox
        images={images}
        open={lightboxOpen}
        index={photoIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
