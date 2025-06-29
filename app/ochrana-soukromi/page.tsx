import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů | AnalyticsFlow",
  description: "Informace o ochraně osobních údajů a zpracování dat v souladu s GDPR",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ochrana osobních údajů
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Vaše soukromí je pro nás prioritou. Tyto zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme a chráníme vaše osobní údaje v souladu s GDPR.
              </p>
              <p className="text-sm text-muted-foreground">
                Poslední aktualizace: 26. května 2025
              </p>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">1. Správce osobních údajů</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Správcem vašich osobních údajů je společnost <strong>Analytics Flow s.r.o.</strong> se sídlem Wenceslas Square 1, 110 00 Praha 1, IČO: 12345678, DIČ: CZ12345678, zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 123456.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Kontaktní údaje správce:</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Email: privacy@analytics-flow.cz</li>
                      <li>Telefon: +420 123 456 789</li>
                      <li>Poštovní adresa: Wenceslas Square 1, 110 00 Praha 1</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">2. Jaké osobní údaje zpracováváme</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Údaje získané přímo od vás:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Jméno a příjmení</li>
                      <li>E-mailová adresa</li>
                      <li>Telefonní číslo</li>
                      <li>Název společnosti a pozice</li>
                      <li>Obsah zpráv a komunikace</li>
                      <li>Fakturační a doručovací údaje</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Údaje získané automaticky:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>IP adresa a informace o zařízení</li>
                      <li>Typ prohlížeče a operačního systému</li>
                      <li>Údaje o návštěvnosti webu (cookies)</li>
                      <li>Datum a čas návštěvy</li>
                      <li>Odkazující stránky</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">3. Účely zpracování a právní základ</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Poskytování služeb</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      <strong>Právní základ:</strong> Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)
                    </p>
                    <p className="text-muted-foreground">
                      Zpracováváme vaše údaje pro poskytování našich analytických služeb, komunikaci s vámi, vystavování faktur a řešení reklamací.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Marketing a komunikace</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      <strong>Právní základ:</strong> Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR) nebo souhlas (čl. 6 odst. 1 písm. a) GDPR)
                    </p>
                    <p className="text-muted-foreground">
                      Zasíláme vám informace o našich službách, novinkách a užitečném obsahu. Vždy můžete odhlásit odběr.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Zlepšování služeb</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      <strong>Právní základ:</strong> Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)
                    </p>
                    <p className="text-muted-foreground">
                      Analyzujeme návštěvnost webu a zpětnou vazbu pro zlepšení našich služeb a uživatelského zážitku.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Plnění právních povinností</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      <strong>Právní základ:</strong> Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)
                    </p>
                    <p className="text-muted-foreground">
                      Vedeme účetní a daňovou evidenci v souladu s platnými právními předpisy.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">4. Doba uchovávání údajů</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Osobní údaje uchováváme pouze po dobu nezbytnou pro naplnění účelů zpracování:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Kontaktní údaje klientů:</strong> Po dobu trvání smluvního vztahu + 3 roky po jeho ukončení</li>
                    <li><strong>Účetní a daňové doklady:</strong> 10 let od konce účetního období</li>
                    <li><strong>Marketingová komunikace:</strong> Do odvolání souhlasu nebo námitky</li>
                    <li><strong>Webové cookies:</strong> Dle typu cookies (viz zásady cookies)</li>
                    <li><strong>Bezpečnostní logy:</strong> 1 rok od vytvoření</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">5. Předávání údajů třetím stranám</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Vaše osobní údaje můžeme předávat následujícím kategoriím příjemců:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Technické služby</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Hostingové služby</li>
                        <li>• Cloudové úložiště</li>
                        <li>• Analytické nástroje</li>
                        <li>• CRM systémy</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2">Obchodní partneři</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Účetní služby</li>
                        <li>• Právní poradenství</li>
                        <li>• Platební brány</li>
                        <li>• Doručovací služby</li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    Všichni naši partneři jsou vázání smlouvami o zpracování osobních údajů a dodržují přísné bezpečnostní standardy.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">6. Mezinárodní přenos údajů</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Některé námi používané služby mohou zahrnovat přenos údajů do zemí mimo EU/EEA. V takových případech zajišťujeme přiměřenou úroveň ochrany prostřednictvím:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Rozhodnutí Evropské komise o přiměřenosti</li>
                    <li>Standardních smluvních doložek EU</li>
                    <li>Certifikačních mechanismů (např. Privacy Shield nástupci)</li>
                    <li>Binding Corporate Rules u velkých technologických společností</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">7. Vaše práva</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    V souvislosti se zpracováním vašich osobních údajů máte následující práva:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo na přístup</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete požádat o informace o tom, jaké vaše údaje zpracováváme.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo na opravu</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete požádat o opravu nepřesných nebo neúplných údajů.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo na výmaz</h3>
                        <p className="text-muted-foreground text-sm">
                          Za určitých podmínek můžete požádat o smazání svých údajů.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo na omezení</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete požádat o omezení zpracování vašich údajů.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo na přenositelnost</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete požádat o předání údajů v strukturovaném formátu.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Právo vznést námitku</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete vznést námitku proti zpracování na základě oprávněného zájmu.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Odvolání souhlasu</h3>
                        <p className="text-muted-foreground text-sm">
                          Souhlas se zpracováním můžete kdykoli odvolat.
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Podání stížnosti</h3>
                        <p className="text-muted-foreground text-sm">
                          Můžete podat stížnost u Úřadu pro ochranu osobních údajů.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">8. Bezpečnost údajů</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Implementujeme přiměřená technická a organizační opatření k ochraně vašich osobních údajů:
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Šifrování</h3>
                      <p className="text-sm">SSL/TLS šifrování pro přenos dat a šifrování citlivých dat v databázích</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Přístupová práva</h3>
                      <p className="text-sm">Striktní kontrola přístupu pouze pro autorizované osoby</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2">Zálohování</h3>
                      <p className="text-sm">Pravidelné zálohy a testování obnovy dat</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">9. Automatizované rozhodování</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Nepoužíváme automatizované rozhodování ani profilování, které by mělo významný dopad na vaše práva a zájmy. Veškerá rozhodnutí o poskytování našich služeb provádíme s lidským dohledem.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">10. Změny zásad ochrany</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Tyto zásady můžeme občas aktualizovat. O významných změnách vás budeme informovat e-mailem nebo prostřednictvím oznámení na našem webu. Doporučujeme pravidelně kontrolovat tuto stránku.
                  </p>
                </div>
              </section>

              <section className="space-y-4 pt-8 border-t">
                <h3 className="text-lg font-semibold">Kontakt pro otázky ochrany údajů</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Pro jakékoli dotazy týkající se ochrany osobních údajů nás kontaktujte:</p>
                    <p><strong>Email:</strong> privacy@analytics-flow.cz</p>
                    <p><strong>Telefon:</strong> +420 123 456 789</p>
                    <p><strong>Poštovní adresa:</strong> Analytics Flow s.r.o., Wenceslas Square 1, 110 00 Praha 1</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p><strong>Úřad pro ochranu osobních údajů:</strong></p>
                  <p>Pplk. Sochora 27, 170 00 Praha 7</p>
                  <p>Web: <a href="https://www.uoou.cz" className="text-primary hover:underline">www.uoou.cz</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
