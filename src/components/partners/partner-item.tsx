import { PartnerType } from "@/lib/types/partner";
import Image from "next/image";
import Link from "next/link";

export default function PartnerItem({ partner }: { partner: PartnerType }) {
  return (
    <div className="border rounded-md py-1 px-8">
      <Link href={partner.link} className="aspect-square block select-none relative">
        <Image
          src={partner.image}
          fill
          className="shrink-0"
          alt={partner.alt}
        ></Image>
      </Link>
    </div>
  );
}
