import { AxiosInstance } from "axios";
import { NewsletterValues } from "../schemas/newsletter.schema";

export async function sendSubscribe(
  axiosInstance: AxiosInstance,
  values?: NewsletterValues
) {
  return await axiosInstance.post("/subscriptions", values);
}