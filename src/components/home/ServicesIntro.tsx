import { useLanguage } from "@/contexts/LanguageContext";

const ServicesIntro = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary mb-4 md:mb-6">
          {t('services.intro.title')}
        </h2>
        <p className="text-base md:text-lg font-cairo text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {t('services.intro.description')}
        </p>
      </div>
    </section>
  );
};

export default ServicesIntro;
