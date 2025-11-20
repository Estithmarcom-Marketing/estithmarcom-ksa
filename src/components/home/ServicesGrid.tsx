import { Scale, Building2, Rocket, Home, FileText, Briefcase } from "lucide-react";
import ServiceCard from "@/components/shared/ServiceCard";

const ServicesGrid = () => {
  const services = [
    {
      icon: Rocket,
      titleKey: "service.incubation.title",
      descriptionKey: "service.incubation.description"
    },
    {
      icon: Scale,
      titleKey: "service.legal.title",
      descriptionKey: "service.legal.description"
    },
    {
      icon: Briefcase,
      titleKey: "service.government.title",
      descriptionKey: "service.government.description"
    },
    {
      icon: Building2,
      titleKey: "service.company.title",
      descriptionKey: "service.company.description"
    },
    {
      icon: FileText,
      titleKey: "service.residency.title",
      descriptionKey: "service.residency.description"
    },
    {
      icon: Home,
      titleKey: "service.workspace.title",
      descriptionKey: "service.workspace.description"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 md:w-3/4">
        <div className="flex justify-between flex-wrap gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
