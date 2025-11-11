import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import TabSection from "@/components/about/TabSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import StatsSection from "@/components/about/StatsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-cityscape.jpg";

const About = () => {
  const { t, dir } = useLanguage();

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
            {t('aboutPage.hero.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-cairo opacity-95">
            {t('aboutPage.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Tab Section */}
      <TabSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Stats */}
      <StatsSection />

      <Footer />
    </div>
  );
};

export default About;
