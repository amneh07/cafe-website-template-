import type { ReactNode } from "react";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: ReactNode;
    align?: "left" | "center";
    theme?: "light" | "dark";
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
    theme = "light",
}: SectionHeadingProps) {
    const isDark = theme === "dark";

    return (
        <div
            className={`
                max-w-2xl
                ${align === "center" ? "mx-auto text-center" : "text-left"}
            `}
        >
            {eyebrow && (
                <p
                    className={`
                        mb-4
                        font-body text-xs md:text-sm
                        tracking-[0.25em] uppercase
                        ${isDark ? "text-cafe-sugar" : "text-accent"}
                    `}
                >
                    {eyebrow}
                </p>
            )}

            <h2
                className={`
                    font-heading
                    text-4xl sm:text-5xl
                    leading-tight
                    tracking-tight
                    ${isDark ? "text-cafe-white" : "text-ink"}
                `}
            >
                {title}
            </h2>

            {description && (
                <div
                    className={`
                        mt-5
                        font-body text-base
                        leading-relaxed
                        ${isDark ? "text-cafe-sugar" : "text-ink/70"}
                    `}
                >
                    {description}
                </div>
            )}
        </div>
    );
}