import { ServiceType } from "@/lib/types/service";
import ServiceDetailsClient from "./_components/service-details-client";

export default function ServicePage() {
  const service: ServiceType = {
    id: 1,
    icon: "📄",
    title: "الإجراءات الحكومية",
    short_description: "استشارات وخدمات قانونية متكاملة للأفراد والشركات.",
  };
  return (
    <div>
      <ServiceDetailsClient service={service} />
    </div>
  );
}
