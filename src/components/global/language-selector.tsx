"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Flag_EN from "../flags/flag_en";
import Flag_AR from "../flags/flag_ar";

const LANGUAGES = [
  { code: "en", flag: <Flag_EN size={30} />, text: "EN" },
  { code: "ar", flag: <Flag_AR size={30} />, text: "AR" },
];

export function LanguageSelector() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const currentLocale = pathname.split("/")[1] || "ar";
  const nextLocale = currentLocale === "ar" ? "en" : "ar";
  const currentLang = LANGUAGES.find((l) => l.code === currentLocale);

  const segments = pathname.split("/");
  segments[1] = nextLocale;
  const nextPath = segments.join("/");

  const handleSwitch = () => {
    document.cookie = `mithaq_lang=${nextLocale}; path=/; max-age=31536000`;
    setIsLoading(true);
  };

  return (
    <Link
      href={nextPath}
      onClick={handleSwitch}
      className={`${isLoading ? "opacity-50 pointer-events-none" : ""} flex w-fit gap-2 items-center transition-opacity`}
    >
      {currentLang?.flag}
      <span className="text-[12px]">{currentLang?.text}</span>
    </Link>
  );
}