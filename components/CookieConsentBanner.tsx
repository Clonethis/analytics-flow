// components/CookieConsentBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';

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
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}) => {
  // The parent component that uses this banner will control its visibility
  // based on actual consent status. This component is always "visible" when rendered.

  const handleAcceptAll = () => {
    onAcceptAll();
    pushToDataLayer({ event: 'consent_update', consent_status: 'accepted_all', analytics_storage: 'granted', ad_storage: 'granted', ad_user_data:'granted', ad_personalization: 'granted' });
    // setIsVisible(false) logic should be handled by parent based on consent state
  };

  const handleRejectAll = () => {
    onRejectAll();
    pushToDataLayer({ event: 'consent_update', consent_status: 'rejected_all', analytics_storage: 'denied', ad_storage: 'denied', ad_user_data:'denied', ad_personalization: 'denied' });
  };

  const handleCustomize = () => {
    onCustomize();
    // Depending on the customize flow, a different GTM event might be pushed after customization.
    // For now, we can log that customize was initiated.
    pushToDataLayer({ event: 'consent_customize_open' });
    // If customize immediately sets a state and closes, then a consent_update event should be here.
  };

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
            Odmítnout Vše
          </button>
          <button style={tertiaryButtonStyles} onClick={handleCustomize}>
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
