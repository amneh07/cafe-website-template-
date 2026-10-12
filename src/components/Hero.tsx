"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    const contentAnimation = shouldReduceMotion
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        }
        : {
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
        };
    return (
        <section
            id="home"
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
        >
            {/* Background image */}
            <Image
                src="/images/hero.jpg"
                alt="Cozy cafe interior with warm lighting"
                fill
                priority
                quality={70}
                sizes="100vw"
                className="object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cafe-brown/35 via-cafe-brown/45 to-cafe-brown/65" />

            {/* Bottom fade into next section */}
            <div className="absolute inset-x-0 bottom-0 h-30 bg-gradient-to-b from-transparent via-surface/60 to-surface" />
            {/* Content */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: shouldReduceMotion ? 0 : 0.12,
                            delayChildren: shouldReduceMotion ? 0 : 0.15,
                        },
                    },
                }}
                className="relative z-10 w-full max-w-3xl px-6 py-32 text-center"
            >
                {/* Eyebrow */}
                <motion.p
                    variants={contentAnimation}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-5 font-body text-xs md:text-sm tracking-[0.28em] uppercase text-cafe-sugar"
                >
                    Specialty coffee · Freshly baked
                </motion.p>

                {/* Heading: shown immediately (no fade) because it is the LCP element */}
                <h1 className="font-heading text-cafe-white text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
                    Slow mornings start with good coffee
                </h1>

                {/* Description */}
                <motion.p
                    variants={contentAnimation}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto mt-7 max-w-2xl font-body text-base md:text-lg leading-relaxed text-cafe-sugar"
                >
                    A quiet corner in the city where the coffee is strong, the
                    pastries are fresh, and there&apos;s always a seat for you.
                </motion.p>

                {/* Actions */}
                <motion.div
                    variants={contentAnimation}
                    transition={{
                        duration: shouldReduceMotion ? 0 : 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <Button href="/menu" variant="primary">
                        View menu
                    </Button>

                    <Button href="/reservation" variant="outlineLight">
                        Reserve a table
                    </Button>
                </motion.div>     </motion.div>


        </section>
    );
}