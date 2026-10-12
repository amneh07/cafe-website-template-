"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks as links } from "@/data/navigation";

export default function Navbar() {
    const [pastTop, setPastTop] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const scrolled = pastTop || pathname !== "/";

    useEffect(() => {
        const onScroll = () => setPastTop(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const tone = scrolled ? "text-ink" : "text-cafe-white";

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${scrolled
                        ? "bg-surface/95 py-4 shadow-sm backdrop-blur-sm"
                        : "bg-transparent py-6"
                    }`}
            >
                <nav
                    aria-label="Main navigation"
                    className="mx-auto flex max-w-6xl items-center justify-between px-6"
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`font-heading text-2xl tracking-tight transition-colors duration-500 ${tone}`}
                    >
                        Maple & Co.
                    </Link>

                    {/* Desktop links */}
                    <ul className="hidden items-center gap-10 md:flex">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={`group relative font-body text-sm transition-colors duration-500 ${tone}`}
                                    >
                                        {link.label}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-px bg-cafe-maple transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right side: theme toggle, CTA, mobile menu button */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle className={tone} />

                        <Link
                            href="/reservation"
                            className="ml-2 hidden rounded-full bg-cafe-maple px-6 py-2.5 font-body text-sm text-cafe-white transition-colors duration-300 hover:bg-cafe-maple-dark md:inline-block"
                        >
                            Reserve a table
                        </Link>

                        <button
                            onClick={() => setMobileOpen(true)}
                            className={`md:hidden ${tone}`}
                            aria-label="Open menu"
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile fullscreen menu (outside the header on purpose) */}
            <div
                aria-hidden={!mobileOpen}
                className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-surface transition-all duration-500 md:hidden ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute right-6 top-6 text-ink"
                    aria-label="Close menu"
                >
                    <X size={28} />
                </button>

                {links.map((link, i) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
                        className={`font-heading text-3xl text-ink transition-all duration-500 hover:text-accent ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}

                <Link
                    href="/reservation"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 rounded-full bg-cafe-maple px-8 py-3 font-body text-sm text-cafe-white transition-colors duration-300 hover:bg-cafe-maple-dark"
                >
                    Reserve a table
                </Link>
            </div>
        </>
    );
}