import { Clock, Play, Star } from "lucide-react";
import VideoFrame from "./video-frame";
import { getTranslator } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";
import { VideoType } from "@/lib/types/video";

interface VideoItemProps {
  video: VideoType;
  isActive: boolean;
  setActiveVideo: any;
}

export default function VideoItem({
  video,
  isActive,
  setActiveVideo,
}: VideoItemProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  return (
    <button
      onClick={() => setActiveVideo(video)}
      className={`lg:w-full flex flex-col h-full cursor-pointer lg:flex-row lg:gap-4 items-center px-3 lg:px-5 py-4 rounded-2xl lg:border-white lg:bg-white transition-all lg:border-2 group ${
        isActive
          ? "bg-[#efecf2]! border-gray-300! text-gray-800"
          : "hover:bg-gray-100 hover:border-gray-300! text-gray-800"
      }`}
    >
      <div className="relative shrink-0 w-full h-[82px] lg:w-[156px] lg:h-[74px] rounded-lg overflow-hidden bg-gray-900">
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

      <div className="flex-1 mt-4 lg:mt-0 min-w-0">
        <p className="text-xs lg:text-sm lg:text-start lg:font-semibold text-gray-800 leading-snug lg:line-clamp-2">
          {video.title}
        </p>
        <ul className="flex gap-1 py-px items-center">
          <Star className="fill-yellow-500 text-yellow-500" size={12} />
          <Star className="fill-yellow-500 text-yellow-500" size={12} />
          <Star className="fill-yellow-500 text-yellow-500" size={12} />
          <Star className="fill-yellow-500 text-yellow-500" size={12} />
          <Star className="fill-yellow-500 text-yellow-500" size={12} />
        </ul>
        <div className="hidden lg:flex items-center gap-2 mt-1">
          <Clock size={11} className="text-[#8e8e90]" />
          <span className="text-xs text-[#8e8e90]">{video.duration}</span>
          <span className="text-xs text-[#8e8e90]">
            · {isActive ? t("videos.playing.now") : video.speaker}
          </span>
        </div>
      </div>
    </button>
  );
}
