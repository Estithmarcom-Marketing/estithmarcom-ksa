import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      textKey: "aboutPage.testimonial1.text",
      nameKey: "aboutPage.testimonial1.name",
      roleKey: "aboutPage.testimonial1.role",
      color: "border-green-500"
    },
    {
      textKey: "aboutPage.testimonial2.text",
      nameKey: "aboutPage.testimonial2.name",
      roleKey: "aboutPage.testimonial2.role",
      color: "border-purple-500"
    },
    {
      textKey: "aboutPage.testimonial3.text",
      nameKey: "aboutPage.testimonial3.name",
      roleKey: "aboutPage.testimonial3.role",
      color: "border-blue-500"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl   font-bold   mb-4">
            {t('aboutPage.testimonials.title')}
          </h2>
          <p className="text-base md:text-lg   text-foreground/80 max-w-2xl mx-auto">
            {t('aboutPage.testimonials.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 shadow-lg transition-all duration-300 border-t-4 ${testimonial.color} ${
                  index === activeIndex ? 'scale-105 shadow-xl' : 'opacity-70'
                }`}
              >
                <Quote className="w-10 h-10 text-accent mb-4" />
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className={`  text-foreground/80 mb-6 leading-relaxed text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(testimonial.textKey)}
                </p>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white   font-bold">
                    {t(testimonial.nameKey).charAt(0)}
                  </div>
                  <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="  font-bold  ">{t(testimonial.nameKey)}</p>
                    <p className="  text-sm text-foreground/60">{t(testimonial.roleKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-accent w-8' : 'bg-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
