import { getServices } from "@/lib/apis/service";
import { getCountries } from "@/lib/apis/country";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ServicesClient from "./_components/services-client";

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
