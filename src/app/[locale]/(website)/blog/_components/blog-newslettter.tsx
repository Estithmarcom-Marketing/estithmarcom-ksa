"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";


export default function BlogNewsletter() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
      <div className="bg-primary rounded-lg p-5 text-white mt-3">
        <p className="text-lg font-bold my-2">{t("blogpage.sidebar.newsletter.title")}</p>
        <p className="my-5">{t("blogpage.sidebar.newsletter.desc")}</p>
        <label htmlFor="email">{t("blogpage.sidebar.newsletter.email")}</label>
        <hr className="border-white/30 my-4 lg:w-75 w-full" />
        <input
          type="email"
          id="email"
          className="border bg-white border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-75 w-full"
        />
      </div>
  );
}
