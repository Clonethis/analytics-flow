import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import main_image from '@/public/data_main_photo.jpeg'
import friendly_image from '@/public/friendly_analytics.jpeg'
import { BarChart3, PieChart, TrendingUp, Database, Shield, Zap, CheckCircle, ArrowRight, Menu } from "lucide-react"
import { ToggleMenu, ToggleMenuItems } from "@/components/toggle-menu"
export default function LandingPage() {
  const menuItems: ToggleMenuItems[] = [
    { link: '/cenik', linkText: 'Ceník' },
    { link: '/o-nas', linkText: 'O nás' },
    { link: '/kontakt', linkText: 'Kontakt' },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 ml-4 text-primary" />
            <span className="text-xl font-bold">DataFlow</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#sluzby" className="text-sm font-medium hover:text-primary">
              Služby
            </Link>
            <Link href="#jak-to-funguje" className="text-sm font-medium hover:text-primary">
              Jak to funguje
            </Link>
            <Link href="#reference" className="text-sm font-medium hover:text-primary">
              Reference
            </Link>
            <Link href="#cenik" className="text-sm font-medium hover:text-primary">
              Ceník
            </Link>
            <Link href="#kontakt" className="text-sm font-medium hover:text-primary">
              Kontakt
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ToggleMenu menuItems={menuItems}/>
            {/* <Link href="/prihlaseni" className="hidden md:block text-sm font-medium hover:text-primary">
              Přihlásit se
            </Link>
            <Button asChild>
              <Link href="/kontakt">Kontaktujte nás</Link>
            </Button> */}
            {/* <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button> */}
          </div>
        </div>
      </header>
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
        <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
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
        </section>

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

        {/* How It Works Section */}
        <section id="jak-to-funguje" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Jak to funguje
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Jednoduchý proces, výjimečné výsledky
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Náš osvědčený postup vám zajistí hladký průběh od prvního kontaktu až po implementaci řešení.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Analýza potřeb",
                  description:
                    "Začínáme důkladnou analýzou vašich potřeb a cílů. Identifikujeme klíčové datové zdroje a metriky.",
                },
                {
                  step: "02",
                  title: "Návrh řešení",
                  description:
                    "Vytvoříme návrh řešení na míru, který odpovídá vašim specifickým požadavkům a rozpočtu.",
                },
                {
                  step: "03",
                  title: "Implementace a podpora",
                  description:
                    "Implementujeme řešení, zaškolíme váš tým a poskytujeme průběžnou podporu pro maximální efektivitu.",
                },
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                  {index < 2 && (
                    <div className="absolute top-8 left-full hidden w-16 border-t-2 border-dashed border-muted-foreground lg:block" />
                  )}
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
                  <Button asChild>
                    <Link href="#tym">Poznejte náš tým</Link>
                  </Button>
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

        {/* Testimonials Section */}
        <section id="reference" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Reference</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Co říkají naši klienti</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Přečtěte si, jak naše služby pomohly firmám po celé České republice.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Spolupráce s DataFlow změnila náš přístup k analýze trhu. Od implementace jejich řešení jsme zvýšili návratnost investic o 37 %.",
                  author: "Jana Nováková",
                  role: "Marketingová ředitelka, TechCorp s.r.o.",
                },
                {
                  quote:
                    "Prediktivní analýza zásadně změnila naše řízení zásob. Za pouhé tři měsíce jsme snížili plýtvání o 42 %.",
                  author: "Martin Černý",
                  role: "Provozní ředitel, Retail Solutions a.s.",
                },
                {
                  quote:
                    "Jednoduchost použití v kombinaci s pokročilými analytickými funkcemi dělá z DataFlow dokonalé řešení pro náš tým. Je to jako mít datového vědce přímo v týmu.",
                  author: "Eva Svobodová",
                  role: "Vedoucí datové strategie, Finance Plus s.r.o.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div>
                    <div className="flex gap-0.5 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="mt-4 text-lg font-medium leading-relaxed">"{testimonial.quote}"</blockquote>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="rounded-full bg-primary/10 p-1">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="cenik" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Ceník</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Transparentní cenová politika
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vyberte si balíček služeb, který nejlépe odpovídá potřebám vaší firmy. Všechny balíčky zahrnují první
                  konzultaci zdarma.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  name: "Základní",
                  price: "12 900 Kč",
                  description: "Ideální pro malé firmy a startupy.",
                  features: [
                    "Až 5 uživatelů",
                    "10 hodin konzultací měsíčně",
                    "Základní vizualizace",
                    "E-mailová podpora",
                    "Export dat",
                  ],
                },
                {
                  name: "Business",
                  price: "24 900 Kč",
                  description: "Vhodné pro rostoucí týmy a střední podniky.",
                  features: [
                    "Až 20 uživatelů",
                    "25 hodin konzultací měsíčně",
                    "Pokročilé vizualizace",
                    "Prioritní podpora",
                    "Přístup k API",
                    "Vlastní dashboardy",
                  ],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Individuální",
                  description: "Pro velké organizace se specifickými potřebami.",
                  features: [
                    "Neomezený počet uživatelů",
                    "Neomezené konzultace",
                    "Vlastní integrace",
                    "Dedikovaná podpora",
                    "On-premise řešení",
                    "Pokročilé zabezpečení",
                    "Školení a onboarding",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`flex flex-col rounded-lg border p-6 shadow-sm ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Nejoblíbenější
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.price !== "Individuální" && <span className="text-muted-foreground">/měsíc</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.price === "Individuální" ? "Kontaktujte nás" : "Objednat"}
                    </Button>
                  </div>
                </div>
              ))}
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
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="Jméno a příjmení"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        type="email"
                        placeholder="E-mail"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="Společnost"
                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      />
                    </div>
                    <Button type="submit" variant="secondary">
                      Odeslat poptávku
                    </Button>
                  </form>
                  <p className="text-xs text-center opacity-70">
                    Odesláním formuláře souhlasíte s našimi{" "}
                    <Link href="#" className="underline underline-offset-2">
                      obchodními podmínkami
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">DataFlow</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Podmínky
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Ochrana soukromí
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Cookies
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} DataFlow. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
