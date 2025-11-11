import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ServiceDetailCard from "@/components/services/ServiceDetailCard";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-cityscape.jpg";
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
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cairo font-bold mb-4">
            {t('servicesPage.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-cairo opacity-95">
            {t('servicesPage.subtitle')}
          </p>
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
