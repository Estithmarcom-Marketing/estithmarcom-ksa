import { getServices } from "@/lib/apis/service";
import { getCountries } from "@/lib/apis/country";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ServicesClient from "./_components/services-client";
import { getTranslator, Locale, TranslationKey } from "@/lib/i18n";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslator(locale);
  const title = siteTitle(t("services.meta.title" as TranslationKey), locale);

  return {
    title,
    description: t("services.meta.description" as TranslationKey),
    keywords: t("services.meta.keywords" as TranslationKey),
    openGraph: {
      title,
      description: t("services.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("services.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
  };
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; country_id?: string }>;
}) {
  const queryClient = new QueryClient();
  const { search, page: pageParam, country_id } = await searchParams;

  const searchQuery = search ?? "";
  const page = pageParam ? parseInt(pageParam) : 1;
  const countryId = country_id ?? "";

  const baseFilterParams =
    searchQuery || countryId
      ? `?${new URLSearchParams({
          ...(searchQuery && { search: searchQuery }),
          ...(countryId && { country_id: countryId }),
        }).toString()}`
      : null;

  const [countries] = await Promise.all([
    getCountries(),
    queryClient.prefetchQuery({
      queryKey: ["services", baseFilterParams, page],
      queryFn: () =>
        getServices({
          page,
          search: searchQuery || undefined,
          country_id: countryId || undefined,
        }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicesClient countries={countries} />
    </HydrationBoundary>
  );
}
