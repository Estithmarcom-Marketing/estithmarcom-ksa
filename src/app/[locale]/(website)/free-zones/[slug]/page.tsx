import { ZoneType } from "@/lib/types/zones";
import FreeZoneDetails from "./_components/free-zone-details";
import zone_image from "@/assets/zone_image.png";

export default function FreeZoneDetailsPage() {
  const zone: ZoneType = {
    id: 1,
    image: zone_image,
    title: "المناطق الحرة المملكة الاردنية الهاشمية",
  };
  return (
    <div>
      <FreeZoneDetails zone={zone} />
    </div>
  );
}
