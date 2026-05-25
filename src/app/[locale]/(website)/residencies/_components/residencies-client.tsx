"use client";

import LoadMoreButton from "@/components/global/load-more-button";
import PagesHero from "@/components/global/pages-hero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { CountryType } from "@/lib/types/country";
import { ResidencyType } from "@/lib/types/residency";
import { ChevronLeft, ExternalLink, IdCardLanyard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResidenciesClient({
  residencies,
}: {
  residencies: ResidencyType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const countries: CountryType[] = [
    {
      id: 1,
      name: "السعودية",
    },
    {
      id: 2,
      name: "الأردن",
    },
    {
      id: 3,
      name: "مصر",
    },
  ];
  return (
    <div>
      <PagesHero title={t("residencies.title")} desc={t("residencies.desc")} />
      <div className="container -mt-18! relative z-10">
        <div className="bg-white flex flex-col md:flex-row gap-3 md:justify-between py-10 px-5 sm:px-10 shadow-2xl shadow-primary/10 rounded-lg md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <IdCardLanyard className="text-primary" size={60} />
            <div>
              <h2 className="text-lg mb-2">
                يمكنك اختيار منتج الإقامة المميزة الأنسب لك وتعرّف على الخيارات
                المناسبة
              </h2>
            </div>
          </div>
          <div>
            <Select>
              <SelectTrigger
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="w-full bg-secondary text-white! h-10! rounded-sm border-none shadow-none md:w-[200px]"
              >
                <SelectValue placeholder="اختر الدولة اولا..." />
              </SelectTrigger>
              <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={String(country.id)}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <section className="container py-10!">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {residencies.map((residency) => (
            <div
              key={residency.id}
              className="relative rounded-xl aspect-square overflow-hidden"
            >
              <Image
                src={residency.image}
                alt={residency.title}
                fill
                className="object-cover"
              />
              <h1
                className={`absolute text-center top-1/2 z-1 -translate-y-1/2 text-lg font-bold start-1/2 bg-opacity-75 text-white p-4 ${locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"}`}
              >
                {residency.title}
              </h1>
              <div className="absolute start-0 top-0 w-full h-full bg-primary/85"></div>
              <div className="bg-secondary z-1 text-white w-full flex items-center justify-between absolute bottom-0 p-4 text-xs">
                <Link
                  href={`/residencies/${residency.slug}`}
                  className="flex hover:underline items-center gap-2"
                >
                  {t("details")}
                  <ExternalLink size={15} />
                </Link>
                <Link
                  href={`/residencies/${residency.slug}#residencyForm`}
                  className="flex hover:underline items-center gap-2"
                >
                  {t("residency.order")}
                  <ChevronLeft className={`ltr:rotate-180`} size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mb-10! flex justify-center">
        <LoadMoreButton />
      </div>
    </div>
  );
}
