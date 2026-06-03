import { AxiosInstance } from "axios";
import { BlogResType } from "../types/blog";

export async function getBlogsClient(
  axiosInstance: AxiosInstance,
  params?: {
    page?: number;
    search?: string;
    per_page?: number;
    category_id?: string;
  }
): Promise<BlogResType> {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append("page", params.page.toString());
  if (params?.search) queryString.append("search", params.search);
  if (params?.per_page)
    queryString.append("per_page", params.per_page.toString());
  if (params?.category_id)
    queryString.append("category_id", params.category_id);

  const res = await axiosInstance.get(`/blogs?${queryString.toString()}`);
  return res.data.data;
}
