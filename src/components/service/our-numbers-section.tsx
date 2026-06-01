"use client";

import OurNumbersItem from "@/components/service/our-number-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { OurNumbersType } from "@/lib/types/our-numbers";
import Link from "next/link";

export default function OurNumbersSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const ourNumbers: OurNumbersType[] = [
    { id: 2, number: 20,  title: t("ourNumbers.projects") },
    { id: 3, number: 12,  title: t("ourNumbers.experience") },
    { id: 1, number: 500, title: t("ourNumbers.happyClients") },
    { id: 4, number: 30,  title: t("ourNumbers.service") },
  ];

  return (
    <section className="py-[50px]! lg:py-[100px]! container w-full flex flex-col lg:flex-row gap-5">
      <div className="bg-gray-50 p-10 lg:w-4/6 h-full">
        <p className="text-secondary font-bold">{t("ourNumbers.excellence")}</p>
        <p className="text-[24px] lg:text-[40px] font-bold">{t("ourNumbers.why")}</p>
        <p className="text-[15px] lg:text-[17px]">{t("ourNumbers.desc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 mt-10 justify-center">
          {ourNumbers.map((el) => (
            <OurNumbersItem key={el.id} ourNumber={el} />
          ))}
        </div>
      </div>
      <div className="bg-primary flex flex-col gap-4 text-white p-10 rounded-lg lg:w-2/6 justify-center">
        <p className="text-[24px] font-bold">{t("ourNumbers.cta.title")}</p>
        <p className="text-[12px] text-white/70">{t("ourNumbers.cta.desc")}</p>
        <Link href={`/contact-us`} className="bg-white w-fit font-bold block rounded-sm duration-300 text-sm text-center border border-secondary text-black py-3 px-10 mt-4">
          {t("ourNumbers.cta.button")}
        </Link>
      </div>
    </section>
  );
}
