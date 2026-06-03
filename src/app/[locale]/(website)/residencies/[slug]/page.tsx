import { getResidencyDetails } from "@/lib/apis/residency";
import ResidencyDetailsClient from "./_components/residency-details-client";
import { notFound } from "next/navigation";
import { getCountries } from "@/lib/apis/country";

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
