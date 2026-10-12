"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";

interface LightboxProps {
    images: GalleryImage[];
    activeIndex: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function Lightbox({
    images,
    activeIndex,
    onClose,
    onNavigate,
}: LightboxProps) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isOpen = activeIndex !== null;

    // Keyboard controls + lock page scroll while open
    useEffect(() => {
        if (activeIndex === null) return;

        const total = images.length;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + total) % total);
            if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % total);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [activeIndex, images.length, onClose, onNavigate]);

    // Move focus into the dialog when it opens
    useEffect(() => {
        if (isOpen) closeRef.current?.focus();
    }, [isOpen]);

    const current = activeIndex !== null ? images[activeIndex] : null;

    const goPrev = () =>
        activeIndex !== null &&
        onNavigate((activeIndex - 1 + images.length) % images.length);
    const goNext = () =>
        activeIndex !== null && onNavigate((activeIndex + 1) % images.length);

    return (
        <AnimatePresence>
            {current && activeIndex !== null && (
                <motion.div
                    key="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image viewer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-cafe-brown/95 p-4 sm:p-8"
                >
                    <button
                        ref={closeRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        aria-label="Close image viewer"
                        className="absolute right-4 top-4 z-10 rounded-full bg-cafe-white/10 p-3 text-cafe-white transition-colors duration-300 hover:bg-cafe-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-white sm:right-6 sm:top-6"
                    >
                        <X size={22} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goPrev();
                        }}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cafe-white/10 p-3 text-cafe-white transition-colors duration-300 hover:bg-cafe-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-white sm:left-6"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goNext();
                        }}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cafe-white/10 p-3 text-cafe-white transition-colors duration-300 hover:bg-cafe-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-white sm:right-6"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <figure
                        onClick={(e) => e.stopPropagation()}
                        className="flex w-full max-w-5xl flex-col items-center"
                    >
                        <div className="relative h-[70vh] w-full">
                            <Image
                                key={current.id}
                                src={current.src}
                                alt={current.alt}
                                fill
                                sizes="100vw"
                                className="object-contain"
                            />
                        </div>
                        <figcaption className="mt-5 text-center font-body text-sm text-cafe-sugar">
                            {current.caption}
                            <span className="mx-2 text-cafe-sugar/50">·</span>
                            {activeIndex + 1} / {images.length}
                        </figcaption>
                    </figure>
                </motion.div>
            )}
        </AnimatePresence>
    );
}