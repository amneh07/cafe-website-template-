"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "outlineLight" | "ghost";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: ButtonVariant;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    ariaLabel?: string;
}

const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-cafe-maple text-cafe-white hover:bg-cafe-maple-dark",
    outline:
        "border border-ink/30 text-ink hover:bg-ink hover:text-surface",
    outlineLight:
        "border border-cafe-white/80 text-cafe-white hover:bg-cafe-white/10",
    ghost:
        "text-ink hover:bg-ink/5",
};

export default function Button({
    children,
    href,
    variant = "primary",
    className = "",
    disabled = false,
    type = "button",
    onClick,
    ariaLabel,
}: ButtonProps) {
    const shouldReduceMotion = useReducedMotion();

    const classes = `
        inline-flex items-center justify-center
        rounded-full
        px-7 py-3.5
        font-body text-sm font-medium
        transition-colors duration-300
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-cafe-maple
        disabled:pointer-events-none
        disabled:opacity-50
        ${variants[variant]}
        ${className}
    `;

    const motionProps = shouldReduceMotion
        ? {}
        : {
            whileHover: { y: -2 },
            whileTap: { scale: 0.97 },
        };

    if (href) {
        return (
            <motion.div {...motionProps}>
                <Link
                    href={href}
                    aria-label={ariaLabel}
                    className={classes}
                >
                    {children}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            {...motionProps}
            type={type}
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            className={classes}
        >
            {children}
        </motion.button>
    );
}