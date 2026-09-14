"use client";

import FAQ from "@/components/global/faq";
import PagesHero from "@/components/global/pages-hero";
import RichTextViewer from "@/components/global/rich-text-viewer";
import FeatureItem from "@/components/service/feature-item";
import ServiceOrderCard from "@/components/service/service-order-card";
import ServiceShape1 from "@/components/service/service-shape1";
import ServiceShape2 from "@/components/service/service-shape2";
import ServiceShape3 from "@/components/service/service-shape3";
import ServiceShape4 from "@/components/service/service-shape4";
import { EnumShape1, EnumShape3, EnumShape4 } from "@/data/service-shapes";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";

export default function ServiceDetailsClient({
  service,
}: {
  service: ServiceType;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const serviceShape = EnumShape1.has(service.id) ? (
    <ServiceShape1 service={service} />
  ) : EnumShape3.has(service.id) ? (
    <ServiceShape3 service={service} />
  ) : EnumShape4.has(service.id) ? (
    <ServiceShape4 service={service} />
  ) : (
    <ServiceShape2 service={service} />
  );
  return (
    <div>
      <PagesHero
        title={t("serviceDetails.title")}
        desc={t("serviceDetails.description")}
      />
      <div className="py-10! container grid grid-cols-1 gap-y-10 gap-x-20 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">{service.title}</h1>
          <div className="mt-5">
            <RichTextViewer content={service.long_description} />
          </div>
        </div>

        <ServiceOrderCard service={service} />
      </div>
    </div>
  );
}
