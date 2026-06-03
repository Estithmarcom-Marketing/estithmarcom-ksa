import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/apis/blog";
import { getServicesUnpaginated } from "@/lib/apis/service";
import { getResidencies } from "@/lib/apis/residency";
import { getZones } from "@/lib/apis/zones";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "test.marketing.estithmarcom.com";
  const locales = ["ar", "en"];

  const staticPages = ["", "/blog", "/services", "/residencies", "/contact-us"];

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const [blogsRes, services, residenciesRes, zones] = await Promise.all([
    getBlogs({ per_page: 100 }),
    getServicesUnpaginated(),
    getResidencies({ per_page: 100 }),
    getZones(),
  ]);

  const blogEntries = blogsRes.blogs.flatMap((blog) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const serviceEntries = services.flatMap((service) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const residencyEntries = residenciesRes.residencies.flatMap((residency) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/residencies/${residency.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const zoneEntries = zones.flatMap((zone) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/free-zones/${zone.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [
    ...staticEntries,
    ...blogEntries,
    ...serviceEntries,
    ...residencyEntries,
    ...zoneEntries,
  ];
}
