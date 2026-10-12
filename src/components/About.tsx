"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";

const stats = [
    { to: 8, suffix: "+", label: "Years of brewing" },
    { to: 12, suffix: "", label: "Coffee origins" },
    { to: 500, suffix: "+", label: "Cups served daily" },
];

export default function About() {
    const shouldReduceMotion = useReducedMotion();

    const reveal = (x: number) => ({
        initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x },
        whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section id="about" className="bg-surface-alt px-6 py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
                {/* Images */}
                <motion.div {...reveal(-32)} className="relative pb-10 pr-6 sm:pr-10">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                        <Image
                            src="/images/hero.jpg"
                            alt="Warm cafe interior with plants and soft lighting"
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden rounded-2xl border-4 border-surface-alt shadow-lg">
                        <Image
                            src="/images/about-detail.jpeg"
                            alt="Close-up of freshly brewed coffee"
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div {...reveal(32)}>
                    <SectionHeading
                        eyebrow="Our story"
                        title="Born from a love of slow mornings"
                        align="left"
                    />

                    <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-ink/70">
                        <p>
                            What started as a small corner counter and a single espresso
                            machine grew into a place where neighbors meet, laptops open,
                            and no one is rushed out the door.
                        </p>
                        <p>
                            We roast in small batches, bake every morning, and keep the
                            menu short on purpose, so everything on it is something we
                            would happily serve our own family.
                        </p>
                    </div>

                    <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <dt className="order-2 mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-ink/70">
                                    {stat.label}
                                </dt>
                                <dd className="font-heading text-4xl text-accent">
                                    <CountUp to={stat.to} suffix={stat.suffix} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>
            </div>
        </section>
    );
}