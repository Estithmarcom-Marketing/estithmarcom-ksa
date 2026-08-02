"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import banner_image from "@/assets/hero-banner.jpg";

export default function PagesHero({
  title,
  desc,
  banner,
}: {
  title: string;
  desc?: string;
  banner?: any;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="relative w-full h-[calc(100vh)] overflow-hidden">
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-primary/70"></div>
      <div
        className={`absolute inset-0 bg-cover bg-center ${locale === "en" ? "scale-x-[-1]" : ""}`}
        style={{
          backgroundImage: `url(${banner?.src || banner_image.src})`,
        }}
      />
      <div className="relative z-10 mt-15! flex flex-col container justify-center px-6 h-full">
        <h1 className="text-white max-w-xl leading-[60px] text-4xl sm:text-5xl font-bold mb-8">
          {title}
        </h1>
        <p className="text-white/70 leading-10 mb-10">
          {desc}
        </p>
      </div>
    </div>
  );
}
