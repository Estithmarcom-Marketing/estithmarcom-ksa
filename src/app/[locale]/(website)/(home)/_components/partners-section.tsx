"use client";

import SpecialHeader from "@/components/global/special-header";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PartnerItem from "@/components/partners/partner-item";
import { PartnerType } from "@/lib/types/partner";

export default function PartnersSection({
  partners,
}: {
  partners: PartnerType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="container px-13!">
      <SpecialHeader header={t("partners.title")} desc={t("partners.desc")} />
      <div className="mt-15">
        <Carousel
          orientation="horizontal"
          plugins={[Autoplay({ delay: 2000 })]}
          opts={{ align: "start", loop: true, skipSnaps: true }}
          className="flex-1 px-0"
        >
          <CarouselContent>
            {partners.map((el) => (
              <CarouselItem
                className="basis-1/3 sm:basis-1/4 md:basis-1/5"
                key={el.id}
              >
                <PartnerItem partner={el} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="top-1/2 -translate-y-1/2 end-0" />
          <CarouselPrevious className="top-1/2 -translate-y-1/2 start-0" />
        </Carousel>
      </div>
    </div>
  );
}
