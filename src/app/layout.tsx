import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ORMRIME — Kyoto-Drip Bottled Cold Brew Latte",
  description:
    "Slow-steeped 18 hours, single-origin milk, nitrogen-sealed in 250ml flint glass. Small-batch bottled cold brew from Bali.",
};

export const viewport: Viewport = {
  themeColor: "#2d1c12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="bg-sequence-bg text-coffee-50 antialiased">
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}