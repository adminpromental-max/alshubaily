import Image from "next/image";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#070a12] px-6 py-12 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/Alshubaily-logo.png"
            alt="AlShubaily"
            width={40}
            height={44}
            className="h-10 w-auto opacity-90"
          />
          <div>
            <p className="text-sm text-white/80">Khalid Saud AlShubaily</p>
            <p className="text-xs text-white/45">Real Estate Investment</p>
          </div>
        </div>
        <p className="text-center text-xs text-white/40">
          © {new Date().getFullYear()} AlShubaily Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
