export type GalleryRatio = "tall" | "wide" | "square";

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    caption: string;
    ratio: GalleryRatio;
}

export const galleryImages: GalleryImage[] = [
    {
        id: "g1",
        src: "/images/gallery/gallery-1.png",
        alt: "Cozy cafe interior with plants and warm pendant lights",
        caption: "Our corner of the city",
        ratio: "tall",
    },
    {
        id: "g2",
        src: "/images/gallery/gallery-2.jpeg",
        alt: "Barista pouring steamed milk into a ceramic cup",
        caption: "Poured by hand",
        ratio: "square",
    },
    {
        id: "g3",
        src: "/images/gallery/gallery-3.jpeg",
        alt: "Freshly baked croissants and pastries on a wooden tray",
        caption: "Fresh from the oven",
        ratio: "wide",
    },
    {
        id: "g4",
        src: "/images/gallery/gallery-4.jpeg",
        alt: "Pour-over coffee being brewed with a gooseneck kettle",
        caption: "Morning ritual",
        ratio: "tall",
    },
    {
        id: "g5",
        src: "/images/gallery/gallery-5.jpeg",
        alt: "Cozy seating corner with rattan chairs and plants",
        caption: "Stay a while",
        ratio: "wide",
    },
    {
        id: "g6",
        src: "/images/gallery/gallery-6.jpeg",
        alt: "Slice of chocolate cake beside a cup of coffee",
        caption: "Something sweet",
        ratio: "square",
    },
];