"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { CategoryType } from "@/lib/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoriesList({
  activeCategory,
  categories,
}: {
  activeCategory: number;
  categories: CategoryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const searchParams = useSearchParams();

  const getCategoryLink = (id: number | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("category_id");
    } else {
      params.set("category_id", id.toString());
    }
    params.set("page", "1");
    return `/blog?${params.toString()}`;
  };

  return (
    <div
      className="rounded-lg overflow-hidden py-8 px-2 bg-[#FAFAFA]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <p className="text-base font-semibold px-4 py-3">
        {t("blogpage.categories.title")}
      </p>
      <ul>
        <li
          className={`flex items-center justify-between border-t border-[#f0f0f0]`}
        >
          <Link
            href={getCategoryLink("all")}
            className={`w-full ps-5 ${!activeCategory ? "bg-secondary text-white" : ""} flex rounded-sm duration-300 hover:bg-secondary hover:text-white items-center gap-3 px-4 py-3 text-sm cursor-pointer text-gray-700`}
          >
            {locale === "ar" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            <span>{locale === "ar" ? "الكل" : "All"}</span>
          </Link>
        </li>
        {categories.map((cat, idx) => (
          <li
            key={cat.id}
            className={`flex items-center justify-between border-t border-[#f0f0f0] ${idx === categories.length - 1 && "border-b"}`}
          >
            <Link
              href={getCategoryLink(cat.id)}
              className={`w-full ps-5 ${cat.id === activeCategory ? "bg-secondary text-white" : ""} flex rounded-sm duration-300 hover:bg-secondary hover:text-white items-center gap-3 px-4 py-3 text-sm cursor-pointer text-gray-700`}
            >
              {locale === "ar" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
