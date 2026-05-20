"use client";

import truncateText from "@/helper/truncate-text";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogItem({ blog }: { blog: BlogType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div
      className="bg-[#F4F2F6] rounded-lg xl:px-10 px-5 py-5 flex flex-col md:flex-row items-center gap-y-5 gap-x-10"
    >
      <div className="md:w-[212px] w-full h-full aspect-square relative md:h-[212px] rounded-md">
        <Image fill src={blog.image} alt={blog.title} className="rounded-md object-cover" />
      </div>
      <div>
        <p className="text-[11px]">
          {" "}
          {t("blog.item.by")} {blog.author}
        </p>
        <h3 className="text-[20px] font-bold">{blog.title}</h3>
        <p className="text-[13px] mt-5 max-w-lg">{truncateText(blog.description, 130)}</p>
        <div className="flex flex-col justify-between mt-5 gap-y-5 lg:flex-col xl:flex-row xl:items-center">
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <Calendar size={13} color="#b99745" />
              <p className="text-[11px]">{blog.created_at}</p>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={13} color="#b99745" />
              <p className="text-[11px] text-[#4F4D52]">
                {blog.views} {t("blog.item.views")}
              </p>
            </div>
          </div>
          <Link href={`/blog/${blog.slug}`} className="bg-primary justify-center flex items-center text-white py-2 px-4 text-[11px] hover:bg-secondary transition-colors">
            {t("blog.item.readArticle")}
          </Link>
        </div>
      </div>
    </div>
  );
}
