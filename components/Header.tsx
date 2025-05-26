import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { ToggleMenu, ToggleMenuItems } from "@/components/toggle-menu"; // Assuming toggle-menu is in components

export default function Header() {
  const menuItems: ToggleMenuItems[] = [
    { link: '/o-nas', linkText: 'O nás' },
    { link: '/jak-to-funguje', linkText: 'Jak to funguje' },
    { link: '/reference', linkText: 'Reference' },
    { link: '/blog', linkText: 'Blog' },
    { link: '/cenik', linkText: 'Ceník' },
    { link: '/kontakt', linkText: 'Kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <Link href="/">
          <span className="text-xl font-bold">DataFlow</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#sluzby" className="text-sm font-medium hover:text-primary">
            Služby
          </Link>
          <Link href="/jak-to-funguje" className="text-sm font-medium hover:text-primary">
            Jak to funguje
          </Link>
          <Link href="/reference" className="text-sm font-medium hover:text-primary">
            Reference
          </Link>
          <Link href="/o-nas" className="text-sm font-medium hover:text-primary">
            O nás
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <Link href="/cenik" className="text-sm font-medium hover:text-primary">
            Ceník
          </Link>
          <Link href="/kontakt" className="text-sm font-medium hover:text-primary">
            Kontakt
          </Link>
        </nav>
        <div className="flex items-center gap-4 md:gap-2"> {/* Adjusted gap for medium screens and up */}
          <ToggleMenu menuItems={menuItems} />
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
  );
}
