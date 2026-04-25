const currentYear = new Date().getFullYear();

const links: Array<{ label: string; href: string }> = [
  { label: "GitHub", href: "https://github.com/rinotsuka" },
  { label: "Email", href: "mailto:rinotsuka@example.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-base/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-base-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} rinotsuka</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="transition-colors hover:text-accent-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
