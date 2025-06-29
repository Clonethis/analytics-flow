'use client';

import { useState, FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { submitContactForm, ContactFormData } from '@/app/actions'; // Assuming actions.ts is in app directory

export default function KontaktPage() {
  const mapUrl = "https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Clubco,Vlnena+526/3,Brno,Czechia";

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormMessage({ type: 'error', text: 'Všechna pole jsou povinná.' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormMessage({ type: 'error', text: 'Prosím zadejte platnou emailovou adresu.' });
      return false;
    }
    if (formData.name.length < 2) {
      setFormMessage({ type: 'error', text: 'Jméno musí mít alespoň 2 znaky.' });
      return false;
    }
    if (formData.subject.length < 3) {
      setFormMessage({ type: 'error', text: 'Předmět musí mít alespoň 3 znaky.' });
      return false;
    }
    if (formData.message.length < 10) {
      setFormMessage({ type: 'error', text: 'Zpráva musí mít alespoň 10 znaků.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const result = await submitContactForm(formData);
    setIsLoading(false);

    if (result.success) {
      setFormMessage({ type: 'success', text: result.message });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } else {
      setFormMessage({ type: 'error', text: result.message });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mb-12">
        Kontaktujte nás
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left column for contact info and form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Napište nám</h2>
          <p className="text-muted-foreground mb-4">
            Máte dotaz, návrh na spolupráci nebo jen chcete pozdravit? Vyplňte formulář níže a my se vám co nejdříve ozveme.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Jméno
              </label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Vaše jméno" 
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                E-mail
              </label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="vas@email.cz" 
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
                Předmět
              </label>
              <Input 
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="O co se jedná?" 
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isLoading}
                required 
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                Zpráva
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Napište nám zprávu..."
                value={formData.message}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-y"
              />
            </div>

            {formMessage && (
              <p className={`text-sm ${formMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {formMessage.text}
              </p>
            )}
            
            <div>
              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? 'Odesílání...' : 'Odeslat zprávu'}
              </Button>
            </div>
          </form>
        </div>

        {/* Right column for the map */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Kde nás najdete</h2>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Naše poloha na Google Maps"
            ></iframe>
          </div>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground"> {/* Added space-y-1 for consistent paragraph spacing */}
            <p><strong>Clubco coworking</strong></p>
            <p>Vlněna Office Park, budova C</p>
            <p>Vlněná 526/3</p>
            <p>602 00 Brno-střed-Trnitá</p>
            <p>Česká republika</p>
            <p className="mt-2">
              <Link href="mailto:info@analytics-flow.cz" className="hover:text-primary">info@analytics-flow.cz</Link>
            </p>
            {/* <p className="mt-1">
              <Link href="tel:+420123456789" className="hover:text-primary">+420 123 456 789</Link>
            </p> */}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">Firemní údaje</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Název společnosti:</p>
                <p className="text-muted-foreground">Analytics Flow Solutions s.r.o. (Placeholder)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Sídlo (Fakturační adresa):</p>
                <p className="text-muted-foreground">Jiná Ulice 789, 123 45 Město, Česká republika (Placeholder)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Telefon:</p>
                <p className="text-muted-foreground">+420 123 456 789 (Placeholder)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">IČO (Reg. číslo):</p>
                <p className="text-muted-foreground">12345678 (Placeholder)</p>
              </div>
              <div>
                <p className="font-medium text-foreground">DIČ (VAT ID):</p>
                <p className="text-muted-foreground">CZ12345678 (Placeholder, pokud plátce DPH)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}