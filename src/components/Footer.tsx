import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import NewsletterForm from "@/components/footer/NewsletterForm";
import SocialIcon from "@/components/ui/SocialIcon";
import { hours, locationInfo } from "@/data/location";
import { navLinks } from "@/data/navigation";
import { socialLinks } from "@/data/social";
import { summarizeHours } from "@/lib/hours";

const hoursSummary = summarizeHours(hours);

const linkClass =
    "transition-colors duration-300 hover:text-cafe-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-sugar";

const headingClass =
    "mb-5 font-body text-xs font-medium uppercase tracking-[0.2em] text-cafe-beige";

export default function Footer() {
    return (
        <footer className="bg-footer text-cafe-sugar">
            <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-4">
                        <Link
                            href="/"
                            className="font-heading text-3xl tracking-tight text-cafe-white"
                        >
                            {locationInfo.name}
                        </Link>
                        <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cafe-sugar/75">
                            A quiet corner in the city where the coffee is strong, the
                            pastries are fresh, and there&apos;s always a seat for you.
                        </p>

                        <ul className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-cafe-white/20 text-cafe-sugar transition-colors duration-300 hover:border-cafe-maple hover:bg-cafe-maple hover:text-cafe-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-sugar"
                                    >
                                        <SocialIcon name={social.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Footer navigation" className="lg:col-span-2">
                        <h2 className={headingClass}>Explore</h2>
                        <ul className="space-y-3 font-body text-sm text-cafe-sugar/75">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={linkClass}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/reservation" className={linkClass}>
                                    Reserve a table
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Visit */}
                    <div className="lg:col-span-3">
                        <h2 className={headingClass}>Visit us</h2>
                        <ul className="space-y-4 font-body text-sm text-cafe-sugar/75">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-cafe-maple" aria-hidden="true" />
                                <address className="not-italic leading-relaxed">
                                    {locationInfo.addressLines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </address>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="shrink-0 text-cafe-maple" aria-hidden="true" />
                                <a href={locationInfo.phoneHref} className={linkClass}>
                                    {locationInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="shrink-0 text-cafe-maple" aria-hidden="true" />
                                <a href={`mailto:${locationInfo.email}`} className={linkClass}>
                                    {locationInfo.email}
                                </a>
                            </li>
                        </ul>

                        <dl className="mt-6 space-y-2 border-t border-cafe-white/10 pt-6 font-body text-sm">
                            {hoursSummary.map((group) => (
                                <div key={group.label} className="flex justify-between gap-4">
                                    <dt className="text-cafe-sugar/75">{group.label}</dt>
                                    <dd className="text-cafe-white">{group.time}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-3">
                        <h2 className={headingClass}>Stay in the loop</h2>
                        <p className="mb-5 font-body text-sm leading-relaxed text-cafe-sugar/75">
                            Seasonal menus, events and the occasional free pastry. No spam,
                            ever.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-cafe-white/10 pt-8 font-body text-xs text-cafe-sugar/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {locationInfo.name}. All rights reserved.
                    </p>
                    <p>Made with care, one cup at a time.</p>
                </div>
            </div>
        </footer>
    );
}