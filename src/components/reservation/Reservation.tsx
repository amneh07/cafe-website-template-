import { CalendarCheck, Phone, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ReservationForm from "@/components/reservation/ReservationForm";
import { locationInfo } from "@/data/location";

const notes = [
    {
        icon: CalendarCheck,
        text: "We confirm every reservation by email, usually within a few hours.",
    },
    {
        icon: Users,
        text: "Parties of 9 or more? Call us and we'll arrange the space.",
    },
];

export default function Reservation() {
    return (
        <section id="reserve" className="bg-surface px-6 py-24 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-2">
                    <SectionHeading
                        eyebrow="Reservations"
                        title="Save your seat"
                        description="Tell us when you're coming and we'll keep a table warm for you."
                        align="left"
                    />

                    <ul className="mt-10 space-y-5 font-body text-sm leading-relaxed text-ink/70">
                        {notes.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-start gap-3">
                                <Icon
                                    size={18}
                                    className="mt-0.5 shrink-0 text-accent"
                                    aria-hidden="true"
                                />
                                <span>{text}</span>
                            </li>
                        ))}
                        <li className="flex items-start gap-3">
                            <Phone
                                size={18}
                                className="mt-0.5 shrink-0 text-accent"
                                aria-hidden="true"
                            />
                            <span>
                                Prefer to talk?{" "}
                                <a
                                    href={locationInfo.phoneHref}
                                    className="text-ink underline underline-offset-4 transition-colors duration-300 hover:text-accent"
                                >
                                    {locationInfo.phone}
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl bg-card p-8 md:p-10 lg:col-span-3">
                    <ReservationForm />
                </div>
            </div>
        </section>
    );
}