import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ContactServiceCard from "@/components/contact/ContactServiceCard";
import ContactForm from "@/components/contact/ContactForm";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-cityscape.jpg";
import { Network, Users, Briefcase, HeartHandshake, Calculator, TrendingUp } from "lucide-react";
import administrativeImg from "@/assets/services/administrative.jpg";
import marketingImg from "@/assets/services/marketing.jpg";
import governmentImg from "@/assets/services/government.jpg";
import workspaceImg from "@/assets/services/workspace.jpg";
import feasibilityImg from "@/assets/services/feasibility.jpg";
import establishmentImg from "@/assets/services/establishment.jpg";

const Contact = () => {
  const { t, dir, language } = useLanguage();
  const isRTL = language === 'ar';

  const services = [
    {
      icon: Network,
      titleKey: "contactPage.service1.title",
      descriptionKey: "contactPage.service1.description",
      color: "bg-purple-600"
    },
    {
      icon: Users,
      titleKey: "contactPage.service2.title",
      descriptionKey: "contactPage.service2.description",
      color: "bg-blue-600"
    },
    {
      icon: Briefcase,
      titleKey: "contactPage.service3.title",
      descriptionKey: "contactPage.service3.description",
      color: "bg-indigo-600"
    },
    {
      icon: HeartHandshake,
      titleKey: "contactPage.service4.title",
      descriptionKey: "contactPage.service4.description",
      color: "bg-red-600"
    },
    {
      icon: Calculator,
      titleKey: "contactPage.service5.title",
      descriptionKey: "contactPage.service5.description",
      color: "bg-green-600"
    },
    {
      icon: TrendingUp,
      titleKey: "contactPage.service6.title",
      descriptionKey: "contactPage.service6.description",
      color: "bg-cyan-600"
    }
  ];

  const servicesImages = [
    { image: administrativeImg, label: language === 'ar' ? 'استشارات الأعمال' : 'Business Consulting' },
    { image: marketingImg, label: language === 'ar' ? 'التسويق' : 'Marketing' },
    { image: governmentImg, label: language === 'ar' ? 'الخدمات الحكومية' : 'Government Services' },
    { image: workspaceImg, label: language === 'ar' ? 'مساحات العمل' : 'Workspaces' },
    { image: feasibilityImg, label: language === 'ar' ? 'دراسات الجدوى' : 'Feasibility Studies' },
    { image: establishmentImg, label: language === 'ar' ? 'التأسيس' : 'Establishment' },
  ];

  const roles = [
    { number: 1, key: 'contactPage.role1' },
    { number: 2, key: 'contactPage.role2' },
    { number: 3, key: 'contactPage.role3' },
    { number: 4, key: 'contactPage.role4' },
    { number: 5, key: 'contactPage.role5' },
    { number: 6, key: 'contactPage.role6' },
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cairo font-bold mb-4">
            {t('contactPage.hero.title')}
          </h1>
          <p className="text-lg md:text-xl font-cairo opacity-95">
            {t('contactPage.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Cards Section */}
      {/* <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary mb-4">
              {t('contactPage.services.title')}
            </h2>
            <p className="text-base md:text-lg font-cairo text-foreground/80 max-w-3xl mx-auto">
              {t('contactPage.services.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ContactServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-purple-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-cairo font-bold text-white mb-6">
            {t('contactPage.cta.title')}
          </h2>
          <button className="bg-accent hover:bg-accent/90 text-primary font-cairo font-bold px-8 py-3 rounded-full text-lg transition-all hover:scale-105">
            {t('contactPage.cta.button')}
          </button>
        </div>
      </section> */}

      {/* Services Grid with Images */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary text-center mb-4">
            {t('contactPage.servicesGrid.title')}
          </h2>
          <p className="text-base md:text-lg font-cairo text-foreground/80 text-center max-w-3xl mx-auto mb-8 md:mb-12">
            {t('contactPage.servicesGrid.description')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {servicesImages.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/20 flex items-end p-4">
                  <p className="font-cairo font-bold text-white text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-purple-900 to-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white text-center mb-8 md:mb-12">
            {t('contactPage.contactForm.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      {/* <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary text-center mb-8 md:mb-12">
            {t('contactPage.roles.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {roles.map((role) => (
              <div 
                key={role.number}
                className="flex gap-4 items-start bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl font-cairo font-bold text-primary">{role.number}</span>
                </div>
                <p className={`text-foreground font-cairo leading-relaxed pt-2 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(role.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Partners Section */}
      {/* <PartnersSection /> */}

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Contact;
