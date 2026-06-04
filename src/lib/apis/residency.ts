import { fetcher } from "../fetch-server";
import { ResidencyResType, ResidencySiteMapType, ResidencyType } from "../types/residency";

export async function getResidencies(params?: {
  page?: number;
  search?: string;
  per_page?: number;
  country_id?: string;
}): Promise<ResidencyResType> {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append("page", params.page.toString());
  if (params?.search) queryString.append("search", params.search);
  if (params?.per_page)
    queryString.append("per_page", params.per_page.toString());
  if (params?.country_id)
    queryString.append("country_id", params.country_id);

  const res = await fetcher<any>(`/residencies?${queryString.toString()}`, {
    next: {
      tags: ["residencies"],
      revalidate: 60,
    },
  });
  return res.data;
}

export async function getResidencyDetails(slug: string): Promise<ResidencyType | null> {
  try {
    const res = await fetcher<any>(`/residencies/${slug}`, {
      next: {
        tags: [`residency-${slug}`],
        revalidate: 60,
      },
    });
    return res.data.residency;
  } catch (error) {
    return null;
  }
}

export async function getResidenciesSiteMap(): Promise<ResidencySiteMapType[]> {
  const res = await fetcher<any>(`/residencies/site-map`, {
    next: {
      revalidate: 60,
      tags: ["residencies-site-map"]
    }
  });
  return res.data.residencies;
}
