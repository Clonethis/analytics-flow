import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CenikPage() {
  return (
    <main className="flex-1">
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
    </main>
  );
}
