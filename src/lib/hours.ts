import type { DayHours } from "@/data/location";
import { formatTime } from "@/lib/time";

// Groups consecutive days that share the same hours, e.g. "Mon – Thu"
export function summarizeHours(hours: DayHours[]) {
    const groups: { label: string; time: string }[] = [];
    let i = 0;

    while (i < hours.length) {
        let j = i;
        while (
            j + 1 < hours.length &&
            hours[j + 1].open === hours[i].open &&
            hours[j + 1].close === hours[i].close
        ) {
            j++;
        }

        const start = hours[i].day.slice(0, 3);
        const end = hours[j].day.slice(0, 3);
        const { open, close } = hours[i];

        groups.push({
            label: i === j ? start : `${start} – ${end}`,
            time: open && close ? `${formatTime(open)} – ${formatTime(close)}` : "Closed",
        });

        i = j + 1;
    }

    return groups;
}