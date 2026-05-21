"use client"

import PagesHero from "@/components/global/pages-hero";
import ServiceShape1 from "@/components/service/service-shape1";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";

export default function ServiceDetailsClient({ service }: { service: ServiceType }) {
  const locale = useLocale()
  const { t } = getTranslator(locale)
  return(
    <div>
      <PagesHero title={t('serviceDetails.title')} desc={t('serviceDetails.description')} />
      <section className="container py-20!">
        <ServiceShape1 service={service} />
      </section>
    </div>
  )
}