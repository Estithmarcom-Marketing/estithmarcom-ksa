"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Award,
  Leaf,
  Lightbulb,
  Handshake,
  Settings,
} from "lucide-react";
import image1 from "@/assets/abous-us1.png";
import image2 from "@/assets/abous-us2.jpg";
import Image, { StaticImageData } from "next/image";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";

type TabKey = "about" | "vision" | "mission";

interface Tab {
  key: TabKey;
  label: string;
  dotColor: string;
  activeTabBg: string;
}

interface TabContent {
  title: string;
  body: string;
  features: { icon: React.ReactNode; label: string }[];
  imageSrc: StaticImageData;
  imageAlt: string;
}

const TAB_KEYS: TabKey[] = ["about", "vision", "mission"];
const PROGRESS_DURATION = 5000;

const DOT_ACTIVE: Record<TabKey, string> = {
  about: "bg-primary",
  vision: "bg-secondary",
  mission: "bg-blue-600",
};

const FEATURE_COLOR: Record<TabKey, string> = {
  about: "text-primary",
  vision: "text-secondary",
  mission: "text-blue-600",
};

export default function AboutUsSection() {
  const [active, setActive] = useState<TabKey>("about");
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const TABS: Tab[] = [
    {
      key: "about",
      label: t("aboutUs.tabs.about"),
      dotColor: "bg-primary",
      activeTabBg: "bg-white",
    },
    {
      key: "vision",
      label: t("aboutUs.tabs.vision"),
      dotColor: "bg-secondary",
      activeTabBg: "bg-white",
    },
    {
      key: "mission",
      label: t("aboutUs.tabs.mission"),
      dotColor: "bg-blue-600",
      activeTabBg: "bg-white",
    },
  ];

  const CONTENT: Record<TabKey, TabContent> = {
    about: {
      title: t("aboutUs.content.about.title"),
      body: t("aboutUs.content.about.body"),
      features: [
        { icon: <Users size={16} />, label: t("aboutUs.content.about.feature1") },
        { icon: <Award size={16} />, label: t("aboutUs.content.about.feature2") },
      ],
      imageSrc: image2,
      imageAlt: t("aboutUs.content.about.imageAlt"),
    },
    vision: {
      title: t("aboutUs.content.vision.title"),
      body: t("aboutUs.content.vision.body"),
      features: [
        { icon: <Leaf size={16} />, label: t("aboutUs.content.vision.feature1") },
        {
          icon: <Lightbulb size={16} />,
          label: t("aboutUs.content.vision.feature2"),
        },
      ],
      imageSrc: image1,
      imageAlt: t("aboutUs.content.vision.imageAlt"),
    },
    mission: {
      title: t("aboutUs.content.mission.title"),
      body: t("aboutUs.content.mission.body"),
      features: [
        {
          icon: <Handshake size={16} />,
          label: t("aboutUs.content.mission.feature1"),
        },
        {
          icon: <Settings size={16} />,
          label: t("aboutUs.content.mission.feature2"),
        },
      ],
      imageSrc: image1,
      imageAlt: t("aboutUs.content.mission.imageAlt"),
    },
  };

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    startTimeRef.current = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressRef.current!);
        setActive((prev) => {
          const idx = TAB_KEYS.indexOf(prev);
          return TAB_KEYS[(idx + 1) % TAB_KEYS.length];
        });
      }
    }, 30);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [active]);

  const handleTabClick = (key: TabKey) => {
    if (key === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(key);
      setAnimating(false);
    }, 200);
  };

  const content = CONTENT[active];

  return (
    <section className="w-full">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-md bg-[#f0f0f5]">
        <div className="flex flex-col justify-between p-6 sm:p-8 py-10! lg:py-20! gap-6">
          <div className="flex flex-wrap justify-center items-center gap-1 bg-[#e4e4ee] rounded-full p-1 w-fit">
            {TABS.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={[
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-white shadow-sm text-gray-800"
                      : "text-gray-500 hover:text-gray-700",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300",
                      isActive ? DOT_ACTIVE[tab.key] : "bg-gray-400",
                    ].join(" ")}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            className={[
              "bg-white rounded-2xl p-6 flex flex-col gap-4 transition-opacity duration-200",
              animating ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            <h2 className="text-2xl font-bold text-gray-900 border-s-4 border-primary ps-3">
              {content.title}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              {content.body}
            </p>

            <div className="flex flex-wrap gap-4 mt-1">
              {content.features.map((f) => (
                <span
                  key={f.label}
                  className={[
                    "flex items-center gap-1.5 text-sm font-semibold",
                    FEATURE_COLOR[active],
                  ].join(" ")}
                >
                  {f.icon}
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          <div className="h-1 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative">
          {content.imageSrc ? (
            <div className="aspect-[615/615] relative">
              <Image
                src={content.imageSrc.src}
                alt={content.imageAlt}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">{content.imageAlt}</span>
            </div>
          )}

          <div className="absolute start-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={[
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                  key === active ? DOT_ACTIVE[active] : "bg-white/50",
                ].join(" ")}
                aria-label={key}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

