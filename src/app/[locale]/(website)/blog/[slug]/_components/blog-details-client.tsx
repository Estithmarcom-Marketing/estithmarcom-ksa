"use client";

import BlogDetailsSidebar from "@/components/blog/blog-details-sidebar";
import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { Calendar, Eye, User } from "lucide-react";
import Image from "next/image";

export default function BlogDetailsClient({ blog }: { blog: BlogType }) {
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
          <div className="relative aspect-video">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <ul className="flex items-center gap-10 mt-2">
            <li className="text-xs text-gray-500 flex gap-1 items-center">
              <User className="text-secondary" size={15} />{" "}
              <span>
                {blog.author}
              </span>
            </li>
            <li className="text-xs text-gray-500 flex gap-1 items-center">
              <Calendar className="text-secondary" size={15} />{" "}
              <span>
                {blog.created_at}
              </span>
            </li>
            <li className="text-xs text-gray-500 flex gap-1 items-center">
              <Eye className="text-secondary" size={15} />{" "}
              <span>
                {blog.views} {t("blog.item.views")}
              </span>
            </li>
          </ul>
          <div className="mt-10">
            <h1 className="text-lg font-bold">{blog.title}</h1>
            <p className="mt-5 text-[#666]">{blog.description}</p>
          </div>
        </div>
        <BlogDetailsSidebar activeCategory={1} />
      </section>
    </div>
  );
}
