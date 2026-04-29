import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-4 py-8 text-sm text-ink-mute">
        <Image
          src="/logo.png"
          alt="rinotsuka"
          width={48}
          height={48}
          className="block"
        />
        <p style={{ color: "#97806C" }}>© {year} Katsunori Nakayama</p>
      </div>
    </footer>
  );
}
