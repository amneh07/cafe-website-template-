"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";

export default function ReservationCTA() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="bg-surface px-6 py-16 md:py-24">
            <motion.div
                initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }
                }
                whileInView={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl"
            >
                <Image
                    src="/images/gallery/gallery-5.jpeg"
                    alt=""
                    fill
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-cafe-brown/60 to-cafe-brown/80" />

                <div className="relative z-10 px-8 py-20 text-center md:py-28">
                    <p className="mb-4 font-body text-xs uppercase tracking-[0.25em] text-cafe-sugar md:text-sm">
                        Reservations
                    </p>
                    <h2 className="mx-auto max-w-2xl font-heading text-4xl leading-tight tracking-tight text-cafe-white sm:text-5xl">
                        Your table is waiting
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl font-body text-base leading-relaxed text-cafe-sugar">
                        Whether it&apos;s a quiet coffee for one or a birthday for ten,
                        we&apos;ll keep a seat warm for you.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Button href="/reservation" variant="primary">
                            Reserve a table
                        </Button>
                        <Button href="/menu" variant="outlineLight">
                            View menu
                        </Button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}