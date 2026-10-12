import type { ReactNode } from "react";

interface FormFieldProps {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    optional?: boolean;
    children: ReactNode;
}

export default function FormField({
    id,
    label,
    error,
    hint,
    optional = false,
    children,
}: FormFieldProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block font-body text-sm font-medium text-ink"
            >
                {label}
                {optional && (
                    <span className="ml-1.5 font-normal text-ink/70">
                        (optional)
                    </span>
                )}
            </label>

            {children}

            {hint && !error && (
                <p id={`${id}-hint`} className="mt-2 font-body text-xs text-ink/70">
                    {hint}
                </p>
            )}

            {error && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    className="mt-2 font-body text-xs text-accent"
                >
                    {error}
                </p>
            )}
        </div>
    );
}