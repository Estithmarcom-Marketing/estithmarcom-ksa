"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { Image as ImageIcon } from "lucide-react";

export default function NoImageHolder({noText, noBg}: {noText?: boolean, noBg?: boolean}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className={`absolute w-full h-full text-sm font-bold gap-2 ${noBg ? 'text-white' : 'bg-gray-100 text-gray-400'} flex justify-center items-center`}>
      <ImageIcon size={30} />
      {!noText && <p>{t("noImage")}</p>}
    </div>
  );
}
