export default function JakToFungujePage() {
  const steps = [
    {
      id: "01",
      title: "Prvotní konzultace",
      description: "Na úvodní nezávazné konzultaci probereme vaše potřeby, cíle a očekávání. Seznámíme se s vaším podnikáním a daty, abychom pochopili kontext a mohli navrhnout nejlepší možný přístup. Tento krok je zdarma.",
    },
    {
      id: "02",
      title: "Definování cílů a rozsahu",
      description: "Na základě prvotní konzultace společně jasně definujeme cíle projektu, klíčové metriky úspěchu (KPIs) a přesný rozsah prací. Vytvoříme hrubý časový plán a odsouhlasíme si podmínky spolupráce.",
    },
    {
      id: "03",
      title: "První datový workshop",
      description: "Ponoříme se hlouběji do vašich dat. Během tohoto workshopu provedeme první průzkumnou analýzu, identifikujeme klíčové datové zdroje a jejich kvalitu. Společně vytvoříme konkrétní hypotézy, které budeme ověřovat.",
    },
    {
      id: "04",
      title: "Realizace dohodnutých prací",
      description: "Náš tým specialistů se pustí do práce. Ať už jde o čištění a přípravu dat, tvorbu dashboardů, implementaci analytických modelů nebo vývoj na míru, pravidelně vás budeme informovat o postupu.",
    },
    {
      id: "05",
      title: "Prezentace výsledků, zpětná vazba a druhá iterace",
      description: "Představíme vám dosažené výsledky a zjištění. Klíčová je pro nás vaše zpětná vazba, na základě které provedeme případné úpravy a zapracujeme další vylepšení v rámci druhé (nebo i dalších) iterace.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Jak to u nás funguje?
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Náš proces je navržen tak, aby byl transparentní, efektivní a plně zaměřený na dosažení vašich cílů. Od prvního kontaktu až po finální dodání a další iterace.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <ol className="space-y-10 md:space-y-12">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col md:flex-row items-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mr-6 mb-4 md:mb-0 shrink-0">
                {step.id}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h2>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {/* Optional: Connector line for larger screens - can be complex with pure Tailwind without ::before/::after direct support in JSX */}
              {/* {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-6 w-px h-full bg-gray-300 dark:bg-gray-700 -z-10" style={{ transform: 'translateY(1.5rem)' }}></div>
              )} */}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
