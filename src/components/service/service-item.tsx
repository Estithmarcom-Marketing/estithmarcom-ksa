"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";
import { Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import service_img from "@/assets/service-bg.png";

export default function ServiceItem({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="rounded-2xl aspect-[387/447] relative overflow-hidden">
      <div className="absolute w-full h-full">
        <Image
          src={service_img}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 py-5 px-10 text-white w-full">
        <h2 className="mt-2 font-bold mb-4">{service.title}</h2>
        <p className="text-sm text-white/90">{service.short_description}</p>
        <div className="flex justify-end mt-4">
          <Link
            href={`/services/${service.slug}`}
            className="text-secondary hover:underline"
          >
            {t("showmore")}
          </Link>
        </div>
      </div>
    </div>
  );
}
