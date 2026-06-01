import { fetcher } from "../fetch-server";
import { ZoneType } from "../types/zones";

export async function getZones(): Promise<ZoneType[]> {
  const res = await fetcher<any>(`/free-zones`, {
    next: {
      revalidate: 60,
      tags: ["zones"]
    }
  });
  return res.data.zones;
}
