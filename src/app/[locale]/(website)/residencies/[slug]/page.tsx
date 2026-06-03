import { getResidencyDetails } from "@/lib/apis/residency";
import ResidencyDetailsClient from "./_components/residency-details-client";
import { notFound } from "next/navigation";
import { getCountries } from "@/lib/apis/country";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";
import { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const residency = await getResidencyDetails(slug);

  if (!residency) return {};

  const title = siteTitle(residency.meta_title || residency.title, locale);
  const description = residency.meta_description || residency.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [residency.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [residency.image],
    },
  };
}

export default async function residencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [residency, countries] = await Promise.all([
    getResidencyDetails(slug),
    getCountries(),
  ]);

  if(!residency) {
    notFound()
  }

  return <ResidencyDetailsClient residency={residency} countries={countries} />;
}
