"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/menu/MenuCard";
import Button from "@/components/ui/Button";
import { menuItems } from "@/data/menu";

const featuredIds = ["h1", "c2", "p1", "h2", "d1", "p3"];

export default function MenuPreview() {
    const shouldReduceMotion = useReducedMotion();
    const featured = featuredIds
        .map((id) => menuItems.find((item) => item.id === id))
        .filter((item) => item !== undefined);

    return (
        <section id="featured" className="bg-surface px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Customer favorites"
                    title="Taste of our menu"
                    description="A few of the things people keep coming back for."
                />

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featured.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <MenuCard {...item} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <Button href="/menu" variant="outline">
                        View full menu
                    </Button>
                </div>
            </div>
        </section>
    );
}