import { getBlogs } from "@/lib/apis/blog";
import { getCategories } from "@/lib/apis/category";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BlogClient from "./_components/blog-client";
import { CategoryType } from "@/lib/types/category";
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
  const title = siteTitle(t("blogs.meta.title" as TranslationKey), locale);

  return {
    title,
    description: t("blogs.meta.description" as TranslationKey),
    keywords: t("blogs.meta.keywords" as TranslationKey),
    openGraph: {
      title,
      description: t("blogs.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("blogs.meta.description" as TranslationKey),
      images: ["/og-image.png"],
    },
  };
}

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

  const [categories] = await Promise.all([
    getCategories(),
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


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient categories={categories} />
    </HydrationBoundary>
  );
}
