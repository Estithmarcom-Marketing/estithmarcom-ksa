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

export default function ServicesClient() {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const axiosInstance = useAxios();

  const searchQuery = searchParams.get("search") ?? "";
  const pageParam = searchParams.get("page");
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  useEffect(() => {
    setLocalSearchInput(searchQuery);
    const newPage = searchParams.get("page");
    setPage(newPage ? parseInt(newPage) : 1);
  }, [searchQuery, searchParams]);

  const baseFilterParams = useMemo(() => {
    if (!searchQuery) return null;
    const params = new URLSearchParams();
    params.append("search", searchQuery);
    return `?${params.toString()}`;
  }, [searchQuery]);

  const { data, isFetching } = useQuery<ServiceResType>({
    queryKey: ["services", baseFilterParams, page],
    queryFn: () =>
      getServicesClient(axiosInstance, {
        page,
        search: searchQuery || undefined,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 mins
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

  const hasNextPage =
    data?.meta && data.meta.current_page < data.meta.last_page;

  const servicesToDisplay =
    page === 1 && data?.services ? data.services : mergedServices;

  return (
    <>
      <PagesHero title={t("services")} desc={t("servicesPage.desc")} />

      <div className="container">
        <section className="pt-[70px] sm:pt-[100px] flex justify-end gap-10">
          <div className="w-full lg:w-1/3">
            <SearchInput
              value={localSearchInput}
              onChange={(e) => setLocalSearchInput(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
        </section>

        <section className="pb-[70px] mt-10 sm:pb-[100px] grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          <div className="pb-[70px] sm:pb-[100px] flex justify-center">
            <LoadMoreButton
              loading={isFetching}
              onClick={() => setPage((prev) => prev + 1)}
            />
          </div>
        )}
      </div>

      <OurNumbersSection />
    </>
  );
}
