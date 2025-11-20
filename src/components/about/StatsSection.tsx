import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: "+20", labelKey: "aboutPage.stats.projects" },
    { value: "+12", labelKey: "aboutPage.stats.experience" },
    { value: "+500", labelKey: "aboutPage.stats.clients" },
    { value: "+30", labelKey: "aboutPage.stats.services" }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-purple-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl   font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-base md:text-lg   text-white">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
