import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/common/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MODERNEST | Premium Living & Minimalist Design",
  description: "Curated collection of high-end, minimalist furniture and decor for the modern home. Experience luxury craftsmanship and timeless aesthetics.",
  keywords: ["furniture", "minimalist", "modern", "home decor", "luxury", "boutique"],
  authors: [{ name: "Modernest Team" }],
  openGraph: {
    title: "MODERNEST | Premium Living",
    description: "Curated minimalist design for your home.",
    url: "https://modernest.com",
    siteName: "Modernest",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
