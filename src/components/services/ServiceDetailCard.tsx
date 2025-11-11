import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceDetailCardProps {
  image: string;
  titleKey: string;
  descriptionKey: string;
  bullets?: string[];
}

const ServiceDetailCard = ({ image, titleKey, descriptionKey, bullets }: ServiceDetailCardProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={t(titleKey)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-xl md:text-2xl font-cairo font-bold text-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t(titleKey)}
        </h3>
        <p className={`text-sm md:text-base font-cairo text-foreground/80 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t(descriptionKey)}
        </p>
        {bullets && bullets.length > 0 && (
          <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-sm font-cairo text-foreground/70">
                <span className="text-accent mt-1">•</span>
                <span>{t(bullet)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailCard;
