import { Scale, Building2, Rocket, Home, FileText, Briefcase } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";

const ServicesGrid = () => {
  const services = [
    {
      icon: Scale,
      titleKey: "service.legal.title",
      descriptionKey: "service.legal.description"
    },
    {
      icon: Building2,
      titleKey: "service.company.title",
      descriptionKey: "service.company.description"
    },
    {
      icon: Rocket,
      titleKey: "service.incubation.title",
      descriptionKey: "service.incubation.description"
    },
    {
      icon: Home,
      titleKey: "service.workspace.title",
      descriptionKey: "service.workspace.description"
    },
    {
      icon: FileText,
      titleKey: "service.residency.title",
      descriptionKey: "service.residency.description"
    },
    {
      icon: Briefcase,
      titleKey: "service.technical.title",
      descriptionKey: "service.technical.description"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
