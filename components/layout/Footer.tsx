import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "トップページ" },
  { href: "/blog", label: "ブログ" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-8 text-sm text-ink-mute">
        <Image
          src="/logo.png"
          alt="rinotsuka"
          width={48}
          height={48}
          className="block"
        />
        <nav className="mt-2" style={{ color: "#97806C" }}>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p style={{ color: "#97806C" }}>© {year} Katsunori Nakayama</p>
      </div>
    </footer>
  );
}
