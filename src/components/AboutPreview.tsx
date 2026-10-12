"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function AboutPreview() {
    const shouldReduceMotion = useReducedMotion();

    const reveal = (x: number) => ({
        initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x },
        whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section className="bg-surface-alt px-6 py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <motion.div
                    {...reveal(-32)}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                    <Image
                        src="/images/hero.jpg"
                        alt="Warm cafe interior with plants and soft lighting"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </motion.div>

                <motion.div {...reveal(32)}>
                    <SectionHeading
                        eyebrow="Our story"
                        title="Born from a love of slow mornings"
                        align="left"
                    />
                    <p className="mt-6 font-body text-base leading-relaxed text-ink/70">
                        What started as a small corner counter and a single espresso
                        machine grew into a place where neighbors meet and no one is
                        rushed out the door.
                    </p>
                    <div className="mt-8">
                        <Button href="/about" variant="outline">
                            Read our story
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}