import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Shield, Building, FileText, TrendingUp, Users, DollarSign, Scale } from "lucide-react";

const WhyChooseUs = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const features = [
    {
      icon: CheckCircle,
      titleKey: "aboutPage.feature1.title",
      descriptionKey: "aboutPage.feature1.description",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Shield,
      titleKey: "aboutPage.feature2.title",
      descriptionKey: "aboutPage.feature2.description",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Building,
      titleKey: "aboutPage.feature3.title",
      descriptionKey: "aboutPage.feature3.description",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: FileText,
      titleKey: "aboutPage.feature4.title",
      descriptionKey: "aboutPage.feature4.description",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: TrendingUp,
      titleKey: "aboutPage.feature5.title",
      descriptionKey: "aboutPage.feature5.description",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Users,
      titleKey: "aboutPage.feature6.title",
      descriptionKey: "aboutPage.feature6.description",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: DollarSign,
      titleKey: "aboutPage.feature7.title",
      descriptionKey: "aboutPage.feature7.description",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Scale,
      titleKey: "aboutPage.feature8.title",
      descriptionKey: "aboutPage.feature8.description",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className={` mb-8 md:mb-12 ${isRTL ? 'text-right' : 'text-left'}  mx-auto`}>
          <h2 className="text-3xl md:text-4xl  font-bold   mb-4 text-center">
            {t('aboutPage.why.title')}
          </h2>
          <p className="text-base md:text-lg  text-foreground/80 leading-relaxed ">
            {t('aboutPage.why.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className={`text-lg  font-bold   mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(feature.titleKey)}
              </h3>
              <p className={`text-sm  text-foreground/70 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
