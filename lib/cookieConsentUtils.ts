// lib/cookieConsentUtils.ts
import { setCookie, getCookie, hasCookie } from 'cookies-next';

export const CONSENT_COOKIE_NAME = 'user_consent_preferences';
export const COOKIE_VERSION = '2.0'; // Updated version for new structure

export interface ConsentPreferences {
  version: string;
  timestamp: number;
  essential: true; // Essential cookies are always active and cannot be disabled
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// Default consent: essential is true, others are false until explicitly accepted.
export const defaultConsent: ConsentPreferences = {
  version: COOKIE_VERSION,
  timestamp: 0,
  essential: true,
  analytics: false,
  marketing: false,
  preferences: false,
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

      // If the cookie version does not match the current version,
      // or if essential fields are missing, return default to force re-consent.
      if (
        parsed.version !== COOKIE_VERSION ||
        typeof parsed.analytics !== 'boolean' || // Check one of the new fields
        typeof parsed.marketing !== 'boolean' || // Check another new field
        typeof parsed.preferences !== 'boolean' // Check another new field
      ) {
        // Versions mismatch or structure is old/invalid, force re-consent by returning defaults.
        // No need to save default consent here, the banner will prompt for new choices.
        return { ...defaultConsent, timestamp: 0 }; // Reset timestamp too
      }

      // If version matches and structure seems valid, return the parsed preferences,
      // ensuring essential is always true.
      return {
        ...defaultConsent, // Provides defaults for any potentially missing non-critical fields
        ...parsed,
        essential: true, // Ensure essential is always true, regardless of what's in cookie
        version: COOKIE_VERSION, // Ensure version is current
      };
    } catch (error) {
      console.error('Error parsing consent cookie:', error);
      // Fall through to return default consent, forcing re-consent.
    }
  }
  // No cookie found or error in parsing, return default to force consent.
  return { ...defaultConsent, timestamp: 0 };
};

/**
 * Checks if the user has already made a consent choice (i.e., the consent cookie exists).
 * This doesn't validate the content, just presence.
 * IMPORTANT: This function is intended for client-side use only, as `hasCookie`
 * from `cookies-next` returns a boolean synchronously on the client.
 * @returns True if the consent cookie exists, false otherwise.
 */
export const hasMadeConsentChoice = (): boolean => {
  // On the client, hasCookie returns boolean.
  // Add a check for window to be explicit about client-side execution.
  if (typeof window === 'undefined') {
    // This case should ideally not happen if called correctly from client-side logic.
    // Returning false or throwing an error might be options.
    // For safety, returning false as if no choice has been made server-side.
    return false;
  }
  return hasCookie(CONSENT_COOKIE_NAME) as boolean; // Explicit type assertion
};

/**
 * Helper function to grant consent for all non-essential categories.
 * Essential cookies remain true.
 */
export const grantAllConsent = (): ConsentPreferences => {
  const newPreferences: ConsentPreferences = {
    ...defaultConsent, // Includes essential: true, version, and timestamp placeholder
    analytics: true,
    marketing: true,
    preferences: true,
    timestamp: Date.now(), // Overwrite timestamp
    version: COOKIE_VERSION, // Ensure current version
  };
  saveConsentPreferences(newPreferences);
  return newPreferences;
};

/**
 * Helper function to reject all non-essential categories.
 * Essential cookies remain true.
 */
export const rejectAllConsent = (): ConsentPreferences => {
  const newPreferences: ConsentPreferences = {
    ...defaultConsent, // Includes essential: true, version, and timestamp placeholder
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: Date.now(), // Overwrite timestamp
    version: COOKIE_VERSION, // Ensure current version
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
