export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-panel/60">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-2 px-6 py-8 text-sm text-ink-mute md:flex-row md:items-center md:justify-between">
        <p>© {year} rinotsuka</p>
        <p className="text-xs">
          フリーランス SES エンジニアの紹介サイト
        </p>
      </div>
    </footer>
  );
}
