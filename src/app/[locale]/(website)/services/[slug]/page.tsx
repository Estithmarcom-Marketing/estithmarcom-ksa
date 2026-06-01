import { getServiceDetails } from "@/lib/apis/service";
import ServiceDetailsClient from "./_components/service-details-client";
import { notFound } from "next/navigation";

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
