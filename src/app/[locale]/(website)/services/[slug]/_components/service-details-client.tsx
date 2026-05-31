"use client";

import FAQ from "@/components/global/faq";
import PagesHero from "@/components/global/pages-hero";
import FeatureItem from "@/components/service/feature-item";
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
  ) : <ServiceShape2 service={service} />;
  return (
    <div>
      <PagesHero
        title={t("serviceDetails.title")}
        desc={t("serviceDetails.description")}
      />
      <section className="container py-10!">
        {serviceShape}
      </section>
      <section className="bg-[#f8f8fc] py-[70px]! sm:py-[100px]! rounded-lg">
        <div className="grid lg:grid-cols-3 gap-x-15 2xl:gap-x-25 gap-y-10 container items-center">
          <div>
            <span className="font-bold text-sm text-secondary">
              {t("serviceDetails.exclusiveBenefits")}
            </span>
            <h2 className="text-2xl font-bold mt-4 mb-6">
              {t("serviceDetails.whatWeOffer")}
            </h2>
            <p className="text-sm mt-3">{service.features_description}</p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {service.features?.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-[70px]! sm:py-[100px]! container">
        <FAQ />
      </section>
    </div>
  );
}
