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

export async function getZoneDetails(slug: string): Promise<ZoneType | null> {
  try {
    const res = await fetcher<any>(`/free-zones/${slug}`, {
      next: {
        tags: [`free-zone-${slug}`],
        revalidate: 60,
      },
    });
    return res.data.zone;
  } catch (error) {
    return null;
  }
}
