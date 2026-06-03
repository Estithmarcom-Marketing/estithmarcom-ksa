import { getServiceDetails } from "@/lib/apis/service";
import ServiceDetailsClient from "./_components/service-details-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";
import { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getServiceDetails(slug);

  if (!service) return {};

  const title = siteTitle(service.meta_title || service.title, locale);
  const description = service.meta_description || service.short_description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [service.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceDetails(slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <ServiceDetailsClient service={service} />
    </div>
  );
}
