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
import { Share2, User } from "lucide-react";
import InlinePlayer from "@/components/video/video-player";
import VideoItem from "@/components/video/video-item";

const videos = [
  {
    id: 1,
    title: "رحلة النجاح: من فكرة بسيطة لشركة عالمية",
    duration: "2:15",
    speaker: "هاني القحطاني",
    role: "مؤسس حاضنة ومسرعة الأعمال استثماركوم",
    src: "/videos/sequence-1.mp4",
    frameTime: 3.2,
    description:
      "في هذا اللقاء يستعرض رائد الأعمال خارطة الطريق التي اتبعها لتوسيع أعماله مع التركيز على أهمية الابتكار المستمر والتكيف مع متغيرات السوق السعودي المتسارع.",
  },
  {
    id: 2,
    title: "القيادة في زمن الأزمات: دروس من الميدان",
    duration: "1:15",
    speaker: "فهد المطيري",
    role: "الرئيس التنفيذي لمجموعة رؤية",
    src: "/videos/sequence-2.mp4",
    frameTime: 5.7,
    description:
      "يشارك فهد المطيري تجربته في قيادة فرق العمل خلال فترات الضغط الشديد، وكيف تحولت التحديات إلى فرص نمو حقيقية لمؤسسته.",
  },
  {
    id: 3,
    title: "التسويق الرقمي: استراتيجيات تضاعف مبيعاتك",
    duration: "2:15",
    speaker: "سارة العمري",
    role: "مديرة التسويق في منصة نون",
    src: "/videos/sequence-3.mp4",
    frameTime: 2.1,
    description:
      "تكشف سارة العمري عن الأسرار خلف أنجح حملات التسويق الرقمي في السوق الخليجي، وكيف يمكن لأي مشروع ناشئ مضاعفة مبيعاته خلال 90 يوماً.",
  },
  {
    id: 4,
    title: "الاستثمار الذكي: كيف تختار فرصتك الذهبية",
    duration: "3:00",
    speaker: "خالد الزهراني",
    role: "شريك في صندوق STV للمشاريع",
    src: "/videos/sequence-4.mp4",
    frameTime: 8.4,
    description:
      "نظرة معمقة في معايير اختيار الفرص الاستثمارية من منظور صناديق رأس المال الجريء، مع نصائح عملية للمؤسسين الباحثين عن تمويل.",
  },
  {
    id: 5,
    title: "بناء ثقافة الشركة: الأساس الذي لا يُرى",
    duration: "1:45",
    speaker: "نورة السعد",
    role: "مؤسسة منصة رواق للتعلم",
    src: "/videos/sequence-5.mp4",
    frameTime: 4.9,
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
          {/* Main Player */}
          <div className="flex-1 flex flex-col gap-4">
            <InlinePlayer key={activeVideo.id} video={activeVideo} />

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

          {/* Playlist */}
          <div className="flex flex-col rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-xs font-semibold text-gray-700">
                قائمة التشغيل
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {videos.length} فيديوهات
              </span>
            </div>

            <Carousel
              orientation="vertical"
              opts={{ align: "start", dragFree: true }}
              className="flex-1 px-0"
            >
              <div className="flex items-center justify-center gap-3 pb-1">
                <CarouselPrevious className="static translate-y-0 translate-x-0" />
              </div>
              <CarouselContent style={{ maxHeight: 380 }}>
                {videos.map((video) => {
                  const isActive = video.id === activeVideo.id;
                  return (
                    <CarouselItem key={video.id}>
                      <VideoItem video={video} isActive={isActive} setActiveVideo={setActiveVideo} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
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
