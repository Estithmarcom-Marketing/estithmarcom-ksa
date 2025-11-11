import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ServiceDetailCard from "@/components/services/ServiceDetailCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import professionalPerson from "@/assets/professional-person.jpg";
import establishmentImg from "@/assets/services/establishment.jpg";
import administrativeImg from "@/assets/services/administrative.jpg";
import marketingImg from "@/assets/services/marketing.jpg";
import governmentImg from "@/assets/services/government.jpg";
import workspaceImg from "@/assets/services/workspace.jpg";
import feasibilityImg from "@/assets/services/feasibility.jpg";

const Services = () => {
  const { t, dir } = useLanguage();

  const services = [
    {
      image: establishmentImg,
      titleKey: "servicesPage.establishment.title",
      descriptionKey: "servicesPage.establishment.description",
      bullets: [
        "servicesPage.establishment.bullet1",
        "servicesPage.establishment.bullet2",
        "servicesPage.establishment.bullet3",
        "servicesPage.establishment.bullet4",
      ]
    },
    {
      image: administrativeImg,
      titleKey: "servicesPage.administrative.title",
      descriptionKey: "servicesPage.administrative.description",
      bullets: [
        "servicesPage.administrative.bullet1",
        "servicesPage.administrative.bullet2",
        "servicesPage.administrative.bullet3",
        "servicesPage.administrative.bullet4",
        "servicesPage.administrative.bullet5",
        "servicesPage.administrative.bullet6",
      ]
    },
    {
      image: marketingImg,
      titleKey: "servicesPage.marketing.title",
      descriptionKey: "servicesPage.marketing.description",
    },
    {
      image: governmentImg,
      titleKey: "servicesPage.government.title",
      descriptionKey: "servicesPage.government.description",
      bullets: [
        "servicesPage.government.bullet1",
        "servicesPage.government.bullet2",
        "servicesPage.government.bullet3",
        "servicesPage.government.bullet4",
        "servicesPage.government.bullet5",
        "servicesPage.government.bullet6",
        "servicesPage.government.bullet7",
      ]
    },
    {
      image: workspaceImg,
      titleKey: "servicesPage.workspace.title",
      descriptionKey: "servicesPage.workspace.description",
    },
    {
      image: feasibilityImg,
      titleKey: "servicesPage.feasibility.title",
      descriptionKey: "servicesPage.feasibility.description",
      bullets: [
        "servicesPage.feasibility.bullet1",
        "servicesPage.feasibility.bullet2",
        "servicesPage.feasibility.bullet3",
        "servicesPage.feasibility.bullet4",
        "servicesPage.feasibility.bullet5",
        "servicesPage.feasibility.bullet6",
        "servicesPage.feasibility.bullet7",
      ]
    },
  ];

  return (
    <div className="min-h-screen font-cairo" dir={dir}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
            {/* Professional Image */}
            <div className={`${dir === 'rtl' ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-accent/30 rounded-lg transform translate-x-4 translate-y-4"></div>
                <div className="relative bg-accent/40 rounded-lg p-2 overflow-hidden">
                  <img 
                    src={professionalPerson} 
                    alt="Professional"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`text-white ${dir === 'rtl' ? 'lg:order-1 text-right' : 'lg:order-2 text-left'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold mb-4">
                {t('servicesPage.title')}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-cairo mb-8 opacity-95">
                {t('servicesPage.subtitle')}
              </p>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-cairo font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105 mx-auto lg:mx-0">
                <span>{dir === 'rtl' ? 'تواصل معنا الآن' : 'Contact Us Now'}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceDetailCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
