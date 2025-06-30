// components/CookieCustomizationModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ConsentPreferences, defaultConsent as defaultConsentValues } from '../lib/cookieConsentUtils';

interface CookieCustomizationModalProps {
  initialPreferences: ConsentPreferences;
  onSave: (preferences: ConsentPreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onClose: () => void;
  isVisible: boolean;
}

// Basic styling (can be moved to CSS files/modules)
const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2001, // Higher than the main banner
  padding: '20px',
};

const modalStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  maxWidth: '600px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  textAlign: 'left',
};

const toggleContainerStyles: React.CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  border: '1px solid #eee',
  borderRadius: '6px',
};

const toggleLabelStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: '600',
  fontSize: '17px',
  marginBottom: '5px',
};

const toggleDescriptionStyles: React.CSSProperties = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '10px',
};

const switchStyles: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '28px',
};

const switchInputStyles: React.CSSProperties = {
  opacity: 0,
  width: 0,
  height: 0,
};

const sliderStyles: (isChecked: boolean) => React.CSSProperties = (isChecked) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: isChecked ? '#0070f3' : '#ccc',
  transition: '.4s',
  borderRadius: '28px',
});

const sliderBeforeStyles: (isChecked: boolean) => React.CSSProperties = (isChecked) => ({
  position: 'absolute',
  content: '""',
  height: '20px',
  width: '20px',
  left: '4px',
  bottom: '4px',
  backgroundColor: 'white',
  transition: '.4s',
  borderRadius: '50%',
  transform: isChecked ? 'translateX(22px)' : 'translateX(0)',
});


const buttonContainerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '25px',
  gap: '10px',
  flexWrap: 'wrap',
};

const buttonStyles: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
};

const primaryButtonStyles: React.CSSProperties = { ...buttonStyles, backgroundColor: '#0070f3', color: 'white' };
const secondaryButtonStyles: React.CSSProperties = { ...buttonStyles, backgroundColor: '#6c757d', color: 'white' };
const tertiaryButtonStyles: React.CSSProperties = { ...buttonStyles, backgroundColor: '#e9ecef', color: '#212529' };


const CookieCustomizationModal: React.FC<CookieCustomizationModalProps> = ({
  initialPreferences,
  onSave,
  onAcceptAll,
  onRejectAll,
  onClose,
  isVisible,
}) => {
  const [analyticsConsent, setAnalyticsConsent] = useState(initialPreferences.analytics);
  const [marketingConsent, setMarketingConsent] = useState(initialPreferences.marketing);
  const [preferencesConsent, setPreferencesConsent] = useState(initialPreferences.preferences);

  useEffect(() => {
    setAnalyticsConsent(initialPreferences.analytics);
    setMarketingConsent(initialPreferences.marketing);
    setPreferencesConsent(initialPreferences.preferences);
  }, [initialPreferences]);

  if (!isVisible) {
    return null;
  }

  const handleSave = () => {
    onSave({
      ...initialPreferences, // Preserves version, timestamp (will be updated by saveConsentPreferences), essential
      analytics: analyticsConsent,
      marketing: marketingConsent,
      preferences: preferencesConsent,
    });
  };

  const handleAcceptAllClick = () => {
    setAnalyticsConsent(true);
    setMarketingConsent(true);
    setPreferencesConsent(true);
    onAcceptAll(); // This will save the fully accepted state via cookieConsentUtils
  };

  const handleRejectAllClick = () => {
    setAnalyticsConsent(false);
    setMarketingConsent(false);
    setPreferencesConsent(false);
    onRejectAll(); // This will save the fully rejected state via cookieConsentUtils
  };


  interface ToggleProps {
    id: string;
    label: string;
    description: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
    disabled?: boolean;
  }

  const ConsentToggle: React.FC<ToggleProps> = ({ id, label, description, isChecked, onChange, disabled }) => (
    <div style={toggleContainerStyles}>
      <div style={toggleLabelStyles}>
        <span>{label}</span>
        <label style={switchStyles} htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            style={switchInputStyles}
            checked={isChecked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
          />
          <span style={sliderStyles(isChecked)}>
            <span style={sliderBeforeStyles(isChecked)}></span>
          </span>
        </label>
      </div>
      <p style={toggleDescriptionStyles}>{description}</p>
    </div>
  );

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '10px', textAlign: 'center' }}>
          Přizpůsobit nastavení cookies
        </h2>
        <p style={{ fontSize: '15px', color: '#333', marginBottom: '20px', lineHeight: '1.6' }}>
          Spravujte své preference pro soubory cookie. Můžete povolit nebo zakázat různé kategorie cookies. Nezbytné cookies jsou vždy aktivní pro zajištění funkčnosti webu.
        </p>

        <ConsentToggle
          id="essential"
          label="Nezbytné cookies"
          description="Tyto cookies jsou nutné pro základní funkce webu, jako je navigace, zabezpečení a dostupnost. Nelze je zakázat."
          isChecked={true}
          onChange={() => {}} // No-op
          disabled={true}
        />

        <ConsentToggle
          id="analytics"
          label="Analytické cookies"
          description="Pomáhají nám porozumět, jak návštěvníci používají naše stránky, sběrem a reportováním anonymních informací. Umožňují nám zlepšovat web."
          isChecked={analyticsConsent}
          onChange={setAnalyticsConsent}
        />

        <ConsentToggle
          id="marketing"
          label="Marketingové cookies"
          description="Používají se ke sledování návštěvníků napříč webovými stránkami s cílem zobrazovat relevantnější a poutavější reklamy."
          isChecked={marketingConsent}
          onChange={setMarketingConsent}
        />

        <ConsentToggle
          id="preferences"
          label="Preferenční cookies"
          description="Umožňují webu pamatovat si informace, které mění jeho chování nebo vzhled, například preferovaný jazyk nebo region."
          isChecked={preferencesConsent}
          onChange={setPreferencesConsent}
        />

        <div style={buttonContainerStyles}>
          <button style={tertiaryButtonStyles} onClick={handleRejectAllClick}>
            Odmítnout vše
          </button>
          <button style={primaryButtonStyles} onClick={handleSave}>
            Uložit nastavení
          </button>
          <button style={secondaryButtonStyles} onClick={handleAcceptAllClick}>
            Povolit vše
          </button>
        </div>
         <button
            onClick={onClose}
            style={{...buttonStyles, backgroundColor: 'transparent', color: '#0070f3', marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
            Zavřít
        </button>
      </div>
    </div>
  );
};

export default CookieCustomizationModal;
