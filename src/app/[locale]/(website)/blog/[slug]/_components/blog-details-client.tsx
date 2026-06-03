"use client";

import BlogDetailsSidebar from "@/components/blog/blog-details-sidebar";
import NoImageHolder from "@/components/global/no-image-holder";
import PagesHero from "@/components/global/pages-hero";
import { formatDate } from "@/helper/formatDate";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { CategoryType } from "@/lib/types/category";
import { Calendar, Eye, User } from "lucide-react";
import Image from "next/image";

export default function BlogDetailsClient({ blog, categories }: { blog: BlogType; categories: CategoryType[] }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  return (
    <div>
      <PagesHero
        title={t("blogDetails.title")}
        desc={t("blogDetails.description")}
      />
      <section className="container py-20! gap-15 grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            {blog.image ? <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-2xl"
            /> : <NoImageHolder />}
          </div>
          <ul className="flex items-center gap-10 mt-2">
            <li className="text-xs text-gray-500 flex gap-1 items-center">
              <Calendar className="text-secondary" size={15} />{" "}
              <span>
                {formatDate(blog.created_at, locale)}
              </span>
            </li>
          </ul>
          <div className="mt-10">
            <h1 className="text-lg font-bold">{blog.title}</h1>
            <p className="mt-5 text-[#666]">{blog.description}</p>
          </div>
        </div>
        <BlogDetailsSidebar activeCategory={blog.category.id} categories={categories} />
      </section>
    </div>
  );
}
