"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";
import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServiceItem({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="rounded-2xl shadow-2xl bg-[#f2f3f2] relative overflow-hidden">
      <div className="w-[99px] h-[99px] m-auto mt-10 relative">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absoulte w-full h-full top-0 left-0 bg-black/90"></div>
        )}
      </div>
      <div className="py-5 px-5 text-center text-black w-full">
        <h2 className="mt-2 font-bold mb-4">{service.title}</h2>
        <p className="text-sm text-black/90 px-5">{service.short_description}</p>
        <div className="grid grid-cols-3 gap-2 mt-6">
          <Link
            href={`/services/${service.slug}`}
            className="py-1 col-span-2 bg-primary text-white rounded-full font-bold hover:bg-primary/90 duration-300"
          >
            {t("requestService")}
          </Link>
          <Link
            href={`/services/${service.slug}`}
            className="py-1 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 duration-300"
          >
            {t("readmore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
