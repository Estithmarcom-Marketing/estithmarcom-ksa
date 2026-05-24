"use client";

import FAQ from "@/components/global/faq";
import PagesHero from "@/components/global/pages-hero";
import FeatureItem from "@/components/service/feature-item";
import ServiceShape1 from "@/components/service/service-shape1";
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
  return (
    <div>
      <PagesHero
        title={t("serviceDetails.title")}
        desc={t("serviceDetails.description")}
      />
      <section className="container py-20!">
        <ServiceShape1 service={service} />
      </section>
      <section className="bg-[#f8f8fc] py-15 rounded-lg">
        <div className="grid lg:grid-cols-3 gap-x-15 2xl:gap-x-25 gap-y-10 container items-center">
          <div>
            <span className="font-bold text-sm text-secondary">
              {t("serviceDetails.exclusiveBenefits")}
            </span>
            <h2 className="text-2xl font-bold mt-4 mb-6">{t("serviceDetails.whatWeOffer")}</h2>
            <p className="text-sm mt-3">{service.features_description}</p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {service.features?.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-[100px]! container">
        <FAQ />
      </section>
    </div>
  );
}
