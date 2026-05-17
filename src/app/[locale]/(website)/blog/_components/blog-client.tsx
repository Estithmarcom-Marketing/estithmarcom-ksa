"use client";

import BlogItem from "@/components/blog/blog-item";
import PagesHero from "@/components/global/pages-hero";
// import OurNumbersSection from "@/components/service/our-numbers-section";
// import ServiceItem from "@/components/service/service-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { Eye, Calendar } from "lucide-react";





export default function ServicesClient() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const blogs: BlogType[] = [
        {
            id: 1,
            image: "/blog-post.png",
            author: "حمد عبد العزيز",
            views: 1200,
            created_at: "2023-01-01",
            slug: "government-procedures",
            title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
            description: "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
        },
         {
            id: 1,
            image: "/blog-post.png",
            author: "حمد عبد العزيز",
            views: 1200,
            created_at: "2023-01-01",
            slug: "government-procedures",
            title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
            description: "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
        },
         {
            id: 1,
            image: "/blog-post.png",
            author: "حمد عبد العزيز",
            views: 1200,
            created_at: "2023-01-01",
            slug: "government-procedures",
            title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
            description: "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
        },
      ];
 

  return (
    <>
      <PagesHero title={t("blogpage.title")} desc={t("blogpage.description")} />
      <section className="relative h-[68px]">
        <div className="rounded-lg bg-white w-3/4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-[135px] flex items-center gap-4 z-50 p-10 shadow-lg">
            <img src="/blog_icon.svg" alt="" />
            <p>{t("blogpage.newsletter")}</p>
        </div>
      </section>
      <section className=" container">
        <div className="my-20 gap-10 flex flex-col">
            {blogs.map((el) => (
                // <div className="bg-[#F4F2F6] rounded-lg p-5 flex flex-col md:flex-row items-center gap-10">
                //     <div>
                //         <img src={el.image} alt="" className=""/>
                //     </div>
                //     <div>
                //         <p className="text-[11px]"> بواسطة {el.author}</p>
                //         <h3 className="text-[20px] font-bold">{el.title}</h3>
                //         <p className="text-[13px]">{el.description}</p>
                //         <div className="flex gap-5 mt-5">
                //             <div className="flex items-center gap-1">
                //                 <Calendar size={13} color="#b99745" />
                //                 <p className="text-[11px]">{el.created_at}</p>
                //             </div>
                //             <div className="flex items-center gap-1">
                //                 <Eye size={13} color="#b99745" />
                //                 <p className="text-[11px] text-[#4F4D52]">{el.views} مشاهدة</p>
                //             </div>
                //         </div>
                //     </div>
                // </div>

                <BlogItem key={el.id} blog={el} />
            ))}
        </div>
      </section>
      
      {/* <section className="py-[100px]! container grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((el) => (
          <ServiceItem key={el.id} service={el} />
        ))}
      </section>
      <OurNumbersSection /> */}
    </>
  );
}
