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
import { BlogType } from "@/lib/types/blog";
import BlogItem2 from "@/components/blog/blog-item2";

export default function BlogSection({ blogs }: { blogs: BlogType[] }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="py-[60px]">
      <div className="container px-13!">
        <SpecialHeader header={t("blogs.title")} desc={t("blogs.desc")} />
        <div className="mt-15">
          <Carousel
            orientation="horizontal"
            opts={{ align: "start", loop: true }}
            className="flex-1 px-0"
          >
            <div className="relative">
              <CarouselContent>
                {blogs.map((el) => (
                  <CarouselItem
                    className="basis-full sm:basis-1/2 md:basis-full xl:basis-1/2"
                    key={el.id}
                  >
                    <BlogItem2 blog={el} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="top-1/2 -translate-y-1/2 end-0" />
              <CarouselPrevious className="top-1/2 -translate-y-1/2 start-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
