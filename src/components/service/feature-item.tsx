import { ServiceFeatureType } from "@/lib/types/service";
import { Rocket } from "lucide-react";
import Image from "next/image";
import NoImageHolder from "../global/no-image-holder";

export default function FeatureItem({
  feature,
}: {
  feature: ServiceFeatureType;
}) {
  return (
    <div
      key={feature.id}
      className="rounded-xl bg-white flex flex-col justify-between duration-300 p-5"
    >
      <div>
        <div className="p-2 bg-primary/10 w-fit rounded-lg">
          <div className="relative overflow-hidden w-[24px] h-[24px]">
            {feature.image ? (
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
              />
            ) : (
              <NoImageHolder noText noBg />
            )}
          </div>
        </div>
        <h2 className="mt-2 font-bold mb-4">{feature.title}</h2>
        <p className="text-sm text-[#666]">{feature.description}</p>
      </div>
    </div>
  );
}
