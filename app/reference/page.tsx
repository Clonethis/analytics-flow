interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number; // e.g., 1-5
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "Neuvěřitelně rychle pochopili naše potřeby a dodali řešení, které předčilo naše očekávání. Díky jejich datové analýze jsme optimalizovali naše marketingové kampaně s okamžitým nárůstem ROI o 25%. Profesionální a efektivní tým!",
    author: "Jana Novotná",
    role: "Marketingová Ředitelka",
    company: "TechSolutions s.r.o.",
    rating: 5,
  },
  {
    id: 2,
    quote: "Spolupráce s DataFlow byla klíčová pro naši expanzi na nové trhy. Jejich prediktivní modely nám pomohly identifikovat nejperspektivnější segmenty a minimalizovat rizika. Oceňujeme především jejich proaktivní přístup a hluboké znalosti.",
    author: "Petr Svoboda",
    role: "Obchodní Ředitel",
    company: "ExpandGlobal a.s.",
    rating: 5,
  },
  {
    id: 3,
    quote: "Díky novým dashboardům máme konečně přehled o všech klíčových metrikách v reálném čase. To nám umožňuje rychleji reagovat na změny a lépe řídit celý výrobní proces. Skvělá práce!",
    author: "Martin Kopecký",
    role: "Provozní Manažer",
    company: "VýrobaPresne s.r.o.",
    rating: 4,
  },
  {
    id: 4,
    quote: "Oceňuji individuální přístup a schopnost týmu DataFlow vysvětlit složité datové koncepty srozumitelnou formou. Pomohli nám nastavit datovou strategii, která skutečně funguje a přináší výsledky.",
    author: "Eva Králová",
    role: "Jednatelka společnosti",
    company: "RodinnáFirma Group",
    rating: 5,
  },
];

// Simple Star SVG component
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? "0" : "1.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-5 w-5 ${filled ? 'text-primary' : 'text-muted-foreground/50'}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Quote SVG Icon
const QuoteIcon = () => (
  <svg
    className="h-10 w-10 text-primary/30 mb-4"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 14"
  >
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
  </svg>
);


export default function ReferencePage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Co o nás říkají klienti
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Jsme hrdí na partnerství, která budujeme, a na výsledky, kterých společně dosahujeme. Přečtěte si, co o naší práci říkají ti nejpovolanější.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div>
                <QuoteIcon />
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < testimonial.rating} />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-card-foreground/90 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              <div className="mt-auto pt-4 border-t border-border/60">
                <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
