import { ImageResponse } from "next/og";

export const alt = "Maple & Co. | Specialty coffee & fresh bakes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#3E2B23",
                    color: "#FDF6EC",
                }}
            >
                <div style={{ display: "flex", fontSize: 104, fontWeight: 700 }}>
                    Maple & Co.
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 28,
                        width: 96,
                        height: 4,
                        background: "#C0522D",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        marginTop: 32,
                        fontSize: 38,
                        color: "#E8DCC8",
                    }}
                >
                    Specialty coffee & fresh bakes
                </div>
            </div>
        ),
        { ...size }
    );
}