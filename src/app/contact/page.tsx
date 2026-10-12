import type { Metadata } from "next";
import Location from "@/components/Location";

export const metadata: Metadata = {
    title: "Contact & Hours",
    description: "Opening hours, address, phone and directions to Maple & Co.",
};

export default function ContactPage() {
    return (
        <main id="main-content">
            <Location />
        </main>
    );
}