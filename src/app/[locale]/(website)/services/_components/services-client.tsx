"use client";

import PagesHero from "@/components/global/pages-hero";
import OurNumbersSection from "@/components/service/our-numbers-section";
import ServiceItem from "@/components/service/service-item";
import LoadMoreButton from "@/components/global/load-more-button";
import SearchInput from "@/components/global/search-input";
import CustomLoader from "@/components/global/custom-loader";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { ServiceType, ServiceResType } from "@/lib/types/service";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { getServicesClient } from "@/lib/apis/serivceClient";
import { CountryType } from "@/lib/types/country";
import banner from "@/assets/services-banner.webp"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsType } from "@/lib/types/stats";

export default function ServicesClient({
  stats,
  countries,
}: {
  stats: StatsType[]
  countries: CountryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const axiosInstance = useAxios();

  const searchQuery = searchParams.get("search") ?? "";
  const countryId = searchParams.get("country_id") ?? "";
  const pageParam = searchParams.get("page");
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  useEffect(() => {
    setLocalSearchInput(searchQuery);
    const newPage = searchParams.get("page");
    setPage(newPage ? parseInt(newPage) : 1);
  }, [searchQuery, searchParams]);

  const baseFilterParams = useMemo(() => {
    if (!searchQuery && !countryId) return null;
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (countryId) params.append("country_id", countryId);
    return `?${params.toString()}`;
  }, [searchQuery, countryId]);

  const { data, isFetching } = useQuery<ServiceResType>({
    queryKey: ["services", baseFilterParams, page],
    queryFn: () =>
      getServicesClient(axiosInstance, {
        page,
        search: searchQuery || undefined,
        country_id: countryId || undefined,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const [mergedServices, setMergedServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    if (data?.services) {
      if (page === 1) {
        setMergedServices(data.services);
      } else {
        setMergedServices((prev) => {
          const newItems = data.services.filter(
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

  const handleSearchSubmit = () => {
    pushParams({ search: localSearchInput.trim() || undefined, page: "1" });
  };

  const handleCountryChange = (value: string) => {
    pushParams({ country_id: value === "all" ? undefined : value, page: "1" });
  };

  const hasNextPage =
    data?.meta && data.meta.current_page < data.meta.last_page;

  const servicesToDisplay =
    page === 1 && data?.services ? data.services : mergedServices;

  return (
    <>
      <PagesHero title={t("services")} desc={t("servicesPage.desc")} banner={banner} />

      <div className="container">
        <section className="pt-[70px] sm:pt-[100px] flex flex-col md:flex-row justify-between gap-5">
          <div className="w-full md:w-[200px]">
            <Select onValueChange={handleCountryChange} value={countryId || "all"}>
              <SelectTrigger
                aria-label={locale === "ar" ? "اختر الدولة" : "Select country"}
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="w-full bg-secondary text-white! h-10! rounded-sm border-none shadow-none md:w-[200px]"
              >
                <SelectValue
                  placeholder={
                    locale === "ar" ? "اختر الدولة" : "Select country"
                  }
                />
              </SelectTrigger>
              <SelectContent dir={locale === "ar" ? "rtl" : "ltr"}>
                <SelectItem value="all">
                  {locale === "ar" ? "جميع الدول" : "All Countries"}
                </SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={String(country.id)}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full lg:w-1/3">
            <SearchInput
              entityName={t("service.entity")}
              value={localSearchInput}
              onChange={(e) => setLocalSearchInput(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
        </section>

        <section className="pb-[30px]! mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {servicesToDisplay.length > 0 ? (
            servicesToDisplay.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-20">
              <p className="text-lg text-gray-500">{t("services.noFound")}</p>
            </div>
          )}
        </section>

        {hasNextPage && (
          <div className="pb-[30px] flex justify-center">
            <LoadMoreButton
              loading={isFetching}
              onClick={() => setPage((prev) => prev + 1)}
            />
          </div>
        )}
      </div>

      <OurNumbersSection stats={stats} />
    </>
  );
}
