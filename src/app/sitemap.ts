import { MetadataRoute } from "next";
import { getBlogsSiteMap } from "@/lib/apis/blog";
import { getServicesSiteMap } from "@/lib/apis/service";
import { getResidenciesSiteMap } from "@/lib/apis/residency";
import { getZones } from "@/lib/apis/zones";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://test.estithmarcom.com";
  const locales = ["ar", "en"];

  const staticPages = ["", "/blog", "/services", "/residencies", "/contact-us"];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    })),
  );

  const [blogs, services, residencies, zones] = await Promise.all([
    getBlogsSiteMap().catch(() => []),
    getServicesSiteMap().catch(() => []),
    getResidenciesSiteMap().catch(() => []),
    getZones().catch(() => []),
  ]);

  const blogEntries = blogs.flatMap((blog) => [
    {
      url: `${baseUrl}/ar/blog/${blog.slug_ar}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/blog/${blog.slug_en}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  const serviceEntries = services.flatMap((service) => [
    {
      url: `${baseUrl}/ar/services/${service.slug_ar}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services/${service.slug_en}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const residencyEntries = residencies.flatMap((residency) => [
    {
      url: `${baseUrl}/ar/residencies/${residency.slug_ar}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/residencies/${residency.slug_en}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const zoneEntries = zones.flatMap((zone) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/free-zones/${zone.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [
    ...staticEntries,
    ...blogEntries,
    ...serviceEntries,
    ...residencyEntries,
    ...zoneEntries,
  ];
}
