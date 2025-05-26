import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import ClarityAnalytics from "../components/measurement/Clarity.jsx"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Next Generation of Analytics | AnalyticsFlow",
  description: "Data Analytical service with focus on making companies better",
  openGraph: {
    title: "Next Generation of Analytics | AnalyticsFlow",
    description: "Data Analytical service with focus on making companies better",
    url: "https://analyticsflow.cz",
    type: "website",
    images: [
      {
        url: "/data_main_photo.jpeg",
      },
    ],
    siteName: "AnalyticsFlow",
    locale: "en_US",
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
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-5H4B3ZZW" />
      <ClarityAnalytics/>
      <Analytics/>
    </html>
  );
}
