import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import main_image from '@/public/data_main_photo.jpeg'
import friendly_image from '@/public/friendly_analytics.jpeg'
import { BarChart3, PieChart, TrendingUp, Database, Shield, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
                  <Button asChild>
                    <Link href="/team">Poznejte náš tým</Link>
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
                  {/* {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Nejoblíbenější
                    </div>
                  )} */}
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
    </div>
  )
}
