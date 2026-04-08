"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SpecialHeader from "@/components/global/special-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Play,
  Share2,
  Clock,
  User,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

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

function formatTime(s: number) {
  if (isNaN(s) || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function VideoFrame({
  src,
  frameTime,
  className = "",
}: {
  src: string;
  frameTime: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const seek = () => {
      el.currentTime = frameTime;
    };
    el.addEventListener("loadedmetadata", seek);
    if (el.readyState >= 1) seek();
    return () => el.removeEventListener("loadedmetadata", seek);
  }, [src, frameTime]);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      playsInline
      preload="metadata"
    />
  );
}

function InlinePlayer({ video }: { video: (typeof videos)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showFrame, setShowFrame] = useState(true);
  const [hoverState, setHoverState] = useState<{
    ratio: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setShowFrame(true);
    setHoverState(null);
  }, [video.src]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      setShowFrame(false);
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime);
    setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    const el = videoRef.current;
    if (!el) return;
    setDuration(el.duration);
  };

  const handleEnded = () => setPlaying(false);

  // ── Scrubbing (click + drag) ───────────────────────────────────────────

  const getRatioFromClientX = useCallback((clientX: number) => {
    const bar = progressBarRef.current;
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  }, []);

  const applyRatio = useCallback((ratio: number) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    el.currentTime = ratio * el.duration;
  }, []);

  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      isDragging.current = true;
      const ratio = getRatioFromClientX(e.clientX);
      if (ratio !== null) applyRatio(ratio);

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        const r = getRatioFromClientX(ev.clientX);
        if (r !== null) applyRatio(r);
      };

      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [getRatioFromClientX, applyRatio],
  );

  // ── Hover preview ─────────────────────────────────────────────────────

  const handleProgressMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const ratio = getRatioFromClientX(e.clientX);
      if (ratio === null) return;
      const el = videoRef.current;
      const dur = el?.duration ?? 0;
      const t = ratio * dur;
      setHoverState({ ratio, label: formatTime(t) });
      const pv = previewRef.current;
      if (pv && dur) pv.currentTime = t;
    },
    [getRatioFromClientX],
  );

  const handleProgressMouseLeave = useCallback(() => {
    setHoverState(null);
  }, []);

  // ── Volume ────────────────────────────────────────────────────────────

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = videoRef.current;
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (el) {
      el.volume = v;
      el.muted = v === 0;
    }
    setMuted(v === 0);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    if (muted || volume === 0) {
      const restored = volume === 0 ? 0.7 : volume;
      el.muted = false;
      el.volume = restored;
      setVolume(restored);
      setMuted(false);
    } else {
      el.muted = true;
      setMuted(true);
    }
  };

  const displayVolume = muted ? 0 : volume;

  return (
    <div
      dir="ltr"
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-md group"
    >
      {/* Main video */}
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
      />

      {/* Hidden preview video for hover thumbnail */}
      <video
        ref={previewRef}
        src={video.src}
        className="hidden"
        muted
        playsInline
        preload="metadata"
      />

      {/* Frozen frame shown before first play */}
      {showFrame && (
        <div className="absolute inset-0 pointer-events-none">
          <VideoFrame
            src={video.src}
            frameTime={video.frameTime}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Centre play button */}
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
            <Play size={26} className="fill-secondary text-secondary ms-1" />
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8 flex flex-col gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Progress bar + hover preview */}
        <div className="relative">
          {/* Hover thumbnail */}
          {hoverState && (
            <div
              className="absolute bottom-5 pointer-events-none flex flex-col items-center gap-1 -translate-x-1/2"
              style={{ left: `${hoverState.ratio * 100}%` }}
            >
              <div className="w-[120px] h-[68px] rounded-lg overflow-hidden bg-black border border-white/30 shadow-lg">
                <video
                  ref={previewRef}
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
              <span className="text-white text-[11px] font-medium tabular-nums bg-black/60 px-1.5 py-0.5 rounded">
                {hoverState.label}
              </span>
            </div>
          )}

          {/* Track */}
          <div
            ref={progressBarRef}
            className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative select-none"
            onMouseDown={handleProgressMouseDown}
            onMouseMove={handleProgressMouseMove}
            onMouseLeave={handleProgressMouseLeave}
          >
            <div
              className="h-full bg-secondary rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              {/* Scrubber handle */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md border-2 border-white/80" />
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          {/* Left: play/pause + timestamp */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
            >
              {playing ? (
                <Pause size={14} className="text-white fill-white" />
              ) : (
                <Play size={14} className="text-white fill-white ms-0.5" />
              )}
            </button>

            <span className="text-white/90 text-xs font-medium tabular-nums select-none">
              {formatTime(currentTime)} <span className="text-white/50">/</span>{" "}
              {formatTime(duration)}
            </span>
          </div>

          {/* Right: mute + volume slider */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors shrink-0"
            >
              {displayVolume === 0 ? (
                <VolumeX size={14} className="text-white" />
              ) : (
                <Volume2 size={14} className="text-white" />
              )}
            </button>

            <div className="relative w-20 h-5 flex items-center">
              <div className="absolute w-full h-1.5 bg-white/30 rounded-full" />
              <div
                className="absolute left-0 h-1.5 bg-secondary rounded-full"
                style={{ width: `${displayVolume * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={displayVolume}
                onChange={handleVolumeChange}
                className="absolute w-full opacity-0 cursor-pointer h-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                            className="absolute inset-0 w-full h-full object-cover"
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

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-start text-gray-800 leading-snug line-clamp-2">
                            {video.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={11} className="text-[#8e8e90]" />
                            <span className="text-xs text-[#8e8e90]">
                              {video.duration}
                            </span>
                            <span className="text-xs text-[#8e8e90]">
                              · {isActive ? "يتم التشغيل الآن" : video.speaker}
                            </span>
                          </div>
                        </div>
                      </button>
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
