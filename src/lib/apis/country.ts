import { fetcher } from "../fetch-server";
import { CountryType } from "../types/country";

export async function getCountries(): Promise<CountryType[]> {
  const res = await fetcher<any>(`/countries/unpaginated`, {
    next: {
      revalidate: 60,
      tags: ["countries"]
    }
  });
  return res.data.countries;
}

export async function getCountriesSlide(): Promise<CountryType[]> {
  const res = await fetcher<any>(`/countries`, {
    next: {
      revalidate: 60,
      tags: ["countries-slide"]
    }
  });
  return res.data.countries;
}
