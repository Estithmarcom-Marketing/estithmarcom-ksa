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
import { Play, Share2, Clock, User } from "lucide-react";
import Image from "next/image";

const videos = [
  {
    id: 1,
    title: "رحلة النجاح: من فكرة بسيطة لشركة عالمية",
    duration: "2:15",
    speaker: "هاني القحطاني",
    role: "مؤسس حاضنة ومسرعة الأعمال استثماركوم",
    thumbnail: "https://picsum.photos/seed/biz1/800/450",
    description:
      "في هذا اللقاء يستعرض رائد الأعمال خارطة الطريق التي اتبعها لتوسيع أعماله مع التركيز على أهمية الابتكار المستمر والتكيف مع متغيرات السوق السعودي المتسارع.",
  },
  {
    id: 2,
    title: "القيادة في زمن الأزمات: دروس من الميدان",
    duration: "1:15",
    speaker: "فهد المطيري",
    role: "الرئيس التنفيذي لمجموعة رؤية",
    thumbnail: "https://picsum.photos/seed/biz2/800/450",
    description:
      "يشارك فهد المطيري تجربته في قيادة فرق العمل خلال فترات الضغط الشديد، وكيف تحولت التحديات إلى فرص نمو حقيقية لمؤسسته.",
  },
  {
    id: 3,
    title: "التسويق الرقمي: استراتيجيات تضاعف مبيعاتك",
    duration: "2:15",
    speaker: "سارة العمري",
    role: "مديرة التسويق في منصة نون",
    thumbnail: "https://picsum.photos/seed/biz3/800/450",
    description:
      "تكشف سارة العمري عن الأسرار خلف أنجح حملات التسويق الرقمي في السوق الخليجي، وكيف يمكن لأي مشروع ناشئ مضاعفة مبيعاته خلال 90 يوماً.",
  },
  {
    id: 4,
    title: "الاستثمار الذكي: كيف تختار فرصتك الذهبية",
    duration: "3:00",
    speaker: "خالد الزهراني",
    role: "شريك في صندوق STV للمشاريع",
    thumbnail: "https://picsum.photos/seed/biz4/800/450",
    description:
      "نظرة معمقة في معايير اختيار الفرص الاستثمارية من منظور صناديق رأس المال الجريء، مع نصائح عملية للمؤسسين الباحثين عن تمويل.",
  },
  {
    id: 5,
    title: "بناء ثقافة الشركة: الأساس الذي لا يُرى",
    duration: "1:45",
    speaker: "نورة السعد",
    role: "مؤسسة منصة رواق للتعلم",
    thumbnail: "https://picsum.photos/seed/biz5/800/450",
    description:
      "تستعرض نورة السعد كيف أسست ثقافة مؤسسية متينة جذبت أفضل المواهب وأسهمت في نمو منصتها لتصبح الأكبر في التعليم الإلكتروني بالعالم العربي.",
  },
];

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="py-[60px]">
      <div className="container mx-auto px-4">
        <SpecialHeader
          header="كل ما يحتاجه الناجحون في عالم الأعمال"
          desc="استكشف مكتبة حصرية من اللقاءات والأراء التي يقدمها نخبة من رواد الأعمال"
        />

        <div className="mt-15" />

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          {/* ── Main Player ── */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Video Thumbnail */}
            <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
              <Image
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                fill
                className="object-cover group transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                  <Play size={26} className="fill-black group-hover:fill-secondary duration-300 group-hover:text-secondary text-black me-1" />
                </div>
              </div>
            </div>

            {/* Speaker & Meta */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <User size={20} className="text-secondary" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">
                      {activeVideo.speaker}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeVideo.role}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline cursor-pointer mt-1">
                  <Share2 size={14} />
                  <span>مشاركة</span>
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed text-right">
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* ── Playlist — shadcn vertical Carousel ── */}
          <div className=" flex flex-col rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-xs font-semibold text-gray-700">
                قائمة التشغيل
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {videos.length} فيديوهات
              </span>
            </div>

            {/* Vertical Carousel */}
            <Carousel
              orientation="vertical"
              opts={{ align: "start", dragFree: true }}
              className="flex-1 px-0"
            >
              {/* Up arrow controls */}
              <div className="flex items-center justify-center gap-3 pb-1">
                <CarouselPrevious className="static translate-y-0 translate-x-0" />
              </div>
              <CarouselContent style={{ maxHeight: 380 }}>
                {videos.map((video) => {
                  const isActive = video.id === activeVideo.id;
                  return (
                    <CarouselItem key={video.id}>
                      <button
                        onClick={() => setActiveVideo(video)}
                        className={`w-full cursor-pointer flex items-center gap-4 px-5 py-4 rounded-2xl border-white bg-white transition-all border-2 group ${
                          isActive
                            ? "bg-[#efecf2]! border-gray-300! text-gray-800"
                            : "hover:bg-gray-100 hover:border-gray-300! text-gray-800"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="relative shrink-0 w-[156px] h-[74px] rounded-lg overflow-hidden">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                          <div
                            className={`absolute inset-0 flex items-center justify-center transition-colors ${
                              isActive
                                ? "bg-black/40"
                                : "bg-black/20 group-hover:bg-black/35"
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

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-semibold text-start text-gray-800 leading-snug line-clamp-2`}
                          >
                            {video.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock
                              size={11}
                              className={`text-xs text-[#8e8e90]`}
                            />
                            <span className={`text-xs text-[#8e8e90]`}>
                              {video.duration}
                            </span>
                            <span className={`text-xs text-[#8e8e90]`}>
                              · {isActive ? " يتم التشغيل الآن" : video.speaker}
                            </span>
                          </div>
                        </div>
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Down arrow controls */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <CarouselNext className="static translate-y-0 translate-x-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
