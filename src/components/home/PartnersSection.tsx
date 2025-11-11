import { useLanguage } from "@/contexts/LanguageContext";

const PartnersSection = () => {
  const { t } = useLanguage();
  
  const partners = [
    "Tech Maintain",
    "مطاعم الروضة",
    "إتجاف",
    "سابا",
    "LOZOOCAR",
    "رمتان",
    "وجه بالفهم",
    "تقنية معاملات"
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary text-center mb-8 md:mb-12">
          {t('partners.title')}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="w-20 h-20 md:w-24 md:h-24 bg-secondary/50 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <span className="text-xs font-cairo font-semibold text-primary text-center px-2">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
