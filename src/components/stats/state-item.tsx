import { StatsType } from "@/lib/types/stats";
import Image from "next/image";
import NoImageHolder from "../global/no-image-holder";

export default function StateItem({ state }: { state: StatsType }) {
  return (
    <div className="border flex justify-center shadow-2xl bg-[#fafafa] rounded-md py-8">
      <div className="flex items-center gap-8">
        <div className="relative overflow-hidden w-[40px] h-[40px]">
          {state.image ? (
            <Image
              src={state.image}
              alt={state.label}
              fill
              className="object-cover"
            />
          ) : (
            <NoImageHolder noText />
          )}
        </div>
        <div className="flex flex-col items-center">
          <h6 className="font-bold">{state.label}</h6>
          <p className="font-bold text-secondary text-2xl">+{state.value}</p>
        </div>
      </div>
    </div>
  );
}
