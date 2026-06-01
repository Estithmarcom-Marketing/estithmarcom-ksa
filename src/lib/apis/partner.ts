import { fetcher } from "../fetch-server";
import { PartnerType } from "../types/partner";

export async function getPartners(): Promise<PartnerType[]> {
  const res = await fetcher<any>(`/clients`, {
    next: {
      revalidate: 60,
      tags: ["partners"]
    }
  });
  return res.data.clients;
}
