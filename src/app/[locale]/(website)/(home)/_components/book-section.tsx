"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { Building2, Factory } from "lucide-react";
import Link from "next/link";

export default function BookSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className="container">
      <div className="py-10 flex justify-between gap-5 flex-col md:flex-row md:items-center px-5 lg:px-20 text-white bg-primary rounded-lg">
        <div>
          <div className="mb-10">
            <h2 className="font-bold mb-4">{t("book.title")}</h2>
            <p className="text-sm">{t("book.desc")}</p>
          </div>
          <Link
            href={`/`}
            className="bg-secondary font-bold hover:border-primary px-5 rounded-sm duration-300 text-sm text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
          >
            {t("clickHere")}
          </Link>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#68557d] flex flex-col gap-2 items-center p-5 rounded-md">
            <Building2 />
            <p>مكتب</p>
          </div>
          <div className="bg-[#68557d] flex flex-col gap-2 items-center p-5 rounded-md">
            <Factory />
            <p>مصنع</p>
          </div>
        </div>
      </div>
    </div>
  );
}
