import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesIntro from "@/components/ServicesIntro";
import ServicesGrid from "@/components/ServicesGrid";
import VideoSection from "@/components/VideoSection";
import ProcessSteps from "@/components/ProcessSteps";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-cairo" dir="rtl">
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