import { ResidencyResType } from "@/lib/types/residency";
import { AxiosInstance } from "axios";

export async function getResidenciesClient(
  axiosInstance: AxiosInstance,
  params?: {
    page?: number;
    search?: string;
    per_page?: number;
    country_id?: string;
  },
): Promise<ResidencyResType> {
  const response = await axiosInstance.get("/residencies", { params });
  return response.data.data;
}
