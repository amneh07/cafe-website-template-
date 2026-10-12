export interface DayHours {
    day: string;
    open: string | null; // "HH:MM" in 24h, null = closed
    close: string | null;
}

export const locationInfo = {
    name: "Maple & Co.",
    addressLines: ["12 Maple Street", "Downtown District"],
    phone: "+1 (555) 010-2030",
    phoneHref: "tel:+15550102030",
    email: "hello@mapleandco.example",
    // The cafe's own time zone, used for the "Open now" badge
    timeZone: "Asia/Amman",
    coordinates: { lat: 31.9539, lng: 35.9106 },
    postalAddress: {
        street: "12 Maple Street",
        locality: "New York",
        region: "NY",
        country: "US",
    },
};

// Index 0 = Sunday ... 6 = Saturday (same as JavaScript's getDay)
export const hours: DayHours[] = [
    { day: "Sunday", open: "08:00", close: "21:00" },
    { day: "Monday", open: "07:00", close: "22:00" },
    { day: "Tuesday", open: "07:00", close: "22:00" },
    { day: "Wednesday", open: "07:00", close: "22:00" },
    { day: "Thursday", open: "07:00", close: "22:00" },
    { day: "Friday", open: "08:00", close: "23:00" },
    { day: "Saturday", open: "08:00", close: "23:00" },
];