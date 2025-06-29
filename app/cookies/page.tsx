// app/cookies/page.tsx
export default function CookiesPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Zásady používání Cookies
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Tyto stránky využívají cookies k vylepšení uživatelského zážitku a analýze návštěvnosti. Níže naleznete informace o tom, jaké cookies používáme a jak můžete spravovat své preference.
            </p>

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">1. Co jsou cookies?</h2>
            <p className="text-muted-foreground md:text-lg">
              Cookie je malý textový soubor, který webová stránka ukládá na vašem počítači nebo mobilním zařízení při jejím prohlížení. Umožňuje webové stránce zapamatovat si vaše akce a preference (například přihlášení, jazyk, velikost písma a další nastavení zobrazení) po určitou dobu, takže je nemusíte znovu zadávat při každé návštěvě stránky nebo při přechodu z jedné stránky na druhou.
            </p>

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">2. Jaké cookies používáme</h2>
            <p className="text-muted-foreground md:text-lg">
              Na našich stránkách používáme následující typy cookies:
            </p>
            <h3 className="text-xl font-bold tracking-tighter sm:text-3xl">a) Nezbytně nutné cookies</h3>
            <p className="text-muted-foreground md:text-lg">
              Tyto cookies jsou vyžadovány pro základní funkčnost webu, jako je navigace na stránce a přístup k zabezpečeným oblastem. Webová stránka nemůže bez těchto cookies správně fungovat. Patří sem také cookie, která ukládá vaše preference ohledně souhlasu s cookies (`user_consent_preferences`).
            </p>
            <h3 className="text-xl font-bold tracking-tighter sm:text-3xl">b) Analytické cookies</h3>
            <p className="text-muted-foreground md:text-lg">
              Pokud nám k tomu udělíte souhlas, používáme analytické cookies, které nám pomáhají porozumět, jak návštěvníci interagují s našimi webovými stránkami. Shromažďují anonymizované informace a pomáhají nám vylepšovat obsah a funkčnost stránek. Mezi používané analytické nástroje patří:
              <ul>
                <li><strong>Google Analytics (přes Google Tag Manager):</strong> Služba pro analýzu webu poskytovaná společností Google, která sleduje a hlásí návštěvnost webových stránek.</li>
                <li><strong>Vercel Analytics:</strong> Služba poskytovaná naší hostingovou platformou Vercel, která sbírá data o výkonu a návštěvnosti.</li>
              </ul>
              Tyto nástroje mohou ukládat cookies k rozlišení jednotlivých uživatelů a ke shromažďování informací o používání stránek.
            </p>
            {/* Placeholder for other categories like Marketing cookies if they are ever added */}

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">3. Správa vašich preferencí</h2>
            <p className="text-muted-foreground md:text-lg">
              Vaše preference ohledně používání cookies můžete kdykoli spravovat prostřednictvím našeho banneru pro souhlas s cookies. Při vaší první návštěvě se banner zobrazí automaticky. Následně můžete své volby změnit (např. odvolat souhlas) opětovným vyvoláním nastavení (funkce pro opětovné zobrazení banneru bude doplněna v budoucnu, případně odkazem v patičce stránky).
            </p>
            <p className="text-muted-foreground md:text-lg">
              Váš souhlas s používáním analytických cookies je uložen po dobu 1 roku, poté budete znovu požádáni o jeho udělení.
            </p>

            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">4. Další informace</h2>
            <p className="text-muted-foreground md:text-lg">
              Pro více informací o tom, jak chráníme vaše soukromí, navštivte naši stránku <a href="/ochrana-soukromi" className="underline">Ochrana soukromí</a>.
            </p>
            <p className="text-muted-foreground md:text-lg">
              Toto znění zásad používání cookies je platné od [Datum poslední aktualizace - bude doplněno].
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
