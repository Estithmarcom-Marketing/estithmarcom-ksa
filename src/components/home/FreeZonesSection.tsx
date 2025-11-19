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
    name: string;
    label: string;
    image: string;
    intro: string;
    points: string[];
    outro: string;
};

const FREE_ZONES: FreeZoneCountry[] = [
    {
        id: "saudi",
        name: "المملكة العربية السعودية",
        label: "مميزات المناطق الحرة في السعودية",
        image: saudiImage,
        intro:
            "تتميز المناطق الحرة في السعودية بعدة مميزات تجعلها جذابة للاستثمار والتجارة، منها:",
        points: [
            "الإعفاءات الضريبية: توفر المناطق الحرة إعفاءات ضريبية على الأرباح، مما يساعد الشركات على زيادة عائداتها.",
            "سهولة الإجراءات: تتمتع المناطق الحرة بإجراءات سريعة ومبسطة لتأسيس الأعمال، مما يسهل دخول المستثمرين.",
            "البنية التحتية المتطورة: توفر المناطق الحرة بنية تحتية متقدمة تشمل المواصلات، المرافق اللوجستية، والمخازن.",
            "الوصول إلى الأسواق العالمية: تقع العديد من المناطق الحرة بالقرب من الموانئ والمطارات، مما يسهل الوصول إلى الأسواق الدولية.",
            "تنوع الأنشطة الاقتصادية: تدعم المناطق الحرة مجموعة متنوعة من الأنشطة، مثل التصنيع، التجارة، والخدمات اللوجستية.",
            "العمالة: غالبًا ما تكون هناك مرونة في استقدام العمالة، مما يتيح للشركات توظيف الكفاءات المطلوبة بسهولة.",
            "التعاون مع الحكومة: تسعى الحكومة السعودية إلى تعزيز التنمية في هذه المناطق، مما يؤدي إلى دعم أفضل للمستثمرين.",
        ],
        outro:
            "تعتبر هذه المميزات من العوامل الرئيسية التي تشجع الشركات المحلية والدولية على الاستثمار في المناطق الحرة السعودية.",
    },
    {
        id: "uae",
        name: "الإمارات العربية المتحدة",
        label: "مميزات المناطق الحرة في الإمارات العربية المتحدة",
        image: uaeImage,
        intro:
            "تتميز المناطق الحرة في الإمارات العربية المتحدة بعدة مميزات تجعلها وجهة مفضلة للمستثمرين ورجال الأعمال، منها:",
        points: [
            "الإعفاءات الضريبية: تقدم المناطق الحرة إعفاءات من ضريبة الشركات وضريبة الدخل لفترات طويلة، مما يعزز الربحية.",
            "الملكية الكاملة: يسمح للمستثمرين بامتلاك 100% من شركاتهم دون الحاجة إلى شريك محلي، وهو ما يعد ميزة كبيرة.",
            "سهولة تأسيس الأعمال: تتمتع المناطق الحرة بإجراءات مرنة وسريعة لتسجيل الشركات، مما يسهل عملية الدخول إلى السوق.",
            "البنية التحتية المتطورة: توفر الإمارات بنية تحتية متقدمة تشمل المرافق اللوجستية، الموانئ، والمطارات، مما يسهل حركة البضائع.",
            "التنوع الاقتصادي: تدعم المناطق الحرة مجموعة واسعة من الأنشطة الاقتصادية، مثل التجارة، التصنيع، والخدمات.",
            "الوصول إلى الأسواق العالمية: تتيح المواقع الاستراتيجية للمناطق الحرة الوصول السريع إلى الأسواق الإقليمية والدولية.",
            "عدم القيود على تحويل الأموال: يمكن للمستثمرين تحويل الأرباح إلى بلدانهم بدون قيود، مما يعزز من جاذبية الاستثمار.",
            "العمالة المرنة: تسهل المناطق الحرة إجراءات استقدام العمالة، مما يتيح للشركات توظيف الكفاءات اللازمة.",
            "الابتكار والتكنولوجيا: تشجع بعض المناطق الحرة على الابتكار وتستضيف شركات التكنولوجيا الناشئة، مما يعزز من بيئة الأعمال.",
        ],
        outro:
            "تسهم هذه المميزات في جعل الإمارات واحدة من الوجهات الرائدة للاستثمار في المنطقة.",
    },
    {
        id: "jordan",
        name: "المملكة الأردنية الهاشمية",
        label: "مميزات المناطق الحرة في المملكة الأردنية الهاشمية",
        image: jordanImage,
        intro:
            "تتميز المناطق الحرة في المملكة الأردنية الهاشمية عدة مميزات تجعلها جذابة للاستثمار والتجارة، ومنها:",
        points: [
            "الإعفاءات الضريبية: تقدم المناطق الحرة إعفاءات من الضرائب على الأرباح، مما يساعد الشركات على زيادة ربحيتها.",
            "تسهيلات استثمارية: توفر تسهيلات في إجراءات تسجيل الشركات وتأسيسها، مما يسهل دخول المستثمرين الجدد.",
            "الملكية الكاملة: يسمح للمستثمرين بامتلاك 100% من الشركات دون الحاجة إلى شريك محلي، مما يعزز من جاذبية الاستثمار.",
            "البنية التحتية المتطورة: تتوفر في المناطق الحرة بنية تحتية حديثة تشمل المرافق اللوجستية، الموانئ، والمطارات، مما يسهل حركة السلع.",
            "الوصول إلى الأسواق الإقليمية: توفر المناطق الحرة فرص وصول سهلة إلى الأسواق الإقليمية والدولية، مما يعزز من فرص التصدير.",
            "تنوع الأنشطة الاقتصادية: تدعم المناطق الحرة مجموعة متنوعة من الأنشطة، بما في ذلك الصناعة، التجارة، والخدمات.",
            "عدم القيود على تحويل الأموال: يمكن للمستثمرين تحويل الأرباح إلى الخارج دون قيود، مما يعزز من جاذبية الاستثمار.",
            "العمالة: توفر المناطق الحرة مرونة في استقدام العمالة، مما يسهل على الشركات توظيف الكفاءات المطلوبة.",
            "الاستقرار السياسي والاقتصادي: يعتبر الاستقرار السياسي والاقتصادي في الأردن عاملاً إيجابياً لجذب الاستثمارات.",
        ],
        outro:
            "تسهم هذه المميزات في جعل المناطق الحرة في الأردن وجهة مفضلة للمستثمرين من مختلف القطاعات.",
    },
    {
        id: "oman",
        name: "سلطنة عُمان",
        label: "مميزات المناطق الحرة في سلطنة عُمان",
        image: omanImage,
        intro:
            "تتميز المناطق الحرة في سلطنة عُمان بعدة مميزات تجعلها جذابة للاستثمار، ومنها:",
        points: [
            "الإعفاءات الضريبية: تقدم المناطق الحرة إعفاءات من الضرائب على الأرباح لفترات معينة، مما يساعد في زيادة ربحية الشركات.",
            "الملكية الكاملة: يسمح للمستثمرين الأجانب بامتلاك 100% من الشركات في المناطق الحرة، مما يعزز من جاذبية الاستثمار.",
            "تسهيلات في الإجراءات: توفر المناطق الحرة إجراءات سريعة ومبسطة لتأسيس الشركات، مما يسهل دخول المستثمرين في السوق.",
            "البنية التحتية المتطورة: تتمتع سلطنة عُمان ببنية تحتية حديثة تشمل الموانئ والمطارات والطرق، مما يسهل حركة التجارة.",
            "الوصول إلى الأسواق الإقليمية والدولية: توفر المناطق الحرة فرص وصول سهلة إلى الأسواق في منطقة الخليج والأسواق العالمية.",
            "تنوع الأنشطة الاقتصادية: تدعم المناطق الحرة مجموعة متنوعة من الأنشطة مثل التصنيع، التجارة، والخدمات اللوجستية.",
            "عدم القيود على تحويل الأموال: يمكن للمستثمرين تحويل الأرباح إلى الخارج بدون قيود، مما يعزز من جاذبية الاستثمار.",
            "توفير العمالة: تسهل المناطق الحرة استقدام العمالة، مما يتيح للشركات توظيف الكفاءات المطلوبة بشكل مرن.",
            "الاستقرار السياسي والاقتصادي: تعتبر سلطنة عُمان وجهة مستقرة سياسيًا واقتصاديًا، مما يعزز من ثقة المستثمرين.",
        ],
        outro:
            "تسهم هذه المميزات في جعل المناطق الحرة في سلطنة عُمان وجهة مفضلة للمستثمرين من مختلف القطاعات.",
    },
    {
        id: "egypt",
        name: "جمهورية مصر العربية",
        label: "مميزات المناطق الحرة في جمهورية مصر العربية",
        image: egyptImage,
        intro:
            "تتميز المناطق الحرة في جمهورية مصر العربية بعدة مميزات تجعلها جذابة للاستثمار، ومنها:",
        points: [
            "الإعفاءات الضريبية: تقدم المناطق الحرة إعفاءات ضريبية على الأرباح لمدة تصل إلى 10 سنوات، مما يزيد من جاذبية الاستثمار.",
            "الملكية الكاملة: يُسمح للمستثمرين الأجانب بامتلاك 100% من الشركات دون الحاجة إلى شريك محلي، مما يعزز من فرص الاستثمار.",
            "تسهيلات إجرائية: توفر المناطق الحرة إجراءات سريعة ومبسطة لتأسيس الشركات، مما يسهّل عملية الدخول إلى السوق.",
            "البنية التحتية المتطورة: تتمتع مصر ببنية تحتية حديثة تشمل الموانئ والمطارات، مما يسهل حركة البضائع والسلع.",
            "الوصول إلى الأسواق الإقليمية والدولية: توفر المواقع الاستراتيجية للمناطق الحرة فرص وصول سهلة إلى الأسواق في منطقة الشرق الأوسط وأفريقيا.",
            "دعم الحكومة: تسعى الحكومة المصرية إلى تعزيز الاستثمارات في المناطق الحرة من خلال تقديم حوافز ودعم للمستثمرين.",
            "تنوع الأنشطة الاقتصادية: تدعم المناطق الحرة مجموعة متنوعة من الأنشطة، مثل الصناعة، التجارة، والخدمات اللوجستية.",
            "عدم القيود على تحويل الأموال: يمكن للمستثمرين تحويل الأرباح إلى الخارج بسهولة، مما يعزز من جاذبية البيئة الاستثمارية.",
            "توفير العمالة: تسهل المناطق الحرة استقدام العمالة، مما يتيح للشركات توظيف الكفاءات المطلوبة.",
        ],
        outro:
            "تسهم هذه المميزات في جعل المناطق الحرة في مصر وجهة مفضلة للمستثمرين من مختلف القطاعات الاقتصادية.",
    },
];

const FreeZonesSection = () => {
    const { t, language } = useLanguage();
    const isRTL = language === 'ar';
    const [activeId, setActiveId] = useState<string>("saudi");
    const activeCountry =
        FREE_ZONES.find((country) => country.id === activeId) ?? FREE_ZONES[0];

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
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 via-white to-white">
            <div className="container mx-auto px-4" dir="rtl">
                {/* الهيدر */}
                <div className="mb-8 md:mb-10 text-center md:text-right max-w-3xl mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1 mb-3 border border-primary/10">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs md:text-sm font-medium text-primary">
                            المناطق الحرة في الدول العربية
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2 leading-relaxed">
                        نقدّم خدمات داعمة واستشارية للشركات لتقديم حلول وتسهيل الخدمات
                        وإنجازها بشكل كامل
                    </h3>
                    <p className="text-sm md:text-base text-slate-600">
                        نساعد الشركات على الاستفادة من الفرص المتاحة في المناطق الحرة
                        بمختلف الدول من خلال حلول متكاملة وخبرة عملية.
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
                                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 flex-shrink-0 w-40 xs:w-44 bg-white/80 backdrop-blur-sm ${isActive
                                            ? "border-primary ring-2 ring-primary/70 shadow-lg shadow-primary/20"
                                            : "border-slate-200/70 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
                                            }`}
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <img
                                                src={country.image}
                                                alt={country.name}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                                            <div className="absolute bottom-2 right-2 left-2 flex justify-between items-end gap-2">
                                                <span className="text-[11px] text-white/90 font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                                    {country.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex flex-col gap-1 text-right">
                                            <span className="text-[11px] text-primary/80 font-medium">
                                                {country.label}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {country.name}
                                            </span>
                                            {isActive && (
                                                <span className="text-[11px] text-primary font-medium">
                                                    عرض التفاصيل
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* كروت الدول - ديسكتوب: grid زي ما هي */}
                    <div className="hidden md:grid grid-cols-3 gap-4">
                        {FREE_ZONES.map((country) => {
                            const isActive = activeId === country.id;
                            return (
                                <button
                                    key={country.id}
                                    type="button"
                                    onClick={() => setActiveId(country.id)}
                                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 flex flex-col bg-white/80 backdrop-blur-sm ${isActive
                                        ? "border-primary ring-2 ring-primary/70 shadow-lg shadow-primary/20"
                                        : "border-slate-200/70 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
                                        }`}
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <img
                                            src={country.image}
                                            alt={country.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                                        <div className="absolute bottom-2 right-2 left-2 flex justify-between items-end gap-2">
                                            <span className="text-[11px] md:text-xs text-white/90 font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                                                {country.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col gap-1 text-right">
                                        <span className="text-[11px] md:text-xs text-primary/80 font-medium">
                                            {country.label}
                                        </span>
                                        <span className="text-sm md:text-base font-semibold text-slate-900">
                                            {country.name}
                                        </span>
                                        {isActive && (
                                            <span className="text-[11px] text-primary font-medium">
                                                عرض التفاصيل
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
                                        alt={activeCountry.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg md:text-xl font-bold text-primary mb-1">
                                    {activeCountry.label}
                                </h4>
                                <p className="text-sm md:text-base text-slate-700">
                                    {activeCountry.intro}
                                </p>
                            </div>
                        </header>

                        <ul className="list-decimal pr-5 space-y-2.5 text-sm md:text-base text-slate-800 leading-relaxed">
                            {activeCountry.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>

                        <p className="mt-4 text-sm md:text-base text-slate-700">
                            {activeCountry.outro}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default FreeZonesSection;
