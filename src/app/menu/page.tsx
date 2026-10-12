import type { Metadata } from "next";
import Menu from "@/components/menu/Menu";

export const metadata: Metadata = {
    title: "Menu",
    description: "Explore our hot drinks, cold drinks, pastries and desserts.",
};

export default function MenuPage() {
    return (
        <main id="main-content">
            <Menu />
        </main>
    );
}