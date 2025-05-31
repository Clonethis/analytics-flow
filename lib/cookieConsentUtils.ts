// lib/cookieConsentUtils.ts
import { setCookie, getCookie, hasCookie } from 'cookies-next';

export const CONSENT_COOKIE_NAME = 'user_consent_preferences';
export const COOKIE_VERSION = '1.0'; // Versioning for future updates

export interface ConsentPreferences {
  version: string; // Version of the consent structure/banner
  timestamp: number; // When the consent was given
  analytics: boolean; // Example category: true if analytics allowed, false otherwise
  // Add other categories here as needed, e.g., marketing: boolean;
}

// Default consent: typically all denied until explicitly accepted
export const defaultConsent: ConsentPreferences = {
  version: COOKIE_VERSION,
  timestamp: 0,
  analytics: false,
};

/**
 * Saves the user's consent preferences to a cookie.
 * @param preferences The consent preferences to save.
 */
export const saveConsentPreferences = (preferences: ConsentPreferences): void => {
  const preferencesToSave = {
    ...preferences,
    timestamp: Date.now(), // Update timestamp on save
    version: COOKIE_VERSION, // Ensure current version is saved
  };
  // Set cookie to expire in 1 year (typical for consent)
  // `path: '/'` makes it accessible across the entire site.
  // `sameSite: 'lax'` is a good default for most cases.
  // `secure: process.env.NODE_ENV === 'production'` ensures cookie is only sent over HTTPS in production.
  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(preferencesToSave), {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

/**
 * Retrieves the user's consent preferences from the cookie.
 * Returns default consent if the cookie is not found or is invalid.
 * @returns The user's consent preferences.
 */
export const getConsentPreferences = (): ConsentPreferences => {
  const cookieValue = getCookie(CONSENT_COOKIE_NAME);
  if (cookieValue && typeof cookieValue === 'string') {
    try {
      const parsed = JSON.parse(cookieValue) as Partial<ConsentPreferences>;
      // Basic validation: check if it has an analytics property and a version.
      // More robust validation might be needed for version migrations.
      if (typeof parsed.analytics === 'boolean' && parsed.version) {
        // If old version, could potentially migrate or reset to default.
        // For now, if version doesn't match, we could reset to default or handle migration.
        // Let's assume for now that any valid cookie with a version is acceptable,
        // or we can enforce version match:
        if (parsed.version !== COOKIE_VERSION) {
            // If versions mismatch, it might be safer to return default consent,
            // forcing re-consent for the new banner version.
            // Or, implement a migration strategy. For now, let's re-evaluate.
            // For simplicity in this step, if there's a cookie, we'll assume it's valid enough
            // and the banner logic itself will handle if re-prompt is needed based on version.
            // A more robust approach would be to clear old versions or migrate.
            // Let's just return default if version is not current.
             return { ...defaultConsent, ...parsed, version: parsed.version || COOKIE_VERSION };
        }
        return { ...defaultConsent, ...parsed };
      }
    } catch (error) {
      console.error('Error parsing consent cookie:', error);
      // Fall through to return default consent
    }
  }
  return { ...defaultConsent, timestamp: 0 }; // Ensure timestamp is 0 if no valid cookie
};

/**
 * Checks if the user has already made a consent choice (i.e., the consent cookie exists).
 * This doesn't validate the content, just presence.
 * @returns True if the consent cookie exists, false otherwise.
 */
export const hasMadeConsentChoice = (): boolean => {
  return hasCookie(CONSENT_COOKIE_NAME);
};

/**
 * Helper function to grant consent for all categories (currently just analytics).
 */
export const grantAllConsent = (): ConsentPreferences => {
  const newPreferences: ConsentPreferences = {
    ...defaultConsent,
    analytics: true,
    timestamp: Date.now(),
  };
  saveConsentPreferences(newPreferences);
  return newPreferences;
};

/**
 * Helper function to reject all non-essential categories.
 */
export const rejectAllConsent = (): ConsentPreferences => {
  const newPreferences: ConsentPreferences = {
    ...defaultConsent,
    analytics: false, // Explicitly set analytics to false
    timestamp: Date.now(),
  };
  saveConsentPreferences(newPreferences);
  return newPreferences;
};

/**
 * Function to handle "customize" - for now, let's assume it means toggling analytics.
 * In a more complex scenario, this would take specific categories.
 * This is a placeholder; the actual customization UI would call saveConsentPreferences directly.
 */
export const toggleAnalyticsConsent = (): ConsentPreferences => {
  const currentPrefs = getConsentPreferences();
  const newPreferences: ConsentPreferences = {
    ...currentPrefs,
    analytics: !currentPrefs.analytics, // Toggle analytics
    timestamp: Date.now(),
  };
  saveConsentPreferences(newPreferences);
  return newPreferences;
};
