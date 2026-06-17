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
import { ZoneType } from "@/lib/types/zones";
import ZoneItem from "@/components/zone/zone-item";

export default function ZonesSection({ zones }: { zones: ZoneType[] }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="container px-13!">
      <SpecialHeader header={t("freezone.title")} desc={t("freezone.desc")} />
      <div className="mt-15">
        <Carousel
          orientation="horizontal"
          opts={{ align: "start", loop: true, skipSnaps: true }}
          className="flex-1 px-0"
        >
          <div className="relative">
            <CarouselContent>
              {zones.map((el) => (
                <CarouselItem
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  key={el.id}
                >
                  <ZoneItem zone={el} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="top-1/2 -translate-y-1/2 end-0" />
            <CarouselPrevious className="top-1/2 -translate-y-1/2 start-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
