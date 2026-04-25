import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-base/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="RINOTSUKA トップへ"
          className="flex items-center gap-3"
        >
          <img
            src={`${basePath}/logo.svg`}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            aria-hidden="true"
          />
          <span className="font-display text-lg tracking-wide text-base-ink">
            RINOTSUKA
          </span>
        </Link>
        <nav aria-label="グローバルナビゲーション">
          <ul className="flex items-center gap-6 text-sm text-base-ink">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-accent-deep"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-accent-deep"
              >
                ブログ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
