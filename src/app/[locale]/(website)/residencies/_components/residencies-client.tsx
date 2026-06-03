"use client";

import LoadMoreButton from "@/components/global/load-more-button";
import PagesHero from "@/components/global/pages-hero";
import NoImageHolder from "@/components/global/no-image-holder";
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
import { ResidencyResType, ResidencyType } from "@/lib/types/residency";
import { ChevronLeft, ExternalLink, IdCardLanyard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { getResidenciesClient } from "@/lib/apis/residencyClient";

export default function ResidenciesClient({
  countries,
}: {
  countries: CountryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const axiosInstance = useAxios();

  const countryId = searchParams.get("country_id") ?? "";
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  useEffect(() => {
    const newPage = searchParams.get("page");
    setPage(newPage ? parseInt(newPage) : 1);
  }, [searchParams]);

  const { data, isFetching } = useQuery<ResidencyResType>({
    queryKey: ["residencies", countryId, page],
    queryFn: () =>
      getResidenciesClient(axiosInstance, {
        page,
        country_id: countryId || undefined,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const [mergedResidencies, setMergedResidencies] = useState<ResidencyType[]>([]);

  useEffect(() => {
    if (data?.residencies) {
      if (page === 1) {
        setMergedResidencies(data.residencies);
      } else {
        setMergedResidencies((prev) => {
          const newItems = data.residencies.filter(
            (item) => !prev.some((p) => p.id === item.id),
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [data, page]);

  const pushParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const handleCountryChange = (value: string) => {
    pushParams({ country_id: value, page: "1" });
  };

  const hasNextPage =
    data?.meta && data.meta.current_page < data.meta.last_page;

  const residenciesToDisplay = page === 1 && data?.residencies ? data.residencies : mergedResidencies;

  return (
    <div>
      <PagesHero title={t("residencies.title")} desc={t("residencies.desc")} />
      <div className="container -mt-18! relative z-10">
        <div className="bg-white flex flex-col md:flex-row gap-3 md:justify-between py-10 px-5 sm:px-10 shadow-2xl shadow-primary/10 rounded-lg md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <IdCardLanyard className="text-primary" size={60} />
            <div>
              <h2 className="text-lg mb-2">
                {t("residencies.filterTitle")}
              </h2>
            </div>
          </div>
          <div>
            <Select onValueChange={handleCountryChange} value={countryId}>
              <SelectTrigger
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="w-full bg-secondary text-white! h-10! rounded-sm border-none shadow-none md:w-[200px]"
              >
                <SelectValue
                  placeholder={t("residencies.selectCountry")}
                />
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
          {residenciesToDisplay.length > 0 ? (
            residenciesToDisplay.map((residency) => (
              <div
                key={residency.id}
                className="relative rounded-xl aspect-[366/308] overflow-hidden"
              >
                {residency.image ? (
                  <Image
                    src={residency.image}
                    alt={residency.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <NoImageHolder />
                )}
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
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 text-center py-20">
              <p className="text-lg text-gray-500">
                {t("residencies.noFound")}
              </p>
            </div>
          )}
        </div>
      </section>
      {hasNextPage && (
        <div className="mb-10! flex justify-center">
          <LoadMoreButton
            loading={isFetching}
            onClick={() => setPage((prev) => prev + 1)}
          />
        </div>
      )}
    </div>
  );
}
