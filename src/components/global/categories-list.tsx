"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: 1, title: "تأسيس الشركات" },
  { id: 2, title: "استثمار" },
  { id: 3, title: "الخدمات الحكومية" },
];

export default function CategoriesList({
  activeCategory,
}: {
  activeCategory: number;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  return (
    <div
      className="rounded-lg overflow-hidden py-8 px-2 bg-[#FAFAFA]"
      dir="rtl"
    >
      <p className="text-base font-semibold px-4 py-3">
        {t("blogpage.categories.title")}
      </p>
      <ul>
        {categories.map((cat, idx) => (
          <li
            key={cat.id}
            className={`flex items-center justify-between border-t border-[#f0f0f0] ${idx === categories.length -1 && "border-b"}`}
          >
            <Link
              href={`/`}
              className={`w-full ps-5 ${cat.id === activeCategory ? "bg-secondary text-white" : ""} flex duration-300 hover:bg-secondary hover:text-white items-center gap-3 px-4 py-3 text-sm cursor-pointer text-gray-700`}
            >
              <ChevronLeft size={16} />
              <span>{cat.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
