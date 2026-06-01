import { AxiosInstance } from "axios";

export async function sendSubscribe(
  axiosInstance: AxiosInstance,
  values?: any
) {
  return await axiosInstance.post("/subscriptions", values);
}