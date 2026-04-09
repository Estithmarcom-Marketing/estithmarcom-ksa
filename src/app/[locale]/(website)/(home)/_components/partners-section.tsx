"use client";

import SpecialHeader from "@/components/global/special-header";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import partner_img from "@/assets/partners-1.png";
import partner_img2 from "@/assets/partners-2.png";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PartnerItem from "@/components/partners/partner-item";
import { PartnerType } from "@/lib/types/partner";

export default function PartnersSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const partners: PartnerType[] = [
    {
      id: 1,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 2,
      name: "mithaq",
      image: partner_img2,
    },
    {
      id: 3,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 4,
      name: "mithaq",
      image: partner_img2,
    },
    {
      id: 5,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 6,
      name: "mithaq",
      image: partner_img2,
    },
    {
      id: 7,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 8,
      name: "mithaq",
      image: partner_img2,
    },
    {
      id: 9,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 10,
      name: "mithaq",
      image: partner_img2,
    },
    {
      id: 11,
      name: "mithaq",
      image: partner_img,
    },
    {
      id: 12,
      name: "mithaq",
      image: partner_img2,
    },
  ];
  return (
    <div className="container">
      <SpecialHeader header={t("partners.title")} desc={t("partners.desc")} />
      <div className="mt-15">
        <Carousel
          orientation="horizontal"
          plugins={[Autoplay({ delay: 2000 })]}
          opts={{ align: "start", dragFree: true, loop: true }}
          className="flex-1 px-0"
        >
          <CarouselContent>
            {partners.map((el) => (
              <CarouselItem className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8" key={el.id}>
                <PartnerItem partner={el} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
