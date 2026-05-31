"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";


export default function Newsletter() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
      <div className="bg-primary rounded-lg p-5 text-white">
        <p className="text-xl font-bold my-2">{t("blogpage.sidebar.newsletter.title")}</p>
        <p className="my-5 text-sm text-white/50">{t("blogpage.sidebar.newsletter.desc")}</p>
        <input
          type="email"
          id="email"
          placeholder={t("blogpage.sidebar.newsletter.email")}
          className="bg-transparent mt-5 text-xs border border-t-transparent border-l-transparent border-r-transparent border-b-white/20 py-2 outline-none w-full"
        />
        <button className="bg-white mt-5 py-2 text-[#666] text-sm duration-300 hover:bg-secondary hover:text-white cursor-pointer font-bold w-full text-center">
          {t("footer.newsletter.subscribe")}
        </button>
      </div>
  );
}
