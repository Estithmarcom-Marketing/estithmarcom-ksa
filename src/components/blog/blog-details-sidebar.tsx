"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import SearchInput from "../global/search-input";
import CategoriesList from "../global/categories-list";
import Newsletter from "../global/newslettter";

export default function BlogDetailsSidebar({
  activeCategory,
}: {
  activeCategory: number;
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="space-y-15">
      {/* <SearchInput entityName={t("blog.entity")} /> */}
      <CategoriesList activeCategory={activeCategory} />
      <Newsletter />
    </div>
  );
}
