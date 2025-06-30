// app/layout.tsx
'use client'; // Required for useState, useEffect

import { Geist, Geist_Mono } from "next/font/google";
// import { metadata } from "./metadata"; // Metadata is typically not used in a 'use client' root layout directly
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"; // Renamed to avoid conflict

// Imports for Cookie Consent
import React, { useState, useEffect } from 'react';
import CookieConsentBanner from '../components/CookieConsentBanner';
import {
  getConsentPreferences,
  hasMadeConsentChoice,
  COOKIE_VERSION,
  ConsentPreferences,
  defaultConsent
} from '../lib/cookieConsentUtils';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is now imported from app/metadata.ts

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [displayBanner, setDisplayBanner] = useState(false);
  const [bannerInitialPrefs, setBannerInitialPrefs] = useState<ConsentPreferences>(defaultConsent);
  // State to track if Vercel analytics should be enabled, separate from banner display
  const [enableVercelAnalytics, setEnableVercelAnalytics] = useState(false);


  useEffect(() => {
    const initialPrefs = getConsentPreferences();
    setBannerInitialPrefs(initialPrefs); // For passing to banner if it's shown
    setEnableVercelAnalytics(initialPrefs.analytics); // Set Vercel analytics based on current consent

    const choiceMade = hasMadeConsentChoice();
    const versionMatch = initialPrefs.version === COOKIE_VERSION;

    if (!choiceMade || !versionMatch) {
      setDisplayBanner(true);
      // If version mismatch but choice was made, ensure banner gets fresh defaults
      // for the customization modal.
      if (!versionMatch && choiceMade) {
        setBannerInitialPrefs(defaultConsent);
      }
    } else {
      // If consent is valid and already given, ensure GTM is updated.
      // The banner's internal GTM calls handle updates when choices are made *through the banner*.
      // This handles the case for subsequent page loads where the banner isn't shown.
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': initialPrefs.analytics ? 'granted' : 'denied',
          'marketing_storage': initialPrefs.marketing ? 'granted' : 'denied',
          'preferences_storage': initialPrefs.preferences ? 'granted' : 'denied',
          // ad_storage can be added if marketing implies ad cookies
        });
      }
    }
  }, []);

  const handleConsentFinalized = () => {
    setDisplayBanner(false);
    // After consent is given through the banner, update Vercel analytics status
    const currentPrefs = getConsentPreferences();
    setEnableVercelAnalytics(currentPrefs.analytics);
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
                'ad_storage': 'denied',
                'marketing_storage': 'denied', // Explicitly deny marketing
                'preferences_storage': 'denied', // Explicitly deny preferences
                'personalization_storage': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
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

        {displayBanner && (
          <CookieConsentBanner
            onConsentGiven={handleConsentFinalized}
            initialPreferences={bannerInitialPrefs}
          />
        )}

        {enableVercelAnalytics && <VercelAnalytics />}
      </body>
    </html>
  );
}
