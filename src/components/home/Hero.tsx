import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ import your images (keep the exact filenames; if you can, rename "Jordan .jpeg" -> "jordan.jpeg")
import imgEG from "@/assets/home slider/egypt.jpeg";
import imgJO from "@/assets/home slider/Jordan .jpeg";
import imgSA from "@/assets/home slider/ksa.jpeg";
import imgOM1 from "@/assets/home slider/oman1.jpeg";
import imgOM from "@/assets/home slider/oman.jpeg";
import imgAE from "@/assets/home slider/UAE.jpeg";
import imgUK from "@/assets/home slider/UK.jpeg";
import imgUS from "@/assets/home slider/usa.jpeg";
import imgSA1 from "@/assets/home slider/KSA1.jpg";
import imgSA2 from "@/assets/home slider/KSA2.jpg";
import flagSaudi from "@/assets/flags/saudi.png";
import flagUAE from "@/assets/flags/uae.webp";
import flagEgypt from "@/assets/flags/egypt.avif";
import flagJordan from "@/assets/flags/jordan.webp";
import flagOman from "@/assets/flags/oman.webp";
import flagUK from "@/assets/flags/uk.png";
import flagUSA from "@/assets/flags/USA.png";

const AUTOPLAY_MS = 5000;

const HeroSlider = () => {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";

  const slides = useMemo(
    () => [
      { id: "sa", img: imgSA , flag: flagSaudi },
      { id: "ae", img: imgAE , flag: flagUAE },
      { id: "eg", img: imgEG , flag: flagEgypt },
      { id: "jo", img: imgJO , flag: flagJordan },
      { id: "om1", img: imgOM1 , flag: flagOman },
      { id: "om", img: imgOM , flag: flagOman },
      { id: "uk", img: imgUK , flag: flagUK },
      { id: "us", img: imgUS , flag: flagUSA },
      // { id: "sa1", img: imgSA1 },
      // { id: "sa2", img: imgSA2 },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay (pause on hover / when tab hidden)
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      next();
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [index, paused]); // eslint-disable-line

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") (isRTL ? next : prev)();
      if (e.key === "ArrowRight") (isRTL ? prev : next)();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRTL, index]); // rebind for clarity

  // swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (Math.abs(dx) > threshold) {
      // in RTL directions are flipped
      if (dx > 0) {
        isRTL ? next() : prev();
      } else {
        isRTL ? prev() : next();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative h-[600px]  overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      ref={containerRef}
    >
      {/* Slides */}
      <div
        className="absolute inset-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Hero slider"
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={[
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                active ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.img})` }}
              />
              {/* overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/70" /> */}
            </div>
          );
        })}
      </div>

      {/* Content (same text on all slides) */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-start justify-start mt-5 md:mt-1 md:justify-center text-white text-start text-shadow-lg ">
        <div>
          <img src="/logo-light.png" alt="Logo" className="h-12 md:h-16 mb-4 md:mb-6" />
        </div>
        <h2 className=" md:text-5xl lg:text-6xl  font-bold mb-4 md:mb-6 leading-tight text-accent">
          <span className="text-3xl">
            {t("hero.title")}
          </span>
          <br />
          <span className=" text-accent">{t("hero.subtitle")}</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 ">
          {t("hero.description1")}
        </p>
        <p className="text-base md:text-lg font-bold ">
          {t("hero.description2")}
        </p>
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={isRTL ? next : prev}
        className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6 p-2 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur focus:outline-none"
        aria-label={isRTL ? t("hero.next") ?? "Next" : t("hero.prev") ?? "Previous"}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        type="button"
        onClick={isRTL ? prev : next}
        className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 p-2 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur focus:outline-none"
        aria-label={isRTL ? t("hero.prev") ?? "Previous" : t("hero.next") ?? "Next"}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              "h-2 w-2 rounded-full transition-all",
              i === index ? "w-6 bg-white" : "bg-white/50 hover:bg-white/70",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
