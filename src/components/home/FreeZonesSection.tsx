import { useState } from "react";

// أعلام / معالم الدول
import saudiImage from "@/assets/flags/saudi.png";
import uaeImage from "@/assets/flags/uae.webp";
import jordanImage from "@/assets/flags/jordan.webp";
import omanImage from "@/assets/flags/oman.webp";
import egyptImage from "@/assets/flags/egypt.avif";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";


type FreeZoneCountry = {
    id: string;
    image: string;
};

const FREE_ZONES: FreeZoneCountry[] = [
    { id: "saudi", image: saudiImage },
    { id: "uae", image: uaeImage },
    { id: "jordan", image: jordanImage },
    { id: "oman", image: omanImage },
    { id: "egypt", image: egyptImage },
];

// Helper to get the number of points for each country
const COUNTRY_POINTS_COUNT: Record<string, number> = {
    saudi: 7,
    uae: 9,
    jordan: 9,
    oman: 9,
    egypt: 9,
};

const FreeZonesSection = () => {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const [activeId, setActiveId] = useState<string>("saudi");
    const activeCountry = FREE_ZONES.find((country) => country.id === activeId) ?? FREE_ZONES[0];

    // Get points for the active country
    const getCountryPoints = (countryId: string): string[] => {
        const count = COUNTRY_POINTS_COUNT[countryId] || 0;
        const points: string[] = [];
        for (let i = 1; i <= count; i++) {
            points.push(t(`freeZones.countries.${countryId}.point${i}`));
        }
        return points;
    };

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            direction:  isRTL ? "rtl" : "ltr",
            align: "start",
            containScroll: "trimSnaps",
        },
        [
            Autoplay({
                delay: 1500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );



    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 via-white to-white text-black">
            <div className="container mx-auto px-4" dir="rtl">
                {/* الهيدر */}
                <div className="mb-8 md:mb-10 text-center md:text-right max-w-3xl mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1 mb-3 border border-primary/10">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs md:text-sm font-medium ">
                            {t('freeZones.badge')}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold  mb-2 leading-relaxed">
                        {t('freeZones.title')}
                    </h3>
                    <p className="text-sm md:text-base ">
                        {t('freeZones.description')}
                    </p>
                </div>

                {/* كروت الدول + التفاصيل */}
                <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,3fr)] items-start">
                    {/* كروت الدول */}
                    {/* كروت الدول - موبايل: سلايدر */}
                    <div className="md:hidden w-full overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4">
                            {FREE_ZONES.map((country) => {
                                const isActive = activeId === country.id;
                                return (
                                    <button
                                        key={country.id}
                                        type="button"
                                        onClick={() => setActiveId(country.id)}
                                        className={`group relative overflow-hidden mx-2 rounded-2xl border transition-all duration-200 flex-shrink-0 w-40 xs:w-44 bg-white/80 backdrop-blur-sm ${isActive
                                            ? "border-primary ring-2 ring-primary/70 shadow-lg shadow-primary/20"
                                            : "border-slate-200/70 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
                                            }`}
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <img
                                                src={country.image}
                                                alt={t(`freeZones.countries.${country.id}.name`)}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                                            <div className="absolute bottom-2 right-2 left-2 flex justify-between items-end gap-2">
                                                <span className="text-[11px] text-white/90 font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                                    {t(`freeZones.countries.${country.id}.name`)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex flex-col gap-1 text-right">
                                            <span className="text-[11px] /80 font-medium">
                                                {t(`freeZones.countries.${country.id}.label`)}
                                            </span>
                                            {/* <span className="text-sm font-semibold ">
                                                {t(`freeZones.countries.${country.id}.name`)}
                                            </span> */}
                                            {/* {isActive && (
                                                <span className="text-[11px]  font-medium">
                                                    {t('freeZones.viewDetails')}
                                                </span>
                                            )} */}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* كروت الدول - ديسكتوب: grid زي ما هي */}
                    <div className="hidden md:grid grid-cols-3 gap-6">
                        {FREE_ZONES.map((country) => {
                            const isActive = activeId === country.id;
                            return (
                                <button
                                    key={country.id}
                                    type="button"
                                    onClick={() => setActiveId(country.id)}
                                    className={`group relative overflow-hidden rounded-2xl  border transition-all duration-200 flex flex-col bg-white/80 backdrop-blur-sm ${isActive
                                        ? "border-primary ring-2 ring-primary/70 shadow-lg shadow-primary/20"
                                        : "border-slate-200/70 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
                                        }`}
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <img
                                            src={country.image}
                                            alt={t(`freeZones.countries.${country.id}.name`)}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                                        <div className="absolute bottom-2 right-2 left-2 flex justify-between items-end gap-2">
                                            <span className="text-[11px] md:text-xs text-white/90 font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                                {t(`freeZones.countries.${country.id}.name`)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col gap-1 text-right">
                                        <span className="text-[11px] md:text-xs /80 font-medium">
                                            {t(`freeZones.countries.${country.id}.label`)}
                                        </span>
                                        <span className="text-sm md:text-base font-semibold ">
                                            {t(`freeZones.countries.${country.id}.name`)}
                                        </span>
                                        {isActive && (
                                            <span className="text-[11px]  font-medium">
                                                {t('freeZones.viewDetails')}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>


                    {/* تفاصيل الدولة المختارة */}
                    <article className="bg-white/90 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-5 md:p-7 max-h-[520px] overflow-y-auto">
                        <header className="mb-4 flex items-start gap-3">
                            <div className="hidden md:block">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                    <img
                                        src={activeCountry.image}
                                        alt={t(`freeZones.countries.${activeCountry.id}.name`)}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg md:text-xl font-bold  mb-1">
                                    {t(`freeZones.countries.${activeCountry.id}.label`)}
                                </h4>
                                <p className="text-sm md:text-base ">
                                    {t(`freeZones.countries.${activeCountry.id}.intro`)}
                                </p>
                            </div>
                        </header>

                        <ul className="list-decimal pr-5 space-y-2.5 text-sm md:text-base  leading-relaxed">
                            {getCountryPoints(activeCountry.id).map((point: string, index: number) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>

                        <p className="mt-4 text-sm md:text-base ">
                            {t(`freeZones.countries.${activeCountry.id}.outro`)}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default FreeZonesSection;
