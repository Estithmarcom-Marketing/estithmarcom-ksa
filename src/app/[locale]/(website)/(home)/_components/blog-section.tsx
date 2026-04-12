"use client";

import SpecialHeader from "@/components/global/special-header";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import blog_img from "@/assets/blog_img.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogType } from "@/lib/types/blog";
import BlogItem from "@/components/blog/blog-item";

export default function BlogSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const blogs: BlogType[] = [
    {
      id: 1,
      image: blog_img,
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "تحويل الشركة ذات المسؤولية المحدودة إلى شركة مساهمة مغلقة يتطلب موافقة الشركاء (غالباً بأغلبية موصوفة)، تعديل عقد التأسيس ليصبح نظاماً أساسياً، استيفاء الحد الأدنى لرأس المال....",
      views: 330,
      author: "محمد عبد العزيز",
    },
    {
      id: 2,
      image: blog_img,
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "تحويل الشركة ذات المسؤولية المحدودة إلى شركة مساهمة مغلقة يتطلب موافقة الشركاء (غالباً بأغلبية موصوفة)، تعديل عقد التأسيس ليصبح نظاماً أساسياً، استيفاء الحد الأدنى لرأس المال....",
      views: 330,
      author: "محمد عبد العزيز",
    },
    {
      id: 3,
      image: blog_img,
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "تحويل الشركة ذات المسؤولية المحدودة إلى شركة مساهمة مغلقة يتطلب موافقة الشركاء (غالباً بأغلبية موصوفة)، تعديل عقد التأسيس ليصبح نظاماً أساسياً، استيفاء الحد الأدنى لرأس المال....",
      views: 330,
      author: "محمد عبد العزيز",
    },
  ];
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
                    <BlogItem blog={el} />
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
