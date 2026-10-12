import { hours } from "@/data/location";
import { toMinutes } from "@/lib/time";
import { isValidEmail } from "@/lib/validation";

export interface ReservationValues {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    notes: string;
}

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

export const initialValues: ReservationValues = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
};

const SLOT_STEP_MINUTES = 30;
const LAST_SEATING_BEFORE_CLOSE = 60;


// Today's date as YYYY-MM-DD (visitor's local date)
export function todayString() {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
}

// Available time slots for a date, based on that weekday's opening hours.
// Returns an empty array when no date is picked or the cafe is closed.
export function getTimeSlots(date: string): string[] {
    if (!date) return [];

    const [year, month, day] = date.split("-").map(Number);
    const dayHours = hours[new Date(year, month - 1, day).getDay()];
    if (!dayHours.open || !dayHours.close) return [];

    const start = toMinutes(dayHours.open);
    const end = toMinutes(dayHours.close) - LAST_SEATING_BEFORE_CLOSE;
    const slots: string[] = [];

    for (let t = start; t <= end; t += SLOT_STEP_MINUTES) {
        const h = String(Math.floor(t / 60)).padStart(2, "0");
        const m = String(t % 60).padStart(2, "0");
        slots.push(`${h}:${m}`);
    }

    return slots;
}

export function validate(values: ReservationValues): ReservationErrors {
    const errors: ReservationErrors = {};

    if (values.name.trim().length < 2) {
        errors.name = "Please enter your name.";
    }

    if (!isValidEmail(values.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!values.date) {
        errors.date = "Please choose a date.";
    } else if (values.date < todayString()) {
        errors.date = "Please choose a future date.";
    } else if (getTimeSlots(values.date).length === 0) {
        errors.date = "We're closed on this day. Please pick another date.";
    }

    if (!errors.date && !getTimeSlots(values.date).includes(values.time)) {
        errors.time = "Please choose a time.";
    }

    return errors;
}