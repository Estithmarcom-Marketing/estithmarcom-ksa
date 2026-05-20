"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { Search } from "lucide-react";

export default function SearchInput({ entityName }: { entityName: string }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  return (
    <div className="flex items-center rounded-full overflow-hidden border border-gray-200 shadow-sm w-full">
      <input
        type="text"
        placeholder={`${t("blogpage.search.placeholder")} ${entityName}...`}
        className="flex-1 bg-secondary text-white placeholder:text-white/80 px-4 py-3 outline-none text-sm"
      />
      <button className="bg-white flex items-center justify-center px-4 py-3 shrink-0">
        <Search size={20} className="text-gray-500" />
      </button>
    </div>
  );
}
