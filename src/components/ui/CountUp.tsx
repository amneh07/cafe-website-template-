"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
    to: number;
    suffix?: string;
    duration?: number;
}

export default function CountUp({ to, suffix = "", duration = 1.6 }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const shouldReduceMotion = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView || shouldReduceMotion) return;

        const controls = animate(0, to, {
            duration,
            ease: "easeOut",
            onUpdate: (latest) => setValue(Math.round(latest)),
        });

        return () => controls.stop();
    }, [isInView, shouldReduceMotion, to, duration]);

    const display = shouldReduceMotion ? to : value;

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}