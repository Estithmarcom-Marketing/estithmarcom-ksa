"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { openEmbeddedChat } from "@/lib/chat/embedded-chat-bridge";
import { Building2 } from "lucide-react";

export default function BannerSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  function handleBookWorkspace() {
    openEmbeddedChat({
      targetType: "category",
      targetId: "ready-workspaces",
      source: "home_banner_workspace",
      pageUrl: window.location.href,
      locale,
    });
  }
  return (
    <div className="container">
      <div className="bg-white flex flex-col md:flex-row gap-3 md:justify-between py-5 sm:py-10 px-5 sm:px-10 shadow-2xl shadow-primary/10 rounded-lg md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]">
            <Building2 className="w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t("bannerSection.title")}
            </h2>
            <p className="text-xl sm:text-2xl font-bold mb-2">
              {t("bannerSection.title2")}
            </p>
            {/* <p className="text-red-600 text-sm sm:text-md font-bold">
              {t("bannerSection.desc")}
            </p> */}
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleBookWorkspace}
            className="bg-secondary w-fit hover:border-primary block rounded-sm px-14 duration-300 text-lg text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
          >
            {t("bannerSection.button")}
          </button>
        </div>
      </div>
    </div>
  );
}
