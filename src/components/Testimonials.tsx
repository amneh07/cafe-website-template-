"use client";

import { Quote, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviewSummary, testimonials } from "@/data/testimonials";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <div
            role="img"
            aria-label={`${rating} out of 5 stars`}
            className="flex gap-0.5 text-accent"
        >
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    size={size}
                    aria-hidden="true"
                    className={i < rating ? "fill-current" : "opacity-30"}
                />
            ))}
        </div>
    );
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export default function Testimonials() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="bg-surface px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading eyebrow="Kind words" title="Loved by our regulars" />

                {/* Rating summary */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                        <span className="font-heading text-4xl text-ink">
                            {reviewSummary.rating}
                        </span>
                        <Stars rating={5} size={18} />
                    </div>
                    <p className="font-body text-sm text-ink/70">
                        Based on {reviewSummary.count} guest reviews
                    </p>
                </div>

                {/* Cards: swipeable row on mobile, 3-column grid from md up */}
                <div
                    role="region"
                    aria-label="Customer reviews"
                    tabIndex={0}
                    className="-mx-6 mt-12 snap-x snap-mandatory overflow-x-auto px-6 pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-maple md:mx-0 md:overflow-visible md:px-0 md:pb-0"
                >
                    <ul className="flex gap-5 md:grid md:grid-cols-3 md:gap-6">
                        {testimonials.map((item, index) => (
                            <motion.li
                                key={item.id}
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
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: shouldReduceMotion ? 0 : index * 0.1,
                                }}
                                className="w-[85%] shrink-0 snap-center md:w-auto"
                            >
                                <figure className="flex h-full flex-col rounded-2xl bg-card p-8">
                                    <Quote
                                        size={28}
                                        strokeWidth={1.5}
                                        className="text-accent/40"
                                        aria-hidden="true"
                                    />

                                    <div className="mt-4">
                                        <Stars rating={item.rating} />
                                    </div>

                                    <blockquote className="mt-5 flex-1 font-body text-base leading-relaxed text-ink/80">
                                        <p>{item.quote}</p>
                                    </blockquote>

                                    <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-alt font-heading text-base text-accent"
                                        >
                                            {getInitials(item.name)}
                                        </span>
                                        <span>
                                            <span className="block font-body text-sm font-medium text-ink">
                                                {item.name}
                                            </span>
                                            <span className="block font-body text-xs text-ink/70">
                                                {item.detail}
                                            </span>
                                        </span>
                                    </figcaption>
                                </figure>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}