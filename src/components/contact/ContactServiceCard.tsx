import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactServiceCardProps {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

const ContactServiceCard = ({ icon: Icon, titleKey, descriptionKey, color }: ContactServiceCardProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
      <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className={`text-lg   font-bold   mb-3 text-center`}>
        {t(titleKey)}
      </h3>
      <p className={`text-sm   text-foreground/70 leading-relaxed text-center mb-4`}>
        {t(descriptionKey)}
      </p>
      <button className="w-full text-accent hover:text-accent/80   font-semibold text-sm underline">
        {language === 'ar' ? 'اطلب الخدمة الآن' : 'Request Service Now'}
      </button>
    </div>
  );
};

export default ContactServiceCard;
