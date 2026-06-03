"use client";

import PagesHero from "@/components/global/pages-hero";
import BlogItem from "@/components/blog/blog-item";
import LoadMoreButton from "@/components/global/load-more-button";
import SearchInput from "@/components/global/search-input";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { BlogType, BlogResType } from "@/lib/types/blog";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useAxios from "@/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";
import { getBlogsClient } from "@/lib/apis/blogClient";
import { CategoryType } from "@/lib/types/category";
import BlogSidebar from "@/components/blog/blog-sidebar";

export default function BlogClient({
  categories,
}: {
  categories: CategoryType[];
}) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const axiosInstance = useAxios();

  const searchQuery = searchParams.get("search") ?? "";
  const categoryId = searchParams.get("category_id") ?? "";
  const pageParam = searchParams.get("page");
  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  useEffect(() => {
    setLocalSearchInput(searchQuery);
    const newPage = searchParams.get("page");
    setPage(newPage ? parseInt(newPage) : 1);
  }, [searchQuery, searchParams]);

  const baseFilterParams = useMemo(() => {
    if (!searchQuery && !categoryId) return null;
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (categoryId) params.append("category_id", categoryId);
    return `?${params.toString()}`;
  }, [searchQuery, categoryId]);

  const { data, isFetching } = useQuery<BlogResType>({
    queryKey: ["blogs", baseFilterParams, page],
    queryFn: () =>
      getBlogsClient(axiosInstance, {
        page,
        search: searchQuery || undefined,
        category_id: categoryId || undefined,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const [mergedBlogs, setMergedBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    if (data?.blogs) {
      if (page === 1) {
        setMergedBlogs(data.blogs);
      } else {
        setMergedBlogs((prev) => {
          const newItems = data.blogs.filter(
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

  const blogsToDisplay = page === 1 && data?.blogs ? data.blogs : mergedBlogs;

  return (
    <>
      <PagesHero title={t("blog")} desc={t("blogpage.desc")} />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10 py-[70px]! sm:py-[100px]">
          <div className="w-full lg:w-2/3">
            <div className="space-y-8">
              {blogsToDisplay.length > 0 ? (
                blogsToDisplay.map((blog) => (
                  <BlogItem key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-gray-500">{t("blog.noFound")}</p>
                </div>
              )}
            </div>

            {hasNextPage && (
              <div className="mt-10 flex justify-center">
                <LoadMoreButton
                  loading={isFetching}
                  onClick={() => setPage((prev) => prev + 1)}
                />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="mb-8">
              <SearchInput
                value={localSearchInput}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                onSubmit={handleSearchSubmit}
              />
            </div>
            <BlogSidebar
              activeCategory={categoryId ? parseInt(categoryId) : 0}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </>
  );
}
