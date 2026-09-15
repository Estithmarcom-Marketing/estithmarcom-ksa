"use client";

import { useLocale } from "@/hooks/use-locale";
import { openEmbeddedChat } from "@/lib/chat/embedded-chat-bridge";
import { getTranslator } from "@/lib/i18n";
import type { ResidencyType } from "@/lib/types/residency";
import OrderCard from "@/components/shared/order-card";

interface ResidencyOrderCardProps {
  residency: ResidencyType;
}

const DEFAULT_CHAT_TARGET_TYPE = "category" as const;
const DEFAULT_CHAT_TARGET_ID = "premium-residency";

export default function ResidencyOrderCard({
  residency,
}: ResidencyOrderCardProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  function handleOrderNow() {
    const targetType =
      residency.chat_target_type ?? DEFAULT_CHAT_TARGET_TYPE;
    const targetId =
      residency.chat_target_id ?? DEFAULT_CHAT_TARGET_ID;

    openEmbeddedChat({
      targetType,
      targetId,
      source: "residency_order_card",
      websiteServiceId: residency.id,
      pageUrl: window.location.href,
      locale,
    });
  }

  return (
    <OrderCard
      header={t("serviceDetails.orderCard.title")}
      onOrderNow={handleOrderNow}
    />
  );
}
