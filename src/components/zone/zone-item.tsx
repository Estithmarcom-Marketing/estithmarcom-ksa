"use client"

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ZoneType } from "@/lib/types/zones";
import Image from "next/image";
import Link from "next/link";

export default function ZoneItem({zone}: {zone: ZoneType}){
  const locale = useLocale()
  const { t } = getTranslator(locale)
  return(
    <div className="rounded-2xl flex justify-between p-4 flex-col gap-4 items-center border">
      <div className="relative w-[110px] h-[110px]">
        <Image src={zone.image} alt={zone.title} fill className="object-cover" />
      </div>
      <h4 className="text-sm text-center">{zone.title}</h4>
      <Link className="px-4 py-1 rounded-sm text-xs font-bold text-secondary bg-muted hover:bg-primary hover:text-white duration-300" href={`/${zone.slug}`}>
        {t("watchmore")}
      </Link>
    </div>
  )
}