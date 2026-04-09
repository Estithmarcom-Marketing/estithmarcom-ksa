import { Clock, Play } from "lucide-react";
import VideoFrame from "./video-frame";

interface VideoItemProps{
  video: any
  isActive: boolean
  setActiveVideo: any
}

export default function VideoItem({video, isActive, setActiveVideo}: VideoItemProps) {
  return (
    <button
      onClick={() => setActiveVideo(video)}
      className={`w-full cursor-pointer flex items-center gap-4 px-5 py-4 rounded-2xl border-white bg-white transition-all border-2 group ${
        isActive
          ? "bg-[#efecf2]! border-gray-300! text-gray-800"
          : "hover:bg-gray-100 hover:border-gray-300! text-gray-800"
      }`}
    >
      <div className="relative shrink-0 w-[156px] h-[74px] rounded-lg overflow-hidden bg-gray-900">
        <VideoFrame
          src={video.src}
          frameTime={video.frameTime}
          className="absolute inset-0 w-full h-full object-contain"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-colors ${
            isActive ? "bg-black/40" : "bg-black/20 group-hover:bg-black/35"
          }`}
        >
          <Play
            size={16}
            className={`fill-white text-white ${
              isActive ? "opacity-100" : "opacity-70"
            }`}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-start text-gray-800 leading-snug line-clamp-2">
          {video.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Clock size={11} className="text-[#8e8e90]" />
          <span className="text-xs text-[#8e8e90]">{video.duration}</span>
          <span className="text-xs text-[#8e8e90]">
            · {isActive ? "يتم التشغيل الآن" : video.speaker}
          </span>
        </div>
      </div>
    </button>
  );
}
