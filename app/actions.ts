'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ActionResult {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(email: string): Promise<ActionResult> {
  if (!email || typeof email !== 'string') {
    return { success: false, message: 'Invalid email provided.' };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    await addDoc(collection(db, 'newsletter-signups'), {
      email: email,
      subscribedAt: serverTimestamp(),
    });
    return { success: true, message: 'Successfully subscribed! Thank you.' };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    // It's good practice to not expose detailed error messages to the client.
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
}
