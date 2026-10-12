import { hours, locationInfo } from "@/data/location";
import { siteUrl } from "@/data/site";

export default function StructuredData() {
    const { postalAddress, coordinates } = locationInfo;

    const data = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: locationInfo.name,
        url: siteUrl,
        image: `${siteUrl}/images/hero.jpg`,
        telephone: locationInfo.phone,
        email: locationInfo.email,
        servesCuisine: ["Coffee", "Pastries", "Desserts"],
        address: {
            "@type": "PostalAddress",
            streetAddress: postalAddress.street,
            addressLocality: postalAddress.locality,
            addressRegion: postalAddress.region,
            addressCountry: postalAddress.country,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: coordinates.lat,
            longitude: coordinates.lng,
        },
        openingHoursSpecification: hours
            .filter((d) => d.open && d.close)
            .map((d) => ({
                "@type": "OpeningHoursSpecification",
                dayOfWeek: d.day,
                opens: d.open,
                closes: d.close,
            })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}