import { Scale, Building2, Rocket, Home, FileText, Briefcase } from "lucide-react";
import ServiceCard from "./ServiceCard";

const ServicesGrid = () => {
  const services = [
    {
      icon: Scale,
      title: "المحاماة والشؤون القانونية",
      description: "استشارات وخدمات قانونية متكاملة للأفراد والشركات"
    },
    {
      icon: Building2,
      title: "تأسيس الشركات",
      description: "تأسيس الشركات وإنهاء جميع الإجراءات المطلوبة"
    },
    {
      icon: Rocket,
      title: "احتضان المشاريع",
      description: "دعم وتطوير المشاريع الناشئة من البداية إلى النجاح"
    },
    {
      icon: Home,
      title: "حجز مكتب أو مساحة عمل",
      description: "مساحات عمل جاهزة بالكامل لتبدأ أعمالك"
    },
    {
      icon: FileText,
      title: "الإقامة المميزة",
      description: "خدمات الإقامة المميزة وتسهيل إجراءات الاستثمار"
    },
    {
      icon: Briefcase,
      title: "الأعمال التقنية",
      description: "متابعة وإدارة المعاملات الحكومية بكفاءة وسرعة"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;