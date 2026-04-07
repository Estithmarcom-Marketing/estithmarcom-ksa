import { StatsType } from "@/lib/types/stats";
import { Rocket } from "lucide-react";

export default function StateItem({state}: {state: StatsType}){
  return(
    <div className="border flex justify-center bg-[#fafafa] rounded-md py-8">
      <div className="flex items-center gap-8">
        <Rocket size={40} />
        <div className="flex flex-col items-center">
          <h6 className="font-bold">{state.title}</h6>
          <p className="font-bold text-secondary text-2xl">+{state.count}</p>
        </div>
      </div>
    </div>
  )
}