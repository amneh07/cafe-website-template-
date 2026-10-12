"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { isValidEmail } from "@/lib/validation";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        setStatus("submitting");

        // TODO: replace with a real API call once the backend is ready
        await new Promise((resolve) => setTimeout(resolve, 700));

        setStatus("success");
    };

    if (status === "success") {
        return (
            <p role="status" className="font-body text-sm leading-relaxed text-cafe-sugar">
                You&apos;re on the list. Thank you!
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
                Email address
            </label>
            <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="w-full rounded-full border border-cafe-white/20 bg-cafe-white/10 px-5 py-3 font-body text-sm text-cafe-white placeholder:text-cafe-sugar/50 transition-colors duration-300 focus:border-cafe-maple focus:outline-none focus:ring-2 focus:ring-cafe-maple/40"
            />

            {error && (
                <p
                    id="newsletter-error"
                    role="alert"
                    className="mt-2 font-body text-xs text-cafe-beige"
                >
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={status === "submitting"}
                className="mt-3 w-full"
            >
                {status === "submitting" ? "Subscribing..." : "Subscribe"}
            </Button>
        </form>
    );
}