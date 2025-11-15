import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  bgUrl?: string;          // رابط الخلفية
  onCta?: () => void;      // أكشن الزر
  title?: string;          // نص العنوان (اختياري)
  subtitle?: string;       // نص السابتايتل (اختياري)
  cta?: string;            // نص الزر (اختياري)
};

export default function HeroEstithmarSection({
  bgUrl = "/images/hero.jpg",
  onCta,
  title,
  subtitle = "",
  cta,
}: Props) {
  const { t, dir } = useLanguage();

  const displayTitle = title || t('banner.title');
  const displayCta = cta || t('banner.cta');

  return (
    <section dir={dir} className="py-8">
      <div className="container">
        <div className="relative h-[200px] md:h-[200px] lg:h-[200px] overflow-hidden rounded-3xl shadow-xl">
          {/* الخلفية */}
          <img
            src={bgUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />

          {/* أوفرلاي بنفسجي مع شفافـية بسيطة + بلور خفيف */}
          <div className="absolute inset-0 bg-primary/90 backdrop-blur-[1px]" />

          {/* المحتوى */}
          <div className="relative z-10 flex h-full items-center justify-center text-shadow-3xl font-bold">
            <div className="px-4 md:px-8 text-center">
              <h2 className=" font-bold text-white text-xl md:text-2xl lg:text-3xl ">
                <span className="[text-shadow:0_2px_10px_rgba(0,0,0,.35)]">
                  {displayTitle}
                </span>
                {subtitle ? (
                  <>
                    <br />
                    <span className="text-accent [text-shadow:0_3px_18px_rgba(0,0,0,.45)]">
                      {subtitle}
                    </span>
                  </>
                ) : null}
              </h2>

              {/* زر ذهبي */}
              <div className="mt-8">
                <button
                  onClick={onCta}
                  className="inline-flex items-center justify-center rounded-xl bg-gold px-8 py-3 text-lg font-semibold text-white hover:bg-gold-dark transition-colors shadow-md hover:shadow-lg [text-shadow:0_1px_0_rgba(0,0,0,.2)]"
                  aria-label={displayCta}
                >
                  {displayCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
