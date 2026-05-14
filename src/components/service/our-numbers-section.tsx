"use client";

import OurNumbersItem from "@/components/service/our-number-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { OurNumbersType } from "@/lib/types/our-numbers";

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
    <section className="py-[50px]! lg:py-[100px]! container w-full lg:flex gap-5">
      <div className="bg-gray-50 p-10 lg:w-4/6 h-full">
        <p className="text-secondary font-bold">{t("ourNumbers.excellence")}</p>
        <p className="text-[24px] lg:text-[40px] font-bold">{t("ourNumbers.why")}</p>
        <p className="text-[15px] lg:text-[17px]">{t("ourNumbers.desc")}</p>
        <div className="flex flex-wrap justify-around items-center  lg:gap-4">
          {ourNumbers.map((el, index) => (
            <>
              <OurNumbersItem key={el.id} ourNumber={el} />
              {index < ourNumbers.length - 1 && (
                <div key={`divider-${el.id}`} className="hidden lg:block h-16 w-px bg-gray-300" />
              )}
            </>
          ))}
        </div>
      </div>
      <div className="bg-primary text-white p-10 rounded-lg lg:w-2/6 flex flex-col justify-center">
        <p className="text-[24px] font-bold">{t("ourNumbers.cta.title")}</p>
        <p className="text-[12px]">{t("ourNumbers.cta.desc")}</p>
        <button className="bg-white block rounded-sm duration-300 text-sm text-center border border-secondary text-black py-3 px-10 mt-4">
          {t("ourNumbers.cta.button")}
        </button>
      </div>
    </section>
  );
}
