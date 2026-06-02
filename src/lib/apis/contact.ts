import { AxiosInstance } from "axios";
import { ContactUsValues } from "../schemas/contact-us.schema";

export async function sendServiceRequest(
  axiosInstance: AxiosInstance,
  values?: ContactUsValues,
) {
  return await axiosInstance.post("/contact-us", values);
}