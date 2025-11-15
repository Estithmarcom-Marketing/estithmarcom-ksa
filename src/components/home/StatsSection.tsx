import { Briefcase, Building, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Briefcase,
      labelKey: "stats.companies",
      value: "+1000",
      color: "text-accent"
    },
    {
      icon: Building,
      labelKey: "stats.residency",
      value: "+300",
      color: "text-accent"
    },
    {
      icon: CheckCircle,
      labelKey: "stats.incubation",
      value: "+20",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 ${stat.color}`} />
              <h3 className="text-base md:text-lg text-shadow-lg font-bold text-foreground mb-2">
                {t(stat.labelKey)}
              </h3>
              <p className={`text-3xl md:text-4xl  font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
