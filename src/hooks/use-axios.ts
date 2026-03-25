"use client";

import axios, { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function useAxios() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split("/")[1] || "ar";

  const instance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        "Accept-Language": locale,
      },
      withCredentials: true,
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {

        if (!(config.data instanceof FormData)) {
          config.headers["Content-Type"] = "application/json";
          config.headers["Accept"] = "application/json";
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [locale, router]);

  return instance;
}