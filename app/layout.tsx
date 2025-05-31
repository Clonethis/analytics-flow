// app/layout.tsx
'use client'; // Required for useState, useEffect

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import ClarityAnalytics from "../components/measurement/Clarity.jsx"; // Keep existing
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"; // Keep existing

// Imports for Cookie Consent
import React, { useState, useEffect } from 'react';
import CookieConsentBanner from '../components/CookieConsentBanner';
import {
  getConsentPreferences,
  saveConsentPreferences,
  grantAllConsent,
  rejectAllConsent,
  COOKIE_VERSION,
  ConsentPreferences,
  defaultConsent
} from '../lib/cookieConsentUtils'; // Adjust path as needed

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
  const [showBanner, setShowBanner] = useState(false);
  // Initialize with defaultConsent, useEffect will update it from cookie
  const [consent, setConsent] = useState<ConsentPreferences>(defaultConsent);

  useEffect(() => {
    const currentConsent = getConsentPreferences();
    setConsent(currentConsent);
    if (currentConsent.timestamp === 0 || currentConsent.version !== COOKIE_VERSION) {
      setShowBanner(true);
    } else {
      // If consent already exists, update GTM
      // This handles the case where user re-visits and already has consent
      if (typeof window.gtag === 'function') { // Ensure gtag is available
        window.gtag('consent', 'update', {
          'analytics_storage': currentConsent.analytics ? 'granted' : 'denied'
        });
      }
    }
  }, []);

  const updateGtmConsent = (analyticsGranted: boolean) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': analyticsGranted ? 'granted' : 'denied'
        // Add other consent types if used by your GTM tags
      });
    }
  };

  const handleAcceptAll = () => {
    const newConsent = grantAllConsent();
    setConsent(newConsent);
    setShowBanner(false);
    updateGtmConsent(true);

    // Log consent to GA4 via dataLayer
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        'event': 'cookie_consent_update', // Custom event name
        'consent_timestamp': Math.floor(newConsent.timestamp / 1000), // Unix timestamp in seconds
        'consent_analytics_granted': newConsent.analytics, // boolean
        'cookie_banner_version': COOKIE_VERSION
      });
    }
  };

  const handleRejectAll = () => {
    const newConsent = rejectAllConsent();
    setConsent(newConsent);
    setShowBanner(false);
    updateGtmConsent(false);

    // Log consent to GA4 via dataLayer
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_timestamp': Math.floor(newConsent.timestamp / 1000),
        'consent_analytics_granted': newConsent.analytics,
        'cookie_banner_version': COOKIE_VERSION
      });
    }
  };

  const handleCustomize = () => {
    // For this step, let's make customize also accept all for simplicity.
    // A real implementation would save the specific choices made in a customize UI.
    const newConsent = grantAllConsent();
    setConsent(newConsent);
    setShowBanner(false);
    updateGtmConsent(newConsent.analytics);

    // Log consent to GA4 via dataLayer
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_timestamp': Math.floor(newConsent.timestamp / 1000),
        'consent_analytics_granted': newConsent.analytics,
        'cookie_banner_version': COOKIE_VERSION
      });
    }
  };

  return (
    <html lang="en">
      <head>
        {/* GTM Default Consent - MUST be before GTM script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied', // Include if relevant, good practice
                'personalization_storage': 'denied', // Include if relevant
                'functionality_storage': 'granted', // Usually needed for site to work
                'security_storage': 'granted' // Usually needed for site to work
                // Add other GTM consent types as needed
              });
            `,
          }}
        />
        {/* GTM Script itself */}
        <GoogleTagManager gtmId="GTM-5H4B3ZZW" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />

        {showBanner && (
          <CookieConsentBanner
            onAcceptAll={handleAcceptAll}
            onRejectAll={handleRejectAll}
            onCustomize={handleCustomize}
          />
        )}

        {/* Conditionally load Clarity */}
        <ClarityAnalytics consent={consent} />

        {/* Conditionally load Vercel Analytics */}
        {consent.analytics && <Analytics />}
      </body>
    </html>
  );
}
