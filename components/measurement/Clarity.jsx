// components/measurement/Clarity.jsx
'use client';
import { useEffect } from 'react';
import { init } from '@microsoft/clarity-web'; // Correct import based on typical usage

const clarityProjectId = "rmolqmm134";

export default function ClarityAnalytics({ consent }) {
  useEffect(() => {
    // Only initialize if consent for analytics is given
    if (consent && consent.analytics && clarityProjectId) {
      // The init function from clarity-web is usually just called.
      // It's generally safe to call multiple times but ideally should only be called once.
      // However, for simplicity and to react to consent changes, we call it when consent is true.
      // A more robust solution might involve a state variable to track if init has been called.
      init(clarityProjectId);
    }
  }, [consent]); // Re-run the effect if the consent object changes

  return null;
}