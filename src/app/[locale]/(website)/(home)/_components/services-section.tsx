"use client"

import SpecialHeader from "@/components/global/special-header";
import ServiceItem from "@/components/service/service-item";
import { useLocale } from "@/hooks/use-locale";
import useIsMobile from "@/hooks/use-mobile";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";

export default function ServicesSection({ services }: { services: ServiceType[] }) {
  const locale = useLocale()
  const { t } = getTranslator(locale)
  const isMobile = useIsMobile();
  const displayedServices = isMobile
  ? services.slice(0, 4)
  : services;
  return (
    <div className="container">
      <SpecialHeader header={t("services.title")} desc={t("services.desc")} />
      <div className="mt-15 grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {displayedServices.map((el) => (
          <ServiceItem key={el.id} service={el} />
        ))}
      </div>
    </div>
  );
}
