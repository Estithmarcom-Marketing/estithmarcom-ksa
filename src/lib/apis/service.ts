import { fetcher } from "../fetch-server";
import { ServiceResType, ServiceType } from "../types/service";

export async function getServicesHome(): Promise<ServiceType[]> {
  const res = await fetcher<any>(`/services?per_page=6`, {
    next: {
      tags: ["services-home"],
      revalidate: 60,
    },
  });
  return res.data.services;
}

export async function getServices(params?: {
  page?: number;
  search?: string;
  per_page?: number;
  country_id?: string;
}): Promise<ServiceResType> {
  const queryString = new URLSearchParams();
  if (params?.page) queryString.append("page", params.page.toString());
  if (params?.search) queryString.append("search", params.search);
  if (params?.per_page)
    queryString.append("per_page", params.per_page.toString());
  if (params?.country_id)
    queryString.append("country_id", params.country_id);

  const res = await fetcher<any>(`/services?${queryString.toString()}`, {
    next: {
      tags: ["services"],
      revalidate: 60,
    },
  });
  return res.data;
}

export async function getServicesUnpaginated(): Promise<ServiceType[]> {
  const res = await fetcher<any>(`/services`, {
    next: {
      tags: ["services-unpaginated"],
      revalidate: 60,
    },
  });
  return res.data.services;
}

export async function getServiceDetails(slug: string): Promise<ServiceType | null> {
  try {
    const res = await fetcher<any>(`/services/${slug}`, {
      next: {
        tags: [`service-${slug}`],
        revalidate: 60,
      },
    });
    return res.data.service;
  } catch (error) {
    return null;
  }
}
