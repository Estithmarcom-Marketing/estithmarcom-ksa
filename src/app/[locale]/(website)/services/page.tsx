import { getServices } from "@/lib/apis/service";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import ServicesClient from "./_components/services-client";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const queryClient = new QueryClient();
  const { search, page: pageParam } = await searchParams;

  const searchQuery = search ?? "";
  const page = pageParam ? parseInt(pageParam) : 1;

  const baseFilterParams = searchQuery
    ? `?${new URLSearchParams({ search: searchQuery }).toString()}`
    : null;

  await queryClient.prefetchQuery({
    queryKey: ["services", baseFilterParams, page],
    queryFn: () => getServices({ page, search: searchQuery || undefined }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicesClient />
    </HydrationBoundary>
  );
}
