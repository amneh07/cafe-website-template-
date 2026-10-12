import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
    title: "Gallery",
    description: "A look inside Maple & Co.: warm light, fresh bakes and slow mornings.",
};

export default function GalleryPage() {
    return (
        <main id="main-content">
            <Gallery />
        </main>
    );
}