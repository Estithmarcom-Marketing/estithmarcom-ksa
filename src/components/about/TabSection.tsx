import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import establishmentImg from "@/assets/services/establishment.jpg";

const TabSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [activeTab, setActiveTab] = useState<'about' | 'vision' | 'mission'>('about');

  const tabs = [
    { id: 'about' as const, labelKey: 'aboutPage.tabs.aboutUs' },
    { id: 'vision' as const, labelKey: 'aboutPage.tabs.vision' },
    { id: 'mission' as const, labelKey: 'aboutPage.tabs.mission' },
  ];

  const content = {
    about: {
      titleKey: 'aboutPage.aboutUs.title',
      descriptionKey: 'aboutPage.aboutUs.description',
    },
    vision: {
      titleKey: 'aboutPage.vision.title',
      descriptionKey: 'aboutPage.vision.description',
    },
    mission: {
      titleKey: 'aboutPage.mission.title',
      descriptionKey: 'aboutPage.mission.description',
    },
  };

  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={establishmentImg} 
                alt="About Us"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-cairo font-semibold transition-all text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-accent text-primary'
                      : 'bg-white text-foreground hover:bg-accent/10'
                  }`}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg">
              <h3 className={`text-2xl md:text-3xl font-cairo font-bold text-primary mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(content[activeTab].titleKey)}
              </h3>
              <p className={`text-base md:text-lg font-cairo text-foreground/80 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(content[activeTab].descriptionKey)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabSection;
