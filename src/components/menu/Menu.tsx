"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuCard from "@/components/menu/MenuCard";
import { categories, menuItems, type Category } from "@/data/menu";

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState<Category>("Hot Drinks");
    const shouldReduceMotion = useReducedMotion();

    const filteredItems = menuItems.filter(
        (item) => item.category === activeCategory
    );

    return (
        <section id="menu" className="bg-surface px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="What we serve"
                    title="Our Menu"
                    description="Crafted with care, served with warmth — explore our selection of drinks and treats."
                />

                {/* Category tabs */}
                <div
                    role="tablist"
                    aria-label="Menu categories"
                    className="mt-12 flex flex-wrap items-center justify-center gap-3"
                >
                    {categories.map((category) => {
                        const isActive = category === activeCategory;
                        return (
                            <button
                                key={category}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-5 py-2.5 font-body text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-maple ${isActive
                                    ? "bg-cafe-maple text-cafe-white"
                                    : "bg-surface-alt text-ink hover:bg-line"
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Menu grid */}
                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { opacity: 0, y: 16 }
                                }
                                animate={
                                    shouldReduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: 1, y: 0 }
                                }
                                exit={
                                    shouldReduceMotion
                                        ? { opacity: 0 }
                                        : { opacity: 0, y: -16 }
                                }
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <MenuCard
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}