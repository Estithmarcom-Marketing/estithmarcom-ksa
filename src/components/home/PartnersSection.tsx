import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

// Import partner logos
import esharLogo from "@/assets/partners/eshar.png";
import itfaqLogo from "@/assets/partners/itfaq.png";
import lozoomCarLogo from "@/assets/partners/lozoom-car.png";
import ramky1Logo from "@/assets/partners/ramky-1.png";
import ramkyLogo from "@/assets/partners/ramky.png";
import rayanLogo from "@/assets/partners/rayan.png";
import sparkleLogo from "@/assets/partners/sparkle.png";
import tamkeenLogo from "@/assets/partners/tamkeen.png";
import weLogo from "@/assets/partners/we.png";

const PartnersSection = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const partners = [
    { name: "Eshar", logo: esharLogo },
    { name: "Itfaq", logo: itfaqLogo },
    { name: "Lozoom Car", logo: lozoomCarLogo },
    { name: "Ramky", logo: ramkyLogo },
    { name: "Ramky 1", logo: ramky1Logo },
    { name: "Rayan", logo: rayanLogo },
    { name: "Sparkle", logo: sparkleLogo },
    { name: "Tamkeen", logo: tamkeenLogo },
    { name: "We", logo: weLogo }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      direction: isRTL ? 'rtl' : 'ltr'
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl  font-bold text-primary text-center ">
          {t('partners.title')}
        </h2>

        <div className="overflow-hidden" ref={emblaRef} dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex ">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-[0_0_200px] md:flex-[0_0_280px] lg:flex-[0_0_220px]"
              >
                <div className="bg-white  transition-transform  duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
