// components/CookieConsentBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Define a simple CSS style for the banner within the component for now.
// In a real app, this might go into a global CSS file or a CSS module.
const bannerStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const buttonContainerStyles: React.CSSProperties = {
  marginTop: '15px',
};

const buttonStyles: React.CSSProperties = {
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  margin: '0 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const smallButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  backgroundColor: '#777',
  padding: '8px 15px',
  fontSize: '14px',
};

interface CookieConsentBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void; // For now, customize might just toggle analytics
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}) => {
  // This local state is just for controlling visibility during development of the component.
  // The actual global visibility will be managed by the consent state in a later step.
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div style={bannerStyles}>
      <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
        We use cookies to enhance your experience. By clicking "Accept All", you agree to our use of cookies for analytical purposes.
      </p>
      <div style={buttonContainerStyles}>
        <button style={buttonStyles} onClick={() => { onAcceptAll(); setIsVisible(false); }}>
          Accept All
        </button>
        <button style={buttonStyles} onClick={() => { onRejectAll(); setIsVisible(false); }}>
          Reject All
        </button>
        {/* We can refine the customize experience later. For now, it acts like a toggle for analytics. */}
        <button style={smallButtonStyles} onClick={() => { onCustomize(); setIsVisible(false); }}>
          Customize
        </button>
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        <a href="/cookies" style={{ color: '#0070f3', textDecoration: 'underline', marginRight: '15px' }}>Cookie Policy</a>
        <a href="/ochrana-soukromi" style={{ color: '#0070f3', textDecoration: 'underline' }}>Privacy Policy</a>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
