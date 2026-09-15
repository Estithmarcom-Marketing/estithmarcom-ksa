"use client";

import { useLocale } from "@/hooks/use-locale";
import { openEmbeddedChat } from "@/lib/chat/embedded-chat-bridge";
import { getTranslator } from "@/lib/i18n";
import type { ServiceType } from "@/lib/types/service";
import OrderCard from "@/components/shared/order-card";

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
    <OrderCard
      header={t("serviceDetails.orderCard.title")}
      onOrderNow={handleOrderNow}
      disabled={!hasChatTarget}
    />
  );
}
