import { fetcher } from "../fetch-server";
import { FAQType } from "../types/faq";

export async function getFAQS(): Promise<FAQType[]> {
  const res = await fetcher<any>(`/faqs`, {
    next: {
      revalidate: 60,
      tags: ["faqs"]
    }
  });
  return res.data.faqs;
}
