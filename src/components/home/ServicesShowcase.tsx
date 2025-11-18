import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import service images
import legalImg from "../../assets/homepage services/legal.png";
import adminImg from "../../assets/homepage services/admin.png";
import consultImg from "../../assets/homepage services/consult.png";
import techImg from "../../assets/homepage services/tech.png";
import marketingImg from "../../assets/homepage services/marketing.png";
import licensesImg from "../../assets/homepage services/licenses.png";

type ServiceItem = {
  titleKey: string;
  image: string;
  href?: string;
};

type Props = {
  headingKey?: string;
  subheadingKey?: string;
  items?: ServiceItem[];
};

export default function ServicesShowcase({
  headingKey = "showcase.heading",
  subheadingKey = "showcase.subheading",
  items = [
    { titleKey: "showcase.service.legal", image: legalImg },
    { titleKey: "showcase.service.admin", image: adminImg },
    { titleKey: "showcase.service.consult", image: consultImg },
    { titleKey: "showcase.service.tech", image: techImg },
    { titleKey: "showcase.service.marketing", image: marketingImg },
    { titleKey: "showcase.service.licenses", image: licensesImg },
  ],
}: Props) {
  const { t, dir , language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <section dir={dir} className="py-10 md:py-14">
      <div className="container">
        {/* العناوين */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className=" font-extrabold text-3xl md:text-4xl text-foreground">
            {t(headingKey)}
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
            {t(subheadingKey)}
          </p>
        </div>

        {/* الشبكة */}
        <div className="flex gap-3 overflow-x-auto md:overflow-hidden scrollbar-hide snap-x snap-mandatory md:snap-none">
          {items.map((it, idx) => (
            <a
              key={idx}
              href={it.href ?? "#"}
              className="group relative block flex-shrink-0 overflow-hidden rounded-2xl bg-muted/20 shadow-md hover:shadow-lg transition-all w-[280px] lg:w-auto md:flex-1 snap-center h-80 duration-500"
            >
              {/* الصورة */}
              <img
                src={it.image}
                alt={t(it.titleKey)}
                className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* أوفرلاي جراديانت ذهبي من الأسفل */}
              {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/85 via-gold/45 to-transparent opacity-95" /> */}

              {/* النص + الآيكون */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="flex items-center justify-between gap-3 text-white">
                  <div className="flex items-center gap-2">
                    <span className={` ${isRTL ? "" : "hidden"} inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white/80 bg-white/10 backdrop-blur-[1px]`}>
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                    <span className="font-semibold [text-shadow:0_2px_8px_rgba(0,0,0,.35)]">
                      {t(it.titleKey)}
                    </span>
                    <span className={` ${isRTL ? "hidden" : ""}  inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white/80 bg-white/10 backdrop-blur-[1px]`} >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* زوايا ناعمة عند الهوفر */}
              <span className="absolute inset-0 rounded-2xl ring-1 ring-black/0 group-hover:ring-black/5 transition" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
