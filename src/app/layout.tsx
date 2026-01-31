import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PortfolioFloatingElements from "@/components/PortfolioFloatingElements";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://harsha-portfolio.vercel.app'),
  title: "Harsha - Frontend Developer Portfolio",
  description: "Experienced frontend developer specializing in React, Next.js, and modern web technologies. Creating beautiful, responsive web applications with clean code and exceptional user experiences.",
  keywords: ["frontend developer", "react", "next.js", "typescript", "tailwind css", "web development", "portfolio", "harsha"],
  authors: [{ name: "Harsha" }],
  creator: "Harsha",
  publisher: "Harsha",
  openGraph: {
    title: "Harsha - Frontend Developer Portfolio",
    description: "Experienced frontend developer specializing in React, Next.js, and modern web technologies.",
    url: "https://harsha-portfolio.vercel.app",
    siteName: "Harsha Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harsha - Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsha - Frontend Developer Portfolio",
    description: "Experienced frontend developer specializing in React, Next.js, and modern web technologies.",
    images: ["/images/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts for all scripts used in IntroScreen */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Noto+Sans+Telugu:wght@700&family=Noto+Sans+Devanagari:wght@700&family=Noto+Sans+JP:wght@700&family=Noto+Sans+KR:wght@700&family=Noto+Sans+Arabic:wght@700&family=Noto+Sans+SC:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <PortfolioFloatingElements />
      </body>
    </html>
  );
}
