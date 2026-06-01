"use client";

import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ZoneType } from "@/lib/types/zones";
import Link from "next/link";
import FAQ from "../../../../../../components/global/faq";

export default function FreeZoneDetails({ zone }: { zone: ZoneType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div>
      <div>
        <PagesHero
          title={t("freezoneDetails.hero.title")}
          desc={t("freezoneDetails.hero.desc")}
        />
        <section className="py-[100px]! container">
          <h1 className="font-bold text-2xl">{zone.title}</h1>
          <div className="space-y-4 text-gray-700 mt-4 leading-8">
            <p>
              تعتبر <strong>المناطق الحرة</strong> من أهم المحركات الاقتصادية
              التي تساهم في جذب <em>الاستثمارات الأجنبية</em> وتعزيز حركة
              التجارة والصناعة داخل المنطقة.
            </p>

            <h2 className="text-xl font-semibold">أهم المميزات</h2>

            <ul className="list-disc pr-6 space-y-2">
              <li>إعفاءات جمركية وضريبية مميزة.</li>
              <li>سهولة تأسيس الشركات والإجراءات القانونية.</li>
              <li>بنية تحتية متطورة وخدمات لوجستية متكاملة.</li>
            </ul>

            <p>
              توفر هذه المناطق بيئة استثمارية مرنة تساعد الشركات على
              <strong> التوسع والنمو </strong>
              بشكل أسرع داخل الأسواق الإقليمية والعالمية.
            </p>
          </div>
        </section>
        <section className="pb-[100px]! container">
          <div className="bg-primary py-8 flex flex-col items-center justify-center">
            <h2 className="font-bold text-lg text-white">
              {t("freezoneDetails.cta.title")}
            </h2>
            <p className="my-5 text-sm text-white/80">
              {t("freezoneDetails.cta.desc")}
            </p>
            <Link
              href={`/contact-us`}
              className="bg-secondary font-bold px-5 hover:border-primary block rounded-sm duration-300 text-sm text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
            >
              {t("freezoneDetails.cta.button")}
            </Link>
          </div>
        </section>
        <section className="pb-[100px]! container">
          <FAQ faqs={[]} />
        </section>
      </div>
    </div>
  );
}
