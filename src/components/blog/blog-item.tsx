"use client"

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import { Calendar, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogItem({ blog }: { blog: BlogType }) {
  const locale = useLocale()
  const { t } = getTranslator(locale)
  return (
    <Link href={`/blog/${blog.slug}`} className="bg-[#F4F2F6] rounded-lg p-5 flex flex-col md:flex-row items-center gap-10">
        <div>
            <img src={blog.image} alt="" className=""/>
        </div>
        <div>
            <p className="text-[11px]"> {t("blog.item.by")} {blog.author}</p>
            <h3 className="text-[20px] font-bold">{blog.title}</h3>
            <p className="text-[13px] max-w-lg text-wrap ">{blog.description}</p>
            <div className="flex justify-between">
                <div className="flex gap-5 mt-5">
                    <div className="flex items-center gap-1">
                        <Calendar size={13} color="#b99745" />
                        <p className="text-[11px]">{blog.created_at}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={13} color="#b99745" />
                        <p className="text-[11px] text-[#4F4D52]">{blog.views} {t("blog.item.views")}</p>
                    </div>
                </div>
                <button className="bg-primary text-white py-1 px-4  text-[11px] hover:bg-[#a0803a] transition-colors">
                           {t("blog.item.readArticle")}
                </button>
            </div>
        </div>
    </Link>
  );
}
