'use client';

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import main_image from '@/public/data_main_photo.jpeg'
import friendly_image from '@/public/friendly_analytics.jpeg'
import { BarChart3, PieChart, TrendingUp, Database, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { useState, FormEvent } from "react";
import { submitCtaForm, CtaFormData } from "./actions";

export default function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!name) {
      setMessage("Prosím zadejte Vaše jméno.");
      return;
    }
    if (!email) {
      setMessage("Prosím zadejte Váš e-mail.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Prosím zadejte platný e-mail.");
      return;
    }
    if (!company) {
      setMessage("Prosím zadejte název společnosti.");
      return;
    }

    setIsLoading(true);
    const result = await submitCtaForm({ name, email, company });
    setIsLoading(false);

    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setName('');
      setEmail('');
      setCompany('');
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {showSuccessPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-lg shadow-xl z-50 text-lg text-center">
          Děkujeme za Váš e-mail!
        </div>
      )}
      <main className="flex-1 self-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Expertní analýza dat
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Proměňte data v obchodní úspěch
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Naši datoví specialisté vám pomohou odhalit skryté vzorce, předpovídat trendy a přijímat rozhodnutí
                  podložená daty.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#konzultace">Nezávazná konzultace</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#vice-informaci">
                      Více informací <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>První konzultace zdarma</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Řešení na míru</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image
                    src={main_image}
                    alt="Datová analytika a konzultace"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        {/* <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-tight">Důvěřují nám přední společnosti v ČR</h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Image
                      src={`/placeholder.svg?height=40&width=120&text=LOGO+${i}`}
                      alt={`Logo klienta ${i}`}
                      width={120}
                      height={40}
                      className="opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Services Section */}
        <section id="sluzby" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Služby</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Komplexní analytické služby
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nabízíme širokou škálu služeb, které vám pomohou maximálně využít potenciál vašich dat.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <BarChart3 className="h-10 w-10 text-primary" />,
                  title: "Datová vizualizace",
                  description:
                    "Vytváříme přehledné dashboardy a vizualizace, které zpřístupní vaše data všem v organizaci.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-primary" />,
                  title: "Prediktivní analýza",
                  description: "Využíváme strojové učení k předpovědi trendů a budoucího vývoje vašeho podnikání.",
                },
                {
                  icon: <PieChart className="h-10 w-10 text-primary" />,
                  title: "Business Intelligence",
                  description:
                    "Transformujeme surová data na hodnotné poznatky, které podpoří vaše strategická rozhodnutí.",
                },
                {
                  icon: <Database className="h-10 w-10 text-primary" />,
                  title: "Datová integrace",
                  description: "Propojíme vaše datové zdroje pro jednotný pohled na vaše podnikání.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Bezpečnost dat",
                  description: "Zajistíme bezpečnost vašich dat s důrazem na ochranu osobních údajů a soulad s GDPR.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Analýza v reálném čase",
                  description: "Poskytujeme analýzy v reálném čase pro okamžité reakce na změny trhu.",
                },
              ].map((service, index) => (
                <div key={index} className="flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm">
                  {service.icon}
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Expertní tým
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Zkušení datoví specialisté</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Náš tým tvoří certifikovaní odborníci s mnohaletými zkušenostmi v oblasti datové analýzy a business
                    intelligence.
                  </p>
                </div>
                <ul className="grid gap-2">
                  {[
                    "Certifikovaní datoví analytici",
                    // "Specialisté na strojové učení",
                    "Experti na vizualizaci dat",
                    "Konzultanti s oborovými znalostmi",
                    "Vývojáři datových řešení",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  {/* <Button asChild>
                    <Link href="/team">Poznejte náš tým</Link>
                  </Button> */}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full overflow-hidden rounded-xl border shadow-xl">
                  <Image
                    src={friendly_image}
                    alt="Náš tým datových specialistů"
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="konzultace" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    Připraveni využít potenciál vašich dat?
                  </h2>
                  <p className="max-w-[600px] opacity-90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Začněte spolupráci s DataFlow ještě dnes a objevte skryté možnosti ve vašich datech. Domluvte si
                    nezávaznou konzultaci s našimi specialisty.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="#kontakt">Domluvit konzultaci</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground" asChild>
                    <Link href="#vice-informaci">Více informací</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="Jméno a příjmení"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="Společnost"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={isLoading}
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <Button type="submit" variant="secondary" disabled={isLoading}>
                      {isLoading ? "Odesílám..." : "Odeslat poptávku"}
                    </Button>
                  </form>
                  {message && (
                    <p className={`text-sm text-center ${isSuccess ? 'text-green-400' : 'text-red-400'} opacity-90`}>
                      {message}
                    </p>
                  )}
                  <p className="text-xs text-center opacity-70">
                    Odesláním formuláře souhlasíte s našimi{" "}
                    <Link href="/zasady-ochrany-osobnich-udaju" className="underline underline-offset-2">
                      obchodními podmínkami
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
