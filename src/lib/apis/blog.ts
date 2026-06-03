import { fetcher } from "../fetch-server";
import { BlogResType, BlogType } from "../types/blog";

export async function getBlogsHome(): Promise<BlogType[]> {
  const res = await fetcher<any>(`/blogs`, {
    next: {
      tags: ["blogs-home"],
      revalidate: 60,
    },
  });
  return res.data.blogs;
}

export async function getBlogs(params?: {
  page?: number;
  search?: string;
  per_page?: number;
  category_id?: string;
}): Promise<BlogResType> {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append("page", params.page.toString());
  if (params?.search) queryString.append("search", params.search);
  if (params?.per_page)
    queryString.append("per_page", params.per_page.toString());
  if (params?.category_id)
    queryString.append("category_id", params.category_id);

  const res = await fetcher<any>(`/blogs?${queryString.toString()}`, {
    next: {
      tags: ["blogs"],
      revalidate: 60,
    },
  });
  return res.data;
}

export async function getBlogDetails(slug: string): Promise<BlogType | null> {
  try {
    const res = await fetcher<any>(`/blogs/${slug}`, {
      next: {
        tags: [`blog-${slug}`],
        revalidate: 60,
      },
    });
    return res.data.blog;
  } catch (error) {
    return null;
  }
}
