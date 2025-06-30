// components/ConsentManager.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CookieConsentBanner from './CookieConsentBanner';
import {
  hasMadeConsentChoice,
  getConsentPreferences,
  ConsentPreferences,
  COOKIE_VERSION,
  defaultConsent
} from '../lib/cookieConsentUtils';

interface ConsentManagerProps {
  children: React.ReactNode;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState<ConsentPreferences>(defaultConsent);

  useEffect(() => {
    // This effect runs only on the client
    const initialPrefs = getConsentPreferences();
    setCurrentPreferences(initialPrefs);

    const alreadyMadeChoice = hasMadeConsentChoice();
    const consentVersionMatch = initialPrefs.version === COOKIE_VERSION;

    if (!alreadyMadeChoice || !consentVersionMatch) {
      setShowBanner(true);
      if (!consentVersionMatch && alreadyMadeChoice) {
        // If versions mismatch but a choice was made, it implies an old cookie.
        // We load default new preferences to be shown in the customization modal.
        setCurrentPreferences(defaultConsent);
        console.log('Cookie consent version mismatch or structure outdated. Prompting for new consent.');
      } else if (!alreadyMadeChoice) {
        // No choice made at all, ensure defaults are set for the banner
        setCurrentPreferences(defaultConsent);
      }
    }
  }, []);

  const handleConsentGiven = () => {
    setShowBanner(false);
    // Optionally, re-fetch preferences to ensure UI consistency if needed elsewhere,
    // but banner actions already save and update state internally.
    // setCurrentPreferences(getConsentPreferences());
  };

  return (
    <>
      {children}
      {showBanner && (
        <CookieConsentBanner
          onConsentGiven={handleConsentGiven}
          initialPreferences={currentPreferences}
        />
      )}
    </>
  );
};

export default ConsentManager;
