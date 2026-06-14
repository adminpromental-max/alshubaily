import Image from "next/image";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-[#E0D3C2]/70 bg-[#F3F0EA] px-6 py-14 md:px-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/Alshubaily-logo.png"
            alt="AlShubaily"
            width={40}
            height={44}
            className="h-10 w-auto"
          />
          <div>
            <p className="text-sm font-medium text-[#1A1612]">
              Khalid Saud AlShubaily
            </p>
            <p className="text-xs text-[#5C5348]">Real Estate Investment</p>
          </div>
        </div>
        <p className="text-center text-xs text-[#8A8175]">
          © {new Date().getFullYear()} AlShubaily Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
