"use client";

import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import AboutUsSection from "./about-us-section";
import AboutUsServices from "./abous-us-services";
import OurNumbersItem from "@/components/service/our-number-item";
import { StatsType } from "@/lib/types/stats";
import Link from "next/link";

export default function AboutUsClient({ stats }: { stats: StatsType[] }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div>
      <PagesHero
        title={t("aboutUs.hero.title")}
        desc={t("aboutUs.hero.desc")}
      />
      <div className="container">
        <section className=" pt-[70px]! sm:pt-[100px]!">
          <AboutUsSection />
        </section>
        <section className=" pt-[70px]! sm:pt-[100px]!">
          <AboutUsServices />
        </section>
        <section className="py-[50px]! lg:py-[100px]!">
          <div className="px-5 bg-primary rounded-xl py-[30px]! lg:py-[50px]!">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 justify-center">
              {stats.map((el) => (
                <div
                  key={el.id}
                  className="flex flex-col items-center justify-center lg:w-auto"
                >
                  <p className="text-secondary text-[45px] lg:text-[60px] font-bold">
                    {" "}
                    {el.value} +
                  </p>
                  <p className="text-[18px] text-secondary">{el.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
