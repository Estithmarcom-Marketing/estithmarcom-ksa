import { getResidencies } from "@/lib/apis/residency";
import { getCountries } from "@/lib/apis/country";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ResidenciesClient from "./_components/residencies-client";

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
      queryFn: () => getResidencies({ page, country_id: countryId || undefined }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ResidenciesClient countries={countries} />
    </HydrationBoundary>
  );
}
