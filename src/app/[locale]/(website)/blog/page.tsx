import { getBlogs } from "@/lib/apis/blog";
import { getCategories } from "@/lib/apis/category";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BlogClient from "./_components/blog-client";
import { CategoryType } from "@/lib/types/category";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; category_id?: string }>;
}) {
  const queryClient = new QueryClient();
  const { search, page: pageParam, category_id } = await searchParams;

  const searchQuery = search ?? "";
  const page = pageParam ? parseInt(pageParam) : 1;
  const categoryId = category_id ?? "";

  const baseFilterParams =
    searchQuery || categoryId
      ? `?${new URLSearchParams({
          ...(searchQuery && { search: searchQuery }),
          ...(categoryId && { category_id: categoryId }),
        }).toString()}`
      : null;

  const [] = await Promise.all([
    // getCategories(),
    queryClient.prefetchQuery({
      queryKey: ["blogs", baseFilterParams, page],
      queryFn: () =>
        getBlogs({
          page,
          search: searchQuery || undefined,
          category_id: categoryId || undefined,
        }),
    }),
  ]);

  const categories: CategoryType[] = []

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient categories={categories} />
    </HydrationBoundary>
  );
}
