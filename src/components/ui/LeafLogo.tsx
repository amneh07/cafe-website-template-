interface LeafLogoProps {
    size?: number;
}

export default function LeafLogo({ size = 32 }: LeafLogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Maple leaf */}
            <path
                fill="#C0522D"
                d="M50 4 L58 22 L72 15 L68 36 L89 30 L80 49 L96 53 L73 69 L77 82 L55 77 L55 96 L45 96 L45 77 L23 82 L27 69 L4 53 L20 49 L11 30 L32 36 L28 15 L42 22 Z"
            />

            {/* Coffee bean carved into the leaf */}
            <g transform="rotate(-25 50 48)">
                <ellipse cx="50" cy="48" rx="14" ry="20" fill="#FDF6EC" />
                <path
                    d="M50 29 C 41 41, 59 55, 50 67"
                    fill="none"
                    stroke="#C0522D"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}