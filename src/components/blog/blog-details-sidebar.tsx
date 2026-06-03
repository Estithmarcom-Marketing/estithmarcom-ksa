"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import Newsletter from "../global/newslettter";
import { CategoryType } from "@/lib/types/category";
import SearchInput from "../global/search-input";
import CategoriesList from "../global/categories-list";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogDetailsSidebar({
  activeCategory,
  categories,
}: {
  activeCategory: number;
  categories: CategoryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/blog?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="space-y-15">
      <SearchInput
        entityName={t("blog.entity")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearch}
      />
      <CategoriesList
        activeCategory={activeCategory}
        categories={categories}
        showAll={false}
      />
      <Newsletter />
    </div>
  );
}
