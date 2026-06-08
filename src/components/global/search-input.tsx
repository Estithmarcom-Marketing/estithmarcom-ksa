"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { de } from "date-fns/locale";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SearchInputProps {
  detailed?: boolean;
  entityName?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export default function SearchInput({
  detailed = false,
  entityName,
  value,
  onChange,
  onSubmit,
}: SearchInputProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const getHref = () => {
    const params = new URLSearchParams(searchParams.toString());
    const val = value.trim();
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    params.delete("page");
    if(!detailed){
      return `${pathname}?${params.toString()}`;
    }else{
      return `/blog?${params.toString()}`;
    }
  };

  return (
    <div className="flex items-center rounded-full overflow-hidden border border-gray-200 shadow-sm w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={`${t("blogpage.search.placeholder")}${entityName ? ` ${entityName}` : ""}...`}
        className="flex-1 bg-secondary text-white placeholder:text-white/80 px-4 py-3 outline-none text-sm"
      />
      <Link
        href={getHref()}
        aria-label={locale === "ar" ? `ابحث عن${entityName ? ` ${entityName}` : ""}` : `Search for${entityName ? ` ${entityName}` : ""}`}
        className="bg-white flex items-center justify-center min-w-[52px]! px-4 py-3 shrink-0"
      >
        <Search size={20} className="text-gray-500" />
      </Link>
    </div>
  );
}
