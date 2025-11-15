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
      serviceId: "companyFormation",
      image: establishmentImg,
      titleKey: "servicesPage.companyFormation.title",
      descriptionKey: "servicesPage.companyFormation.description",
      bullets: [
        "servicesPage.companyFormation.bullet1",
        "servicesPage.companyFormation.bullet2",
        "servicesPage.companyFormation.bullet3",
        "servicesPage.companyFormation.bullet4",
      ]
    },
    {
      serviceId: "legal",
      image: administrativeImg,
      titleKey: "servicesPage.legal.title",
      descriptionKey: "servicesPage.legal.description",
      bullets: [
        "servicesPage.legal.bullet1",
        "servicesPage.legal.bullet2",
        "servicesPage.legal.bullet3",
        "servicesPage.legal.bullet4",
        "servicesPage.legal.bullet5",
        "servicesPage.legal.bullet6",
      ]
    },
    {
      serviceId: "incubation",
      image: marketingImg,
      titleKey: "servicesPage.incubation.title",
      descriptionKey: "servicesPage.incubation.description",
    },
    {
      serviceId: "workspace",
      image: governmentImg,
      titleKey: "servicesPage.workspace.title",
      descriptionKey: "servicesPage.workspace.description",
      bullets: [
        "servicesPage.workspace.bullet1",
        "servicesPage.workspace.bullet2",
        "servicesPage.workspace.bullet3",
        "servicesPage.workspace.bullet4",
        "servicesPage.workspace.bullet5",
        "servicesPage.workspace.bullet6",
        "servicesPage.workspace.bullet7",
      ]
    },
    {
      serviceId: "residency",
      image: feasibilityImg,
      titleKey: "servicesPage.residency.title",
      descriptionKey: "servicesPage.residency.description",
      bullets: [
        "servicesPage.residency.bullet1",
        "servicesPage.residency.bullet2",
        "servicesPage.residency.bullet3",
        "servicesPage.residency.bullet4",
        "servicesPage.residency.bullet5",
        "servicesPage.residency.bullet6",
        "servicesPage.residency.bullet7",
      ]
    },
    {
      serviceId: "government",
      image: workspaceImg,
      titleKey: "servicesPage.government.title",
      descriptionKey: "servicesPage.government.description",
    },
  ];

    const servicesOld = [
    {
      serviceId: "establishment",
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
      serviceId: "administrative",
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
      serviceId: "marketing",
      image: marketingImg,
      titleKey: "servicesPage.marketing.title",
      descriptionKey: "servicesPage.marketing.description",
    },
    {
      serviceId: "government",
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
      serviceId: "workspace",
      image: workspaceImg,
      titleKey: "servicesPage.workspace.title",
      descriptionKey: "servicesPage.workspace.description",
    },
    {
      serviceId: "feasibility",
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
      <section
        className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden pb-8 md:pb-12"
        style={{ clipPath: dir === 'rtl' ?  'polygon(0 0, 100% 0, 100% 100%, 0% 60%)': 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)' }}
      >
        <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Professional Image */}
            <div className="lg:order-2">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-accent/30 rounded-lg transform translate-x-4 translate-y-4"></div>
                <div className="relative bg-accent/40 rounded-lg p-2 overflow-hidden" >
                  <img
                    src={professionalPerson}
                    alt="Professional"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={` lg:order-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-cairo font-bold mb-4">
                {t('servicesPage.title')}
              </h1>
              <p className="text-xl font-bold text-accent  md:text-2xl lg:text-3xl font-cairo mb-8 opacity-95">
                {t('servicesPage.subtitle')}
              </p>
              {/* <button className={`${dir === 'rtl' ? 'bg-gradient-to-r': 'bg-gradient-to-l' } from-white/60 to-white/5 hover:from-white/80 hover:to-white/60 text-primary px-5 py-2 rounded-full font-tajwal text-white font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 mx-auto lg:mx-0`}>
                <span>{dir === 'rtl' ? 'تواصل معنا الآن' : 'Contact Us Now'}</span>
                <span className="bg-accent rounded   p-3">
                  {dir === 'rtl' ? <ArrowLeft className="w-5 h-5 text-black" /> : <ArrowRight className="w-5 h-5 text-black" />}
                </span>
              </button> */}
              <button className={`${dir === 'rtl' ? 'bg-gradient-to-r': 'bg-gradient-to-l' } from-white/60 to-white/5 hover:from-white/80 hover:to-white/60 backdrop-blur-sm text-white px-5 py-2 rounded-full font-cairo font-semibold text-lg flex items-center gap-3 transition-all hover:scale-105 mx-auto lg:mx-0`}>
                <span >{dir === 'rtl' ? 'تواصل معنا الآن' : 'Contact Us Now'}</span>
                <span className="bg-accent rounded   p-3">
                  {dir === 'rtl' ? <ArrowLeft className="w-5 h-5 text-black" /> : <ArrowRight className="w-5 h-5 text-black" />}
                </span>
               
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
