import { getResidencies } from "@/lib/apis/residency";
import { getCountries } from "@/lib/apis/country";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ResidenciesClient from "./_components/residencies-client";
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
  const title = siteTitle(
    t("residencies.meta.title" as TranslationKey),
    locale,
  );

  return {
    title,
    description: t("residencies.meta.description" as TranslationKey),
    keywords: t("residencies.meta.keywords" as TranslationKey),
    openGraph: {
      title,
      description: t("residencies.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("residencies.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
  };
}

export default async function ResidenciesPage({
  searchParams,
}: {
  searchParams: Promise<{ country_id?: string; page?: string }>;
}) {
  const queryClient = new QueryClient();
  const { country_id, page: pageParam } = await searchParams;

  const countryId = country_id ?? "";
  const page = pageParam ? parseInt(pageParam) : 1;

  const [countries] = await Promise.all([
    getCountries(),
    queryClient.prefetchQuery({
      queryKey: ["residencies", countryId, page],
      queryFn: () =>
        getResidencies({ page, country_id: countryId || undefined }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResidenciesClient countries={countries} />
    </HydrationBoundary>
  );
}
