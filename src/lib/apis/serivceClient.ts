import { ServiceResType } from "@/lib/types/service";
import { AxiosInstance } from "axios";

export async function getServicesClient(
  axiosInstance: AxiosInstance,
  params?: {
    page?: number;
    search?: string;
    per_page?: number;
  },
): Promise<ServiceResType> {
  const response = await axiosInstance.get("/services", { params });
  return response.data.data;
}
