import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-cairo font-bold text-primary mb-3 text-center">
        {title}
      </h3>
      <p className="text-foreground/70 font-cairo text-center mb-6 leading-relaxed">
        {description}
      </p>
      <Button 
        variant="ghost" 
        className="w-full text-accent hover:text-accent/80 font-cairo font-semibold"
      >
        اطلب الخدمة الآن
      </Button>
    </div>
  );
};

export default ServiceCard;