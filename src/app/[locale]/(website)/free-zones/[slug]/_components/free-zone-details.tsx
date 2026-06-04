"use client";

import PagesHero from "@/components/global/pages-hero";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ZoneType } from "@/lib/types/zones";
import Link from "next/link";
import FAQ from "../../../../../../components/global/faq";
import RichTextViewer from "@/components/global/rich-text-viewer";

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
        <section className="py-[70px]! sm:py-[100px]! container">
          <h1 className="font-bold text-2xl">{zone.title}</h1>
          <div className="mt-4">
            <RichTextViewer content={zone.content} />
          </div>
        </section>
        <section className="pb-[70px]! sm:pb-[100px]! container">
          <div className="bg-primary py-8 px-4 flex flex-col rounded-xl items-center justify-center">
            <h2 className="font-bold text-lg text-white">
              {t("freezoneDetails.cta.title")}
            </h2>
            <p className="my-5 text-sm text-center sm:text-start text-white/80">
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
