"use client";

import { useState } from "react";
import SpecialHeader from "@/components/global/special-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Share2, Star, User } from "lucide-react";
import InlinePlayer from "@/components/video/video-player";
import Autoplay from "embla-carousel-autoplay";
import VideoItem from "@/components/video/video-item";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { VideoType } from "@/lib/types/video";

export default function VideosSection() {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const videos: VideoType[] = [
    {
      id: 1,
      title: t("videos.1.title"),
      duration: "2:15",
      speaker: t("videos.1.speaker"),
      role: t("videos.1.role"),
      src: "/videos/sequence-1.mp4",
      frameTime: 3.2,
      description: t("videos.1.description"),
    },
    {
      id: 2,
      title: t("videos.2.title"),
      duration: "1:15",
      speaker: t("videos.2.speaker"),
      role: t("videos.2.role"),
      src: "/videos/sequence-2.mp4",
      frameTime: 5.7,
      description: t("videos.2.description"),
    },
    {
      id: 3,
      title: t("videos.3.title"),
      duration: "2:15",
      speaker: t("videos.3.speaker"),
      role: t("videos.3.role"),
      src: "/videos/sequence-3.mp4",
      frameTime: 2.1,
      description: t("videos.3.description"),
    },
    {
      id: 4,
      title: t("videos.4.title"),
      duration: "3:00",
      speaker: t("videos.4.speaker"),
      role: t("videos.4.role"),
      src: "/videos/sequence-4.mp4",
      frameTime: 8.4,
      description: t("videos.4.description"),
    },
    {
      id: 5,
      title: t("videos.5.title"),
      duration: "1:45",
      speaker: t("videos.5.speaker"),
      role: t("videos.5.role"),
      src: "/videos/sequence-5.mp4",
      frameTime: 4.9,
      description: t("videos.5.description"),
    },
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="py-[60px]">
      <div className="container mx-auto px-4">
        <SpecialHeader
          header={t("videos.section.header")}
          desc={t("videos.section.desc")}
        />

        <div className="mt-15" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
          {/* Main Player */}
          <div className="flex-1 flex flex-col gap-4">
            <InlinePlayer key={activeVideo.id} video={activeVideo} />

            <div className="bg-white lg:mt-0 -mt-[17px] lg:rounded-2xl p-5 border border-gray-100">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-100 hidden lg:flex items-center justify-center shrink-0">
                    <User size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {activeVideo.speaker}
                    </p>
                    <ul className="flex gap-1 py-px items-center">
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                    </ul>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeVideo.role}
                    </p>
                    <p className="mt-4 hidden lg:block text-sm text-gray-600 leading-relaxed">
                      {activeVideo.description}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline cursor-pointer mt-1">
                  <Share2 size={14} />
                  <span>{t("videos.share")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="flex flex-col overflow-hidden">
            <div className="hidden lg:flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">
                {t("videos.playlist.label")}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {t("videos.playlist.count")}
              </span>
            </div>
            <p className="lg:hidden text-center mb-4">{t("videos.latest")}</p>

            {/* Desktop: vertical carousel */}
            <Carousel
              orientation="vertical"
              plugins={[Autoplay({ delay: 3000 })]}
              opts={{ align: "start", dragFree: true }}
              className="flex-1 px-0 hidden lg:block"
            >
              <div className="flex items-center justify-center gap-3 pb-1">
                <CarouselPrevious className="static translate-y-0 translate-x-0" />
              </div>
              <CarouselContent style={{ maxHeight: 380 }}>
                {videos.map((video) => {
                  const isActive = video.id === activeVideo.id;
                  return (
                    <CarouselItem key={video.id}>
                      <VideoItem
                        video={video}
                        isActive={isActive}
                        setActiveVideo={setActiveVideo}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="flex items-center justify-center gap-3 pt-1">
                <CarouselNext className="static translate-y-0 translate-x-0" />
              </div>
            </Carousel>

            {/* Mobile: horizontal carousel */}
            <Carousel
              orientation="horizontal"
              plugins={[Autoplay({ delay: 3000 })]}
              opts={{ align: "start", dragFree: true }}
              className="flex-1 px-0 block lg:hidden"
            >
              <CarouselContent>
                {videos.map((video) => {
                  const isActive = video.id === activeVideo.id;
                  return (
                    <CarouselItem className="basis-1/3 pl-2" key={video.id}>
                      <VideoItem
                        video={video}
                        isActive={isActive}
                        setActiveVideo={setActiveVideo}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
