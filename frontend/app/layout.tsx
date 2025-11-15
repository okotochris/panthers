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
  title: {
    default: "Panthers Football Academy | Nurturing Africa's Future Stars",
    template: "%s | Panthers Football Academy"
  },
  description: "Join Panthers Football Academy in Lagos, Nigeria. World-class training, holistic development, and pathways to professional football for young talents. Enroll today and unleash your potential.",
  keywords: ["football academy", "youth football", "soccer training Nigeria", "Panthers FC", "talent development", "pro football pathway"],
  authors: [{ name: "Panthers Football Academy" }],
  creator: "Panthers Football Academy",
  publisher: "Panthers Football Academy",
  openGraph: {
    title: "Panthers Football Academy | Nurturing Africa's Future Stars",
    description: "Discover elite youth football training in Lagos, Nigeria. From academy to pros – join the pride and build your football legacy.",
    type: "website",
    locale: "en_NG",
    siteName: "Panthers Football Academy",
    images: [
      {
        url: "/og-image.jpg", // Replace with actual OG image path in /public
        width: 1200,
        height: 630,
        alt: "Panthers Football Academy - Youth Football Excellence"
      }
    ],
    url: "https://panthersacademy.com", // Replace with your domain
  },
  twitter: {
    card: "summary_large_image",
    title: "Panthers Football Academy | Nurturing Africa's Future Stars",
    description: "Elite youth football training in Lagos, Nigeria. Pathways to professional success. Join us today!",
    images: ["/twitter-image.jpg"], // Replace with actual Twitter image path
    creator: "@PanthersAcademy", // Replace with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-token", // Add if you have Google Search Console verification
    yandex: "your-yandex-verification-token", // Optional
  },
  alternates: {
    canonical: "https://panthersacademy.com", // Replace with your domain
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}