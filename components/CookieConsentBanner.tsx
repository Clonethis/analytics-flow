// components/CookieConsentBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CookieCustomizationModal from './CookieCustomizationModal';
import {
  ConsentPreferences,
  saveConsentPreferences,
  grantAllConsent,
  rejectAllConsent,
  getConsentPreferences as loadInitialPreferences // Renamed for clarity in this context
} from '../lib/cookieConsentUtils';

// Helper function to push to GTM dataLayer
const pushToDataLayer = (eventData: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ...eventData,
      event: eventData.event || 'consent_event', // Default event name if not specified
    });
  } else {
    console.log('dataLayer not found, GTM event not sent:', eventData);
  }
};

// GTM event for specific consent choices
const pushConsentChoicesToDataLayer = (preferences: ConsentPreferences) => {
  console.log("Log preferences",preferences);
  pushToDataLayer({
    event: 'consent_update',
    consent_status: 'customized', // Or determine based on choices
    ad_storage: preferences.ad_storage ? 'granted' : 'denied',
    ad_user_data: preferences.ad_user_data ? 'granted' : 'denied',
    ad_personalization: preferences.ad_personalization ? 'granted' : 'denied',
    analytics_storage: preferences.analytics_storage ? 'granted' : 'denied',
    // marketing_storage: preferences.marketing ? 'granted' : 'denied',
    // preferences_storage: preferences.preferences ? 'granted' : 'denied',,
    // essential_storage is always 'granted'
  });
};


const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent backdrop
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000, // Ensure it's on top of other content
  padding: '20px', // Padding for smaller screens so modal doesn't touch edges
};

const modalStyles: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  maxWidth: '500px', // Max width for larger screens
  width: '100%', // Responsive width
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px', // Spacing between elements
};

const buttonContainerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px', // Spacing between buttons
  flexWrap: 'wrap', // Allow buttons to wrap on smaller screens
  marginTop: '10px',
};

const baseButtonStyles: React.CSSProperties = {
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
};

const primaryButtonStyles: React.CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: '#0070f3', // Blue
};

const secondaryButtonStyles: React.CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: '#6c757d', // Gray
};

const tertiaryButtonStyles: React.CSSProperties = {
  ...baseButtonStyles,
  backgroundColor: '#f0f0f0',
  color: '#333',
  padding: '10px 20px',
  fontSize: '14px',
};


interface CookieConsentBannerProps {
  // These props will now be handled by the parent component that decides to show this banner
  // For example, a global state or a layout component would call these utility functions
  // and then hide the banner.
  onConsentGiven: () => void;
  initialPreferences: ConsentPreferences;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onConsentGiven,
  initialPreferences: initialPrefsFromProp
}) => {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  // Store current preferences, initialized from props (which should come from getConsentPreferences)
  const [currentPreferences, setCurrentPreferences] = useState<ConsentPreferences>(initialPrefsFromProp);

  useEffect(() => {
    setCurrentPreferences(initialPrefsFromProp);
  }, [initialPrefsFromProp]);


  const handleAcceptAll = () => {
    const newPrefs = grantAllConsent(); // Saves cookie and returns new prefs
    setCurrentPreferences(newPrefs);
    pushConsentChoicesToDataLayer(newPrefs);
    onConsentGiven(); // Signal parent to hide banner
  };

  const handleRejectAll = () => {
    const newPrefs = rejectAllConsent(); // Saves cookie and returns new prefs
    setCurrentPreferences(newPrefs);
    pushConsentChoicesToDataLayer(newPrefs);
    onConsentGiven(); // Signal parent to hide banner
  };

  const openCustomizeModal = () => {
    // Load fresh preferences in case they were changed elsewhere or for initial load
    setCurrentPreferences(loadInitialPreferences());
    setShowCustomizeModal(true);
    pushToDataLayer({ event: 'consent_customize_open' });
  };

  const handleSaveCustomizedPreferences = (prefs: ConsentPreferences) => {
    saveConsentPreferences(prefs);
    setCurrentPreferences(prefs);
    pushConsentChoicesToDataLayer(prefs);
    setShowCustomizeModal(false);
    onConsentGiven(); // Signal parent to hide banner
  };

  const handleAcceptAllFromCustomModal = () => {
    const newPrefs = grantAllConsent();
    setCurrentPreferences(newPrefs);
    pushConsentChoicesToDataLayer(newPrefs);
    setShowCustomizeModal(false);
    onConsentGiven();
  };

  const handleRejectAllFromCustomModal = () => {
    const newPrefs = rejectAllConsent();
    setCurrentPreferences(newPrefs);
    pushConsentChoicesToDataLayer(newPrefs);
    setShowCustomizeModal(false);
    onConsentGiven();
  };


  if (showCustomizeModal) {
    return (
      <CookieCustomizationModal
        initialPreferences={currentPreferences}
        onSave={handleSaveCustomizedPreferences}
        onAcceptAll={handleAcceptAllFromCustomModal}
        onRejectAll={handleRejectAllFromCustomModal}
        onClose={() => setShowCustomizeModal(false)}
        isVisible={true}
      />
    );
  }

  // Render the main banner if customize modal is not shown
  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 10px 0' }}>Nastavení Soukromí</h2>
        <p style={{ margin: '0 0 15px 0', fontSize: '15px', lineHeight: '1.6' }}>
          Používáme soubory cookie a podobné technologie, abychom vám poskytli co nejlepší zážitek z našich webových stránek. Pomáhají nám analyzovat návštěvnost a personalizovat obsah. Svůj souhlas můžete kdykoli změnit.
        </p>
        <div style={buttonContainerStyles}>
          <button style={primaryButtonStyles} onClick={handleAcceptAll}>
            Přijmout Vše
          </button>
          <button style={secondaryButtonStyles} onClick={handleRejectAll}>
            Odmítnout Všechny (kromě nezbytných)
          </button>
          <button style={tertiaryButtonStyles} onClick={openCustomizeModal}>
            Přizpůsobit
          </button>
        </div>
        <div style={{ marginTop: '20px', fontSize: '13px' }}>
          <a href="/cookies" style={{ color: '#0070f3', textDecoration: 'underline', marginRight: '15px' }}>
            Zásady používání souborů cookie
          </a>
          <a href="/ochrana-soukromi" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Ochrana osobních údajů
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
