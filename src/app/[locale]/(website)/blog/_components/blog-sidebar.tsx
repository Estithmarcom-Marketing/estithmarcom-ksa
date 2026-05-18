"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ChevronLeft, Search } from "lucide-react";
import BlogNewsletter from "./blog-newslettter";

const categories = ["تأسيس الشركات", "استثمار", "الخدمات الحكومية"];

export default function BlogSidebar({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="my-20 mx-5">
      <div className="flex items-center rounded-full overflow-hidden border border-gray-200 shadow-sm w-full">
        <input
          type="text"
          placeholder={t("blogpage.search.placeholder")}
          className="flex-1 bg-[#b99745] text-white placeholder:text-white/80 px-4 py-3 outline-none text-sm"
        />
        <button className="bg-white flex items-center justify-center px-4 py-3 shrink-0">
          <Search size={20} className="text-gray-500" />
        </button>
      </div>
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-[#FAFAFA]" dir="rtl">
        <p className="text-base font-semibold px-4 py-3 border-b border-gray-200">{t("blogpage.categories.title")}</p>
        <ul>
          {categories.map((cat) => (
            <li key={cat} className="flex items-center justify-between">
              <ChevronLeft size={16} className={activeCategory === cat ? "text-white" : "text-gray-400"} />
              <button
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm border-b border-gray-100 last:border-b-0 transition-colors cursor-pointer ${
                  activeCategory === cat ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{cat}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <BlogNewsletter />
    </div>
  );
}
