"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType } from "@/lib/types/blog";
import Image from "next/image";
import Link from "next/link";
import NoImageHolder from "../global/no-image-holder";

export default function BlogItem2({ blog }: { blog: BlogType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="grid md:grid-cols-2 gap-0 md:gap-10 h-full">
      <Link
        href={`/blog/${blog.slug}`}
        className="relative aspect-square shrink-0 rounded-t-3xl md:rounded-t-none md:rounded-s-3xl! overflow-hidden"
      >
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-t-3xl md:rounded-t-none md:rounded-s-3xl!"
          />
        ) : (
          <NoImageHolder />
        )}
      </Link>
      <div className="bg-white md:bg-transparent p-5 md:p-0">
        <h4 className="md:text-lg font-bold">{blog.title}</h4>
        <p className="text-sm mt-4 md:mt-8">{blog.short_content}</p>
        <Link
          href={`/blog/${blog.slug}`}
          className="text-xs mt-4 font-bold hover:underline text-secondary"
        >
          {t("watchmore")}
        </Link>
      </div>
    </div>
  );
}
