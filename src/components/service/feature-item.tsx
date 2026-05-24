import { ServiceFeatureType } from "@/lib/types/service";
import { Rocket } from "lucide-react";

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
          <Rocket className="text-primary" />
        </div>
        <h2 className="mt-2 font-bold mb-4">{feature.title}</h2>
        <p className="text-sm text-[#666]">{feature.description}</p>
      </div>
    </div>
  );
}
