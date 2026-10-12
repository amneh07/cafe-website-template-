import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
    title: "Our Story",
    description:
        "How Maple & Co. grew from a small corner counter into a neighborhood favorite.",
};

export default function AboutPage() {
    return (
        <main id="main-content">
            <About />
        </main>
    );
}