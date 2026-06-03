import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import SearchInput from "../global/search-input";
import CategoriesList from "../global/categories-list";
import Newsletter from "../global/newslettter";
import { CategoryType } from "@/lib/types/category";

export default function BlogSidebar({
  activeCategory,
  categories,
}: {
  activeCategory: number;
  categories: CategoryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="space-y-8">
      <CategoriesList activeCategory={activeCategory} categories={categories} />
      <Newsletter />
    </div>
  );
}
