"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { CategoryType } from "@/lib/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoriesList({
  activeCategory,
  categories,
  showAll = true,
}: {
  activeCategory: number;
  categories: CategoryType[];
  showAll?: boolean;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const searchParams = useSearchParams();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      element.classList.add("is-scrolling");

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        element.classList.remove("is-scrolling");
      }, 1000);
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

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
      ref={scrollRef}
      className="special-scroll rounded-lg overflow-y-auto max-h-80 py-8 px-2 bg-[#FAFAFA]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <p className="text-base font-semibold px-4 py-3">
        {t("blogpage.categories.title")}
      </p>

      <ul>
        {showAll && (
          <li className="flex items-center justify-between border-t border-[#f0f0f0]">
            <Link
              href={getCategoryLink("all")}
              className={`w-full ps-5 ${
                !activeCategory ? "bg-secondary text-white" : ""
              } flex rounded-sm duration-300 hover:bg-secondary hover:text-white items-center gap-3 px-4 py-3 text-sm cursor-pointer text-gray-700`}
            >
              {locale === "ar" ? (
                <ChevronLeft size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <span>{locale === "ar" ? "الكل" : "All"}</span>
            </Link>
          </li>
        )}

        {categories.map((cat, idx) => (
          <li
            key={cat.id}
            className={`flex items-center justify-between border-t border-[#f0f0f0] ${
              idx === categories.length - 1 && "border-b"
            }`}
          >
            <Link
              href={getCategoryLink(cat.id)}
              className={`w-full ps-5 ${
                cat.id === activeCategory ? "bg-secondary text-white" : ""
              } flex rounded-sm duration-300 hover:bg-secondary hover:text-white items-center gap-3 px-4 py-3 text-sm cursor-pointer text-gray-700`}
            >
              {locale === "ar" ? (
                <ChevronLeft size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
