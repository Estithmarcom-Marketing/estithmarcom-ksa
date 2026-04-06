"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default function ServiceItem({ service }: { service: ServiceType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="rounded-lg flex flex-col justify-between hover:shadow-lg duration-300 shadow-primary/10 border p-5">
      <div>
        <div className="p-2 bg-primary/10 w-fit rounded-lg">
          <Rocket />
        </div>
        <h2 className="mt-2 font-bold mb-4">{service.title}</h2>
        <p className="text-sm text-[#666]">{service.short_description}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Link
          href={`/`}
          className="bg-secondary hover:border-primary block rounded-sm duration-300 text-sm text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
        >
          {t("showmore")}
        </Link>
        <Link
          href={`/`}
          className="text-secondary duration-300 hover:bg-muted block rounded-sm text-sm text-center border py-1"
        >
          {t("requestService")}
        </Link>
      </div>
    </div>
  );
}
