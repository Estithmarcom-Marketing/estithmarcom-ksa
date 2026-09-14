"use client";

import { Headset } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { openEmbeddedChat } from "@/lib/chat/embedded-chat-bridge";
import { getTranslator } from "@/lib/i18n";
import type { ResidencyType } from "@/lib/types/residency";

interface ResidencyOrderCardProps {
  residency: ResidencyType;
}

export default function ResidencyOrderCard({
  residency,
}: ResidencyOrderCardProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const hasChatTarget = Boolean(
    residency.chat_target_type && residency.chat_target_id,
  );

  function handleOrderNow() {
    if (!residency.chat_target_type || !residency.chat_target_id) return;

    openEmbeddedChat({
      targetType: residency.chat_target_type,
      targetId: residency.chat_target_id,
      source: "residency_order_card",
      websiteServiceId: residency.id,
      pageUrl: window.location.href,
      locale,
    });
  }

  return (
    <div className="relative h-fit! mt-10! mx-auto w-full max-w-sm rounded-3xl border border-secondary/20 bg-white px-8 pt-14 pb-8 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
      {/* top gold gradient bar */}
      <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-secondary via-yellow-200 to-secondary" />

      {/* icon badge */}
      <div className="absolute left-1/2 -top-10 -translate-x-1/2">
        <div className="rounded-full bg-gradient-to-br from-secondary via-yellow-200 to-secondary p-[3px] shadow-md">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary">
            <Headset className="h-7 w-7 text-secondary" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      <h3 className="mb-4 mt-4 text-xl font-bold text-primary">
        {t("serviceDetails.orderCard.title")}
      </h3>

      <p className="mb-7 text-sm leading-7 text-gray-600">
        {t("serviceDetails.orderCard.description")}
      </p>

      <button
        type="button"
        onClick={handleOrderNow}
        disabled={!hasChatTarget}
        className="block w-full cursor-pointer rounded-full bg-gradient-to-r from-secondary via-yellow-200 to-secondary py-3.5 text-lg font-bold text-primary shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("serviceDetails.orderCard.button")}
      </button>

      <p className="mt-4 text-xs text-gray-400">
        {t("serviceDetails.orderCard.note")}
      </p>
    </div>
  );
}