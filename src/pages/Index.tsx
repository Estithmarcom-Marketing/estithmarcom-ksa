import Header from "@/components/shared/Header";
import Hero from "@/components/home/Hero";
import ServicesIntro from "@/components/home/ServicesIntro";
import ServicesGrid from "@/components/home/ServicesGrid";
import VideoSection from "@/components/home/VideoSection";
import ProcessSteps from "@/components/home/ProcessSteps";
import PartnersSection from "@/components/home/PartnersSection";
import StatsSection from "@/components/home/StatsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/shared/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { dir } = useLanguage();
  
  return (
    <div className="min-h-screen font-cairo" dir={dir}>
      <Header />
      <Hero />
      <ServicesIntro />
      <ServicesGrid />
      <VideoSection />
      <ProcessSteps />
      <PartnersSection />
      <StatsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;