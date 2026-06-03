"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";
import { Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NoImageHolder from "../global/no-image-holder";

export default function ServiceItem({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="rounded-lg flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-secondary duration-300 shadow-primary/10 border p-5">
      <div>
        <div className="p-2 bg-primary w-fit rounded-lg">
          <div className="relative overflow-hidden w-[24px] h-[24px]">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            ) : (
              <NoImageHolder noText noBg/>
            )}
          </div>
        </div>
        <h2 className="mt-2 font-bold mb-4">{service.title}</h2>
        <p className="text-sm text-[#666]">{service.short_description}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Link
          href={`/services/${service.slug}`}
          className="bg-secondary hover:border-primary block rounded-sm duration-300 text-sm text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
        >
          {t("showmore")}
        </Link>
        <Link
          href={`/services/${service.slug}#serviceForm`}
          className="text-secondary duration-300 hover:bg-muted block rounded-sm text-sm text-center border py-1"
        >
          {t("requestService")}
        </Link>
      </div>
    </div>
  );
}
