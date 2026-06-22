import { AxiosInstance } from "axios";

export async function sendChatbotRequest(
  axiosInstance: AxiosInstance,
  values: {
    name: string;
    phone: string;
    details: string | null;
    service: string[];
  },
) {
  return await axiosInstance.post("/chatbot", values);
}
