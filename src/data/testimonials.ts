export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    detail: string;
    rating: number;
}

// Demo content only: replace with the client's real reviews
export const reviewSummary = {
    rating: "4.9",
    count: "1,200+",
};

export const testimonials: Testimonial[] = [
    {
        id: "t1",
        quote:
            "The cappuccino is the best in the neighborhood, and the croissants are gone by ten for a reason. I'm here every Saturday.",
        name: "Sarah M.",
        detail: "Regular since 2021",
        rating: 5,
    },
    {
        id: "t2",
        quote:
            "Warm, calm, and nobody rushes you. It's where I do my best writing, and the staff remember my order.",
        name: "Daniel R.",
        detail: "Freelance writer",
        rating: 5,
    },
    {
        id: "t3",
        quote:
            "We booked a table for my sister's birthday and they decorated it without us asking. Genuinely lovely people.",
        name: "Priya K.",
        detail: "Celebrated a birthday here",
        rating: 5,
    },
];