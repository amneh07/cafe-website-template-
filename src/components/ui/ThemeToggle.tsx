"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
    className?: string;
}

// Re-renders whenever the "dark" class on <html> changes
function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggle = () => {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch {
            // storage unavailable (private mode): the toggle still works for this visit
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={isDark}
            aria-label="Dark mode"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-cafe-maple/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cafe-maple ${className}`}
        >
            <Sun size={20} aria-hidden="true" className="hidden dark:block" />
            <Moon size={20} aria-hidden="true" className="block dark:hidden" />
        </button>
    );
}