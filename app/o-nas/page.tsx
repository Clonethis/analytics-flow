import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Button component is used
import { ArrowRight } from 'lucide-react'; // Example icon

export default function AboutUsPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 justify-center flex">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              O nás
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Jsme Analytics Flow, tým vášnivých datových analytiků, kteří pomáhají firmám růst díky síle dat. Naše mise je transformovat komplexní data na srozumitelné přehledy a strategické výhody.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Více informací o našem týmu, hodnotách a přístupu již brzy!
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/kontakt">Kontaktujte nás <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 justify-center flex">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Náš tým</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg">
              Detaily o našich expertech budou doplněny.
            </p>
          </div>
          {/* Placeholder for team members */}
        </div>
      </section>
    </main>
  );
}
