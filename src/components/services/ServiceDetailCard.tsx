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
    <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group h-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={t(titleKey)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/90 to-primary/95"></div>
      </div>

      {/* Content */}
      <div className="relative p-6 md:p-8 flex flex-col justify-between min-h-[400px] text-white">
        <div>
          <div className="bg-accent/90 inline-block px-6 py-2 rounded-full mb-6">
            <h3 className={`text-lg md:text-xl font-cairo font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
              {t(titleKey)}
            </h3>
          </div>
          
          <p className={`text-sm md:text-base font-cairo leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t(descriptionKey)}
          </p>
          
          {bullets && bullets.length > 0 && (
            <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2 text-sm font-cairo">
                  <span className="text-accent mt-1">•</span>
                  <span>{t(bullet)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="mt-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-3 rounded-full font-cairo font-semibold transition-all hover:scale-105 self-start">
          {isRTL ? 'المزيد' : 'More'}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailCard;
