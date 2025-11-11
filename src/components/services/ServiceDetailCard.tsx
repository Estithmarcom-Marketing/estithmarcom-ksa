import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface ServiceDetailCardProps {
  image: string;
  titleKey: string;
  descriptionKey: string;
  bullets?: string[];
  serviceId: string;
}

const ServiceDetailCard = ({ image, titleKey, descriptionKey, bullets, serviceId }: ServiceDetailCardProps) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="relative h-full shadow-2xl hover:shadow-3xl transition-all duration-300 group">
      {/* Image Part - On Top */}
      <div className="relative h-[250px] rounded-t-3xl overflow-hidden">
        <img 
          src={image} 
          alt={t(titleKey)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Text Part - Below, overlapping image by 10% with diagonal bottom */}
      <div 
        className="relative bg-primary rounded-3xl p-6 md:p-8 -mt-[10%] mx-4 border-4 border-accent border-t-0"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}
      >
        <h3 className={`text-xl md:text-2xl font-cairo font-bold text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t(titleKey)}
        </h3>
        
        <p className={`text-sm md:text-base font-cairo leading-relaxed text-white/90 ${isRTL ? 'text-right' : 'text-left'}`}>
          Professional solutions tailored to your business needs with expert consultation and seamless execution.
        </p>

        <Link to={`/services/${serviceId}`}>
          <button className="mt-6 bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-full font-cairo font-semibold transition-all hover:scale-105">
            {isRTL ? 'المزيد' : 'More'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetailCard;
