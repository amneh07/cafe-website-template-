"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface MenuCardProps {
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
}

export default function MenuCard({
    name,
    description,
    price,
    category,
    image,
}: MenuCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.article
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group overflow-hidden rounded-2xl bg-card"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-1 font-body text-[11px] uppercase tracking-[0.2em] text-accent">
                            {category}
                        </p>

                        <h3 className="font-heading text-2xl leading-tight text-ink">
                            {name}
                        </h3>
                    </div>

                    <span className="shrink-0 font-body text-sm font-medium text-ink">
                        {price}
                    </span>
                </div>

                <p className="font-body text-sm leading-relaxed text-ink/65">
                    {description}
                </p>
            </div>
        </motion.article>
    );
}