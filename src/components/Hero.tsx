import heroImage from "@/assets/hero-cityscape.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-cairo font-bold mb-6 leading-tight">
          حاضنة ومسرعة الأعمال
          <br />
          <span className="text-accent">استثماركوم</span>
        </h2>
        <p className="text-xl md:text-2xl font-cairo mb-4 opacity-95">
          نقدم خدمات مبتكرة لدعم ريادة الأعمال
        </p>
        <p className="text-lg font-cairo opacity-90">
          ونوفر خدمات تصمم على المسار الصحيح
        </p>
      </div>
    </section>
  );
};

export default Hero;