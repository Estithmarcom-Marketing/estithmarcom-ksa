import { ZoneType } from "@/lib/types/zones";
import FreeZoneDetails from "./_components/free-zone-details";
import zone_image from "@/assets/zone_image.png";
import { getZoneDetails } from "@/lib/apis/zones";
import { notFound } from "next/navigation";

export default async function FreeZoneDetailsPage({params}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = await getZoneDetails(slug)
  if(!zone){
    notFound()
  }
  return (
    <div>
      <FreeZoneDetails zone={zone} />
    </div>
  );
}
