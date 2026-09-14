"use client";

import { Headset } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { openEmbeddedChat } from "@/lib/chat/embedded-chat-bridge";
import { getTranslator } from "@/lib/i18n";
import type { ServiceType } from "@/lib/types/service";

interface ServiceCountry {
  id: number;
  name: string;
}

interface ServiceOrderCardProps {
  service: ServiceType;
  serviceCountry?: ServiceCountry;
}

const DEFAULT_SERVICE_COUNTRY_NAME = "السعودية";

export default function ServiceOrderCard({
  service,
  serviceCountry,
}: ServiceOrderCardProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const hasChatTarget = Boolean(
    service.chat_target_type && service.chat_target_id,
  );

  function handleOrderNow() {
    if (!service.chat_target_type || !service.chat_target_id) return;

    openEmbeddedChat({
      targetType: service.chat_target_type,
      targetId: service.chat_target_id,
      source: "service_order_card",
      websiteServiceId: service.id,
      serviceCountryId: serviceCountry?.id,
      serviceCountryName:
        serviceCountry?.name ?? DEFAULT_SERVICE_COUNTRY_NAME,
      pageUrl: window.location.href,
      locale,
    });
  }

  return (
    <div className="relative h-fit! mt-10! mx-auto w-full max-w-sm rounded-3xl bg-white px-8 pt-14 pb-8 text-center shadow-2xl">
      {/* top gold gradient bar */}
      <span className="absolute inset-x-0 top-3 h-1.5 bg-gradient-to-r from-secondary via-yellow-200 to-secondary" />
      <span className="absolute inset-x-0 top-0 h-3 rounded-t-3xl bg-primary" />

      {/* icon badge */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2">
        <div className="rounded-full bg-gradient-to-br from-secondary via-yellow-200 to-secondary p-[3px] shadow-md">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary">
            <Headset className="h-10 w-10 text-yellow-200" strokeWidth={2} />
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