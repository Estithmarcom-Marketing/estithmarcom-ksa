import { ResidencyResType } from "@/lib/types/residency";
import { AxiosInstance } from "axios";
import { ResidencyFormValues } from "../schemas/residency-form.schema";

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

export async function sendResidencyRequest(
  axiosInstance: AxiosInstance,
  values?: ResidencyFormValues,
) {
  return await axiosInstance.post("/residencies", values);
}
