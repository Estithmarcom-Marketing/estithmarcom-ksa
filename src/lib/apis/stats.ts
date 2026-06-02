import { fetcher } from "../fetch-server";
import { CountryType } from "../types/country";
import { StatsType } from "../types/stats";

export async function getHighlights(): Promise<StatsType[]> {
  const res = await fetcher<any>(`/highlights`, {
    next: {
      revalidate: 60,
      tags: ["highlights"]
    }
  });
  return res.data.highlights;
}
