"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/gallery/Lightbox";
import { galleryImages, type GalleryRatio } from "@/data/gallery";

const ratioClasses: Record<GalleryRatio, string> = {
    tall: "aspect-[4/5]",
    wide: "aspect-[4/3]",
    square: "aspect-square",
};

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const lastTrigger = useRef<HTMLButtonElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const openAt = (index: number, trigger: HTMLButtonElement) => {
        lastTrigger.current = trigger;
        setActiveIndex(index);
    };

    const close = useCallback(() => {
        setActiveIndex(null);
        lastTrigger.current?.focus();
    }, []);

    const navigate = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    return (
        <section id="gallery" className="bg-surface px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Gallery"
                    title="A look inside"
                    description="Warm light, good company, and a few small moments from our days."
                />

                <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={
                                shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 24 }
                            }
                            whileInView={
                                shouldReduceMotion
                                    ? { opacity: 1 }
                                    : { opacity: 1, y: 0 }
                            }
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-4 break-inside-avoid"
                        >
                            <button
                                type="button"
                                onClick={(e) => openAt(index, e.currentTarget)}
                                aria-label={`View larger: ${image.caption}`}
                                className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-maple"
                            >
                                <div className={`relative ${ratioClasses[image.ratio]}`}>
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>

                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-cafe-brown/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    <span className="font-heading text-lg text-cafe-white">
                                        {image.caption}
                                    </span>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Lightbox
                images={galleryImages}
                activeIndex={activeIndex}
                onClose={close}
                onNavigate={navigate}
            />
        </section>
    );
}