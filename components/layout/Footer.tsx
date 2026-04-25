import { WavyLine } from "@/components/decor/Doodle";

const currentYear = new Date().getFullYear();

const links: Array<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/rinotsuka" },
  { label: "Email", href: "mailto:rinotsuka@example.com" },
  { label: "RSS", href: "/feed.xml" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Footer() {
  return (
    <footer className="relative">
      {/* 上端の波線 */}
      <div className="text-paper-edge">
        <WavyLine className="h-3 w-full text-peach" />
      </div>
      <div className="paper-surface-deep border-t-soft border-paper-edge/60">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-script text-xl text-peach-deep">
              thanks for stopping by.
            </p>
            <p className="mt-2 text-sm text-ink-mocha">
              © {currentYear} rinotsuka — ふんわりお茶を淹れて、また遊びにきてください。
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm">
            {links.map((link) => {
              const isExternal = link.href.startsWith("http");
              const href = isExternal ? link.href : `${basePath}${link.href}`;
              return (
                <li key={link.href}>
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="rounded-pill border-soft border-paper-edge bg-paper px-4 py-1.5 text-ink shadow-crayon transition-transform hover:-translate-y-0.5 hover:border-peach-deep hover:text-peach-deep"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
