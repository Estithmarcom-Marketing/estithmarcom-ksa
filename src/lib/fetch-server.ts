import "server-only";
import { cookies } from "next/headers";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL!;

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {},
): Promise<T> {
  const { method = "GET", body, headers: customHeaders, cache, next } = options;

  const cookieStore = await cookies();

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language":
        cookieStore.get("estismarkom_lang")?.value === "en" ? "en" : "ar",
      ...customHeaders,
    },
  });
  return res.json();
}