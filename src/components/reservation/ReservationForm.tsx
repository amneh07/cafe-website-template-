"use client";

import {
    useState,
    useSyncExternalStore,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { locationInfo } from "@/data/location";
import {
    getTimeSlots,
    initialValues,
    todayString,
    validate,
    type ReservationErrors,
    type ReservationValues,
} from "@/lib/reservation";
import { formatTime } from "@/lib/time";

const baseInput =
    "w-full rounded-xl border bg-surface px-4 py-3 font-body text-sm text-ink placeholder:text-ink/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cafe-maple/40 disabled:cursor-not-allowed disabled:opacity-60";

const inputClass = (hasError: boolean) =>
    `${baseInput} ${hasError
        ? "border-cafe-maple-dark"
        : "border-line focus:border-cafe-maple"
    }`;

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Hydration-safe "today": empty on the server, the real date in the browser
const subscribeToNothing = () => () => { };

export default function ReservationForm() {
    const [values, setValues] = useState<ReservationValues>(initialValues);
    const [errors, setErrors] = useState<ReservationErrors>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const shouldReduceMotion = useReducedMotion();

    const minDate = useSyncExternalStore(subscribeToNothing, todayString, () => "");

    const slots = getTimeSlots(values.date);
    const isClosedDay = values.date !== "" && slots.length === 0;
    const dateError =
        errors.date ??
        (isClosedDay ? "We're closed on this day. Please pick another date." : undefined);

    const handleChange = (e: ChangeEvent<FieldElement>) => {
        const { name, value } = e.target;

        setValues((prev) => {
            const next = { ...prev, [name]: value };
            if (name === "date") next.time = "";
            return next;
        });

        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
            ...(name === "date" ? { time: undefined } : {}),
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const found = validate(values);
        setErrors(found);

        const firstInvalid = Object.keys(found)[0];
        if (firstInvalid) {
            document.getElementById(firstInvalid)?.focus();
            return;
        }

        setStatus("submitting");

        // TODO: replace with a real API call once the backend is ready
        await new Promise((resolve) => setTimeout(resolve, 900));

        setStatus("success");
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setStatus("idle");
    };

    if (status === "success") {
        const [year, month, day] = values.date.split("-").map(Number);
        const prettyDate = new Date(year, month - 1, day).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
        const guestCount = Number(values.guests);

        return (
            <motion.div
                role="status"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="py-6 text-center"
            >
                <CheckCircle2
                    size={44}
                    strokeWidth={1.5}
                    className="mx-auto text-accent"
                    aria-hidden="true"
                />
                <h3 className="mt-5 font-heading text-3xl text-ink">
                    Thank you, {values.name.trim().split(" ")[0]}!
                </h3>
                <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-ink/70">
                    Your request for {guestCount} {guestCount === 1 ? "guest" : "guests"} on{" "}
                    {prettyDate} at {formatTime(values.time)} is in. We&apos;ll confirm
                    by email at {values.email.trim()}.
                </p>
                <div className="mt-8 flex justify-center">
                    <Button variant="outline" onClick={reset}>
                        Make another reservation
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="name" label="Full name" error={errors.name}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass(Boolean(errors.name))}
                    />
                </FormField>

                <FormField id="email" label="Email" error={errors.email}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass(Boolean(errors.email))}
                    />
                </FormField>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="phone" label="Phone" optional error={errors.phone}>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={inputClass(Boolean(errors.phone))}
                    />
                </FormField>

                <FormField
                    id="guests"
                    label="Guests"
                    hint={`Parties of 9 or more? Please call ${locationInfo.phone}.`}
                >
                    <select
                        id="guests"
                        name="guests"
                        value={values.guests}
                        onChange={handleChange}
                        aria-describedby="guests-hint"
                        className={inputClass(false)}
                    >
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                                {n} {n === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <FormField id="date" label="Date" error={dateError}>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        min={minDate}
                        value={values.date}
                        onChange={handleChange}
                        aria-invalid={Boolean(dateError)}
                        aria-describedby={dateError ? "date-error" : undefined}
                        className={inputClass(Boolean(dateError))}
                    />
                </FormField>

                <FormField id="time" label="Time" error={errors.time}>
                    <select
                        id="time"
                        name="time"
                        value={values.time}
                        onChange={handleChange}
                        disabled={!values.date || isClosedDay}
                        aria-invalid={Boolean(errors.time)}
                        aria-describedby={errors.time ? "time-error" : undefined}
                        className={inputClass(Boolean(errors.time))}
                    >
                        <option value="">
                            {values.date && !isClosedDay ? "Select a time" : "Choose a date first"}
                        </option>
                        {slots.map((slot) => (
                            <option key={slot} value={slot}>
                                {formatTime(slot)}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <FormField id="notes" label="Special requests" optional>
                <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={values.notes}
                    onChange={handleChange}
                    placeholder="Allergies, celebrations, a window seat..."
                    className={`${inputClass(false)} resize-none`}
                />
            </FormField>

            <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full"
            >
                {status === "submitting" ? "Sending..." : "Reserve my table"}
            </Button>
        </form>
    );
}