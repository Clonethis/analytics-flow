'use client';

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";
import { subscribeToNewsletter } from "@/app/actions";

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!email) {
      setMessage('Prosím zadejte email.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Prosím zadejte platnou emailovou adresu.');
      return;
    }

    setIsLoading(true);
    const result = await subscribeToNewsletter(email);
    setIsLoading(false);

    setMessage(result.message);
    if (result.success) {
      setIsSuccess(true);
      setEmail(''); // Clear input on success
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <footer className="w-full border-t bg-background py-8 md:py-12"> {/* Increased base padding */}
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"> {/* Simplified grid, adjusted gap */}
          {/* Column 1: Brand and tagline */}
          <div className="flex flex-col items-start gap-3"> {/* Increased gap */}
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Analytics Flow</span>
            </div>
            <p className="text-sm text-muted-foreground"> {/* Slightly larger text for tagline */}
              Data-driven insights for your business.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-start md:items-center gap-3"> {/* Increased gap, consistent alignment */}
            <h3 className="text-base font-semibold">Navigace</h3> {/* Slightly larger heading */}
            <nav className="flex flex-col gap-2"> {/* Consistent gap */}
              <Link href="/podminky" className="text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-primary">
                Podmínky
              </Link>
              <Link href="/ochrana-soukromi" className="text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-primary">
                Ochrana soukromí
              </Link>
              <Link href="/cookies" className="text-sm hover:underline underline-offset-4 text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </nav>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div className="flex flex-col items-start md:items-end gap-3"> {/* Increased gap, consistent alignment */}
            <h3 className="text-base font-semibold">Zůstaňte v obraze</h3> {/* Slightly larger heading */}
            <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-2"> {/* Increased max-w */}
              <Input
                type="email"
                placeholder="Zadejte svůj e-mail"
                className="flex-1 min-w-0" // Added min-w-0 for better flex behavior
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading} variant="default"> {/* Explicitly set variant if needed */}
                {isLoading ? 'Odesílám...' : 'Odebírat'}
              </Button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}> {/* Slightly larger message text, adjusted red */}
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground"> {/* Increased spacing and font size */}
          © {new Date().getFullYear()} Analytics Flow. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
