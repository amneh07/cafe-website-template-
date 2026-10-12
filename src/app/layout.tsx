import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { allowIndexing, siteUrl } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maple & Co. | Specialty coffee & fresh bakes",
    template: "%s | Maple & Co.",
  },
  description:
    "A quiet corner in the city where the coffee is strong, the pastries are fresh, and there's always a seat for you.",
  robots: { index: allowIndexing, follow: allowIndexing },
  openGraph: {
    type: "website",
    siteName: "Maple & Co.",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6EC" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1411" },
  ],
};

// Runs before the page paints, so the saved theme never flashes
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cafe-maple focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:font-medium focus:text-cafe-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}