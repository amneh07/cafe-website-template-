import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Page not found",
};

export default function NotFound() {
    return (
        <main
            id="main-content"
            className="flex min-h-[80vh] items-center justify-center bg-surface px-6 py-32 text-center"
        >
            <div className="max-w-lg">
                <p className="font-heading text-8xl text-accent sm:text-9xl">404</p>
                <h1 className="mt-4 font-heading text-3xl text-ink sm:text-4xl">
                    This page has gone cold
                </h1>
                <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
                    The page you&apos;re looking for doesn&apos;t exist or has moved.
                    Let&apos;s get you back to something warm.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Button href="/" variant="primary">
                        Back to home
                    </Button>
                    <Button href="/menu" variant="outline">
                        View menu
                    </Button>
                </div>
            </div>
        </main>
    );
}