"use client"

import ServiceItem from "@/components/service/service-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType } from "@/lib/types/service";

export default function ServicesSection() {
  const locale = useLocale()
  const { t } = getTranslator(locale)
  const services: ServiceType[] = [
    {
      id: 1,
      icon: "📄",
      title: "الإجراءات الحكومية",
      short_description: "استشارات وخدمات قانونية متكاملة للأفراد والشركات.",
    },
    {
      id: 2,
      icon: "⚖️",
      title: "الشؤون القانونية",
      short_description: "استشارات وخدمات قانونية متكاملة للأفراد والشركات.",
    },
    {
      id: 3,
      icon: "🏢",
      title: "تأسيس الشركات",
      short_description:
        "نقدم حلول مبتكرة لتأسيس الشركات وفق المعايير القانونية.",
    },
    {
      id: 4,
      icon: "🚀",
      title: "احتضان المشاريع",
      short_description: "دعم وتطوير المشاريع الناشئة من الفكرة إلى التنفيذ.",
    },
    {
      id: 5,
      icon: "📊",
      title: "الاستشارات التسويقية",
      short_description: "نوفر استشارات في الإدارة والتسويق لدعم نمو الأعمال.",
    },
    {
      id: 6,
      icon: "⚙️",
      title: "الخدمات الإدارية",
      short_description:
        "نركز على رعاية وتنمية الأفكار الإبداعية والمشاريع الناشئة.",
    },
    {
      id: 7,
      icon: "🏭",
      title: "مساحات عمل جاهزة",
      short_description: "نقدم مساحات عمل ومصانع ومخازن مجهزة لدعم الاستثمار.",
    },
    {
      id: 8,
      icon: "⭐",
      title: "الإقامة المميزة والذهبية",
      short_description:
        "نوفر إقامات استثمارية مميزة لدعم رجال الأعمال والمستثمرين.",
    },
  ];
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-3xl mb-8">
          {t("services.title")}
        </h1>
        <p className="max-w-5xl m-auto">
          {t("services.desc")}
        </p>
      </div>
      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((el) => (
          <ServiceItem key={el.id} service={el} />
        ))}
      </div>
    </div>
  );
}
