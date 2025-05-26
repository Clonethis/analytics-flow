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

// Interface for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<ActionResult> {
  // Server-side validation
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    return { success: false, message: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (formData.name.length < 2) {
    return { success: false, message: 'Name must be at least 2 characters long.'}
  }

  if (formData.subject.length < 3) {
    return { success: false, message: 'Subject must be at least 3 characters long.'}
  }

  if (formData.message.length < 10) {
    return { success: false, message: 'Message must be at least 10 characters long.'}
  }


  try {
    await addDoc(collection(db, 'contact-inquiries'), {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      submittedAt: serverTimestamp(),
    });
    return { success: true, message: 'Your message has been sent successfully! We will get back to you soon.' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: 'An error occurred while sending your message. Please try again later.' };
  }
}
