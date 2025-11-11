import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceCardProps {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const ServiceCard = ({ icon: Icon, titleKey, descriptionKey }: ServiceCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
      </div>
      <h3 className="text-lg md:text-xl font-cairo font-bold text-primary mb-3 text-center">
        {t(titleKey)}
      </h3>
      <p className="text-foreground/70 font-cairo text-center mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
        {t(descriptionKey)}
      </p>
      <Button 
        variant="ghost" 
        className="w-full text-accent hover:text-accent/80 font-cairo font-semibold"
      >
        {t('service.requestNow')}
      </Button>
    </div>
  );
};

export default ServiceCard;
