import { fetcher } from "../fetch-server";
import { CategoryType } from "../types/category";

export async function getCategories(): Promise<CategoryType[]> {
  const res = await fetcher<any>(`/categories/unpaginated`, {
    next: {
      revalidate: 60,
      tags: ["categories"]
    }
  });
  return res.data.categories;
}
