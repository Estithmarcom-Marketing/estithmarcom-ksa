"use client";

import BlogItem from "@/components/blog/blog-item";
import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { useState } from "react";
import BlogNewsletterBanner from "./blog-newsletter-banner";
import BlogSidebar from "./blog-sidebar";

export default function ServicesClient() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const blogs: BlogType[] = [
    {
      id: 1,
      image: "/blog-post.png",
      author: "حمد عبد العزيز",
      views: 1200,
      created_at: "2023-01-01",
      slug: "government-procedures",
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
    },
    {
      id: 1,
      image: "/blog-post.png",
      author: "حمد عبد العزيز",
      views: 1200,
      created_at: "2023-01-01",
      slug: "government-procedures",
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
    },
    {
      id: 1,
      image: "/blog-post.png",
      author: "حمد عبد العزيز",
      views: 1200,
      created_at: "2023-01-01",
      slug: "government-procedures",
      title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
      description:
        "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
    },
  ];

  return (
    <>
      <PagesHero title={t("blogpage.title")} desc={t("blogpage.description")} />
      <BlogNewsletterBanner />
      <section className="container lg:flex">
        <div className="my-20 gap-10 flex flex-col ">
          {blogs.map((el) => (
            <BlogItem key={el.id} blog={el} />
          ))}
        </div>
        <BlogSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </section>
    </>
  );
}
