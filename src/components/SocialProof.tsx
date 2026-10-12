import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialIcon from "@/components/ui/SocialIcon";
import { galleryImages } from "@/data/gallery";
import { instagramHandle, socialLinks } from "@/data/social";

// Only two featured photos. To swap one, change its id
// (ids are in src/data/gallery.ts, e.g. "g4" = pour-over coffee)
const featuredIds = ["g2", "g3"];
const featuredImages = galleryImages.filter((image) =>
    featuredIds.includes(image.id)
);

const instagramHref =
    socialLinks.find((social) => social.icon === "instagram")?.href ?? "#";

export default function SocialProof() {
    return (
        <section className="bg-surface-alt px-6 py-24 md:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="On Instagram"
                    title="Follow along"
                    description={
                        <>
                            Tag us in your cozy moments with{" "}
                            <a
                                href={instagramHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent underline underline-offset-4 transition-colors duration-300 hover:text-ink"
                            >
                                {instagramHandle}
                            </a>
                        </>
                    }
                />

                <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-4 sm:gap-6">
                    {featuredImages.map((image) => (
                        <li key={image.id}>
                            <a
                                href={instagramHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View on Instagram: ${image.caption}`}
                                className="group relative block aspect-square overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cafe-maple"
                            >
                                <Image
                                    src={image.src}
                                    alt=""
                                    fill
                                    sizes="(min-width: 672px) 336px, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <span className="absolute inset-0 flex items-center justify-center bg-cafe-brown/50 text-cafe-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    <SocialIcon name="instagram" size={28} />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}