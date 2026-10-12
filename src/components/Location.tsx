"use client";

import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { hours, locationInfo } from "@/data/location";
import { formatTime, toMinutes } from "@/lib/time";

const DAY_KEYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getNow(timeZone: string) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(new Date());

    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);

    return { dayIndex: DAY_KEYS.indexOf(weekday), minutes: hour * 60 + minute };
}


const { lat, lng } = locationInfo.coordinates;
const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export default function Location() {
    const [now, setNow] = useState<{ dayIndex: number; minutes: number } | null>(
        null
    );

    // Computed after mount so the server and browser HTML always match
    useEffect(() => {
        const update = () => setNow(getNow(locationInfo.timeZone));
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, []);

    const today = now ? hours[now.dayIndex] : null;
    const isOpen =
        now !== null &&
        today !== null &&
        today.open !== null &&
        today.close !== null &&
        now.minutes >= toMinutes(today.open) &&
        now.minutes < toMinutes(today.close);

    return (
        <section id="contact" className="bg-surface-alt px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Visit us"
                    title="Find your seat"
                    description="Come by for a slow morning, a long lunch, or a quiet evening. We'll keep the table warm."
                />

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {/* Info card */}
                    <div className="rounded-2xl bg-card p-8 md:p-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="flex items-center gap-2.5 font-heading text-2xl text-ink">
                                <Clock size={20} className="text-accent" aria-hidden="true" />
                                Opening hours
                            </h3>

                            {now && (
                                <span
                                    role="status"
                                    className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 font-body text-xs font-medium text-ink"
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-600" : "bg-cafe-maple"
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {isOpen ? "Open now" : "Closed now"}
                                </span>
                            )}
                        </div>

                        <dl className="mt-6">
                            {hours.map((item, index) => {
                                const isToday = now?.dayIndex === index;
                                return (
                                    <div
                                        key={item.day}
                                        className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-body text-sm ${isToday
                                            ? "bg-surface font-medium text-accent"
                                            : "text-ink/75"
                                            }`}
                                    >
                                        <dt>{item.day}</dt>
                                        <dd>
                                            {item.open && item.close
                                                ? `${formatTime(item.open)} – ${formatTime(item.close)}`
                                                : "Closed"}
                                        </dd>
                                    </div>
                                );
                            })}
                        </dl>

                        <ul className="mt-8 space-y-4 border-t border-line pt-8 font-body text-sm text-ink">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                <address className="not-italic leading-relaxed">
                                    {locationInfo.addressLines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </address>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="shrink-0 text-accent" aria-hidden="true" />
                                <a
                                    href={locationInfo.phoneHref}
                                    className="transition-colors duration-300 hover:text-accent"
                                >
                                    {locationInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="shrink-0 text-accent" aria-hidden="true" />
                                <a
                                    href={`mailto:${locationInfo.email}`}
                                    className="transition-colors duration-300 hover:text-accent"
                                >
                                    {locationInfo.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-line">
                        <iframe
                            title={`Map showing the location of ${locationInfo.name}`}
                            src={mapSrc}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full border-0"
                        />

                        <a
                            href={directionsHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-cafe-maple px-6 py-3 font-body text-sm font-medium text-cafe-white shadow-lg transition-colors duration-300 hover:bg-cafe-maple-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-maple"
                        >
                            <MapPin size={16} aria-hidden="true" />
                            Get directions
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}