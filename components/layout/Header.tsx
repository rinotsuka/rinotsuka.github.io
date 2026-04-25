import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const NAV_ITEMS = [
  { href: "/#about", label: "About" },
  { href: "/#career", label: "Career" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70 border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-ink hover:opacity-80 transition"
        >
          <Logo size={36} />
          <span className="font-bold tracking-wide">rinotsuka</span>
        </Link>

        <nav aria-label="サイトナビゲーション">
          <ul className="flex items-center gap-1 text-sm font-medium text-ink-soft">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1.5 hover:bg-primary-soft hover:text-primary-strong transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
