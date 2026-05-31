import { ServiceType } from "@/lib/types/service";
import ServiceDetailsClient from "./_components/service-details-client";

export default function ServicePage() {
  const service: ServiceType = {
    id: 5,
    icon: "📄",
    title: "الإجراءات الحكومية",
    short_description: "استشارات وخدمات قانونية متكاملة للأفراد والشركات.",
    features_description: "نقدّم مجموعة متكاملة من الخدمــات الاحترافية التي تهـــدف إلى دعـــم الأفــــراد والشركـــات فــي مختلف مراحل أعـمالهم، من التأسيس إلى التطوير، وفق أعلى معايير الجودة والكفاءة",
    features: [
      {
        id: 1,
        title: "تأسيس الشركات",
        description: "نقدم حلول مبتكرة لتأسيس الشركات وفق المعايير القانونية."
      },
      {
        id: 2,
        title: "تجديد الرخص",
        description: "نقدم خدمات متكاملة لتجديد الرخص وفق المعايير القانونية."
      },
      {
        id: 3,
        title: "تأسيس الشركات",
        description: "نقدم حلول مبتكرة لتأسيس الشركات وفق المعايير القانونية."
      },
      {
        id: 4,
        title: "تجديد الرخص",
        description: "نقدم خدمات متكاملة لتجديد الرخص وفق المعايير القانونية."
      },
    ]
  };
  return (
    <div>
      <ServiceDetailsClient service={service} />
    </div>
  );
}
