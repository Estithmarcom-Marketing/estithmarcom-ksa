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
    <div className="relative h-full shadow-2xl hover:shadow-3xl transition-all duration-300 group" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}>
      {/* Image Part - On Top */}
      <div className="relative h-[250px] rounded-t-3xl overflow-hidden">
        <img 
          src={image} 
          alt={t(titleKey)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text Part - Below, overlapping image by 10% */}
      <div 
        className="relative bg-white rounded-3xl p-6 md:p-8 -mt-[10%] mx-4 border-4 border-accent border-t-0"
      >
        <div>
          <h3 className={`text-xl md:text-2xl font-cairo font-bold text-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t(titleKey)}
          </h3>
          
          <p className={`text-sm md:text-base font-cairo leading-relaxed mb-4 text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
            {t(descriptionKey)}
          </p>
          
          {bullets && bullets.length > 0 && (
            <ul className={`space-y-2 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 text-sm font-cairo text-foreground">
                  <span className="text-accent mt-1 font-bold">•</span>
                  <span>{t(bullet)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="mt-4 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-cairo font-semibold transition-all hover:scale-105">
          {isRTL ? 'المزيد' : 'More'}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailCard;
