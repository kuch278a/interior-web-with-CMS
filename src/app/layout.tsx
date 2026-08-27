import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURATECH Studio — Visionary Architecture & Interior Luxury",
  description:
    "Award-winning architectural and interior design studio crafting bespoke residential, commercial, and hospitality landmarks.",
  keywords: [
    "Interior Architecture",
    "Luxury Architecture Studio",
    "Bespoke Millwork",
    "Circadian Lighting",
    "Sustainable Luxury",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-purple-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
