import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navItems = [
  { label: "Home", href: "/", caption: "ホーム" },
  { label: "Blog", href: "/blog", caption: "ブログ" },
];

export function Header() {
  return (
    <header className="relative z-20 border-b-soft border-paper-edge/70 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href={`${basePath}/`}
          aria-label="RINOTSUKA トップへ"
          className="group inline-flex items-center gap-2"
        >
          <LogoLockup className="transition-transform duration-500 group-hover:rotate-[-2deg]" />
        </Link>
        <nav aria-label="グローバルナビゲーション">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={`${basePath}${item.href}`}
                  className="group flex flex-col items-center rounded-pill px-3 py-1.5 text-sm text-ink transition-colors hover:bg-peach-soft/60"
                >
                  <span className="font-display tracking-wide">
                    {item.label}
                  </span>
                  <span className="font-script text-[11px] text-peach-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
