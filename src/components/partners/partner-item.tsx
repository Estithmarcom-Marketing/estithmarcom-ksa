import { PartnerType } from "@/lib/types/partner";
import Image from "next/image";

export default function PartnerItem({ partner }: { partner: PartnerType }) {
  return (
    <div className="border rounded-md p-4">
      <div className="aspect-square select-none relative">
        <Image
          src={partner.image}
          fill
          className="shrink-0"
          alt={partner.name}
        ></Image>
      </div>
    </div>
  );
}
