import heroImage from "@/assets/hero-cityscape.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-cairo font-bold mb-4 md:mb-6 leading-tight">
          {t('hero.title')}
          <br />
          <span className="text-accent">{t('hero.subtitle')}</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-cairo mb-2 md:mb-4 opacity-95">
          {t('hero.description1')}
        </p>
        <p className="text-base md:text-lg font-cairo opacity-90">
          {t('hero.description2')}
        </p>
      </div>
    </section>
  );
};

export default Hero;
