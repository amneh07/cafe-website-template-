import type { Metadata } from "next";
import Reservation from "@/components/reservation/Reservation";

export const metadata: Metadata = {
    title: "Reserve a Table",
    description: "Book a table at Maple & Co. Choose your date, time and party size.",
};

export default function ReservationPage() {
    return (
        <main id="main-content">
            <Reservation />
        </main>
    );
}