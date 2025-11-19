import { Play, Pause, Maximize2, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";

import sequence1 from "@/assets/sequence-1.mp4";
import sequence2 from "@/assets/sequence-2.mp4";
import sequence3 from "@/assets/sequence-3.mp4";
import sequence4 from "@/assets/sequence-4.mp4";
import sequence5 from "@/assets/sequence-5.mp4";
import sequence6 from "@/assets/sequence-6.mp4";
import sequence7 from "@/assets/estsmarkm56.mp4";
import sequence8 from "@/assets/se2.mp4";
import video1Thumbnail from "@/assets/video-thumbnails/video-1.png";
import video2Thumbnail from "@/assets/video-thumbnails/video-2.png";
import video3Thumbnail from "@/assets/video-thumbnails/video-3.png";
import video4Thumbnail from "@/assets/video-thumbnails/video-4.png";
import video5Thumbnail from "@/assets/video-thumbnails/video-5.png";
import video6Thumbnail from "@/assets/video-thumbnails/video-6.png";

// Array of videos
const videos = [
  sequence1,
  sequence2,
  sequence3,
  sequence4,
  sequence5,
  sequence6,
  sequence7,
  sequence8,
];

// Array of thumbnails
const thumbnails = [
  video1Thumbnail,
  video2Thumbnail,
  video3Thumbnail,
  video4Thumbnail,
  video5Thumbnail,
  video6Thumbnail,
];

const VideoSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleVideoEnd = () => {
    nextVideo();
  };

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);


  useEffect(() => {
    const el = scrollRef.current;
    if (!el || pause) return;

    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (!el) return;
      scrollAmount = el.scrollLeft + 1;
      if (scrollAmount >= el.scrollWidth - el.clientWidth) {
        scrollAmount = 0;
      }
      el.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 50);

    return () => clearInterval(interval);
  }, [pause]);



  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-purple-light">
      {/* section for both right and left  */}
      <div className="container flex flex-col-reverse md:flex-row md:flex-wrap px-4 justify-between">
        {/* start of thumbnail section */}
        <div className="my-5">
          <div className="">
            <h2 className="text-3xl md:text-3xl font-bold text-accent mb-4">
              {t('video.title1')}
              <br />
              {t('video.title2')}
            </h2>
            <p className="text-white/90 text-base md:text-lg">
              {t('video.description1')}
              <br />
              {t('video.description2')}
            </p>
          </div>
          <div ref={scrollRef} className="w-[350px] md:w-[592px] my-5 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {thumbnails.map((img, index) => (
                <div key={index} className={`w-48 h-48 flex-shrink-0 relative cursor-pointer my-1 rounded-xl ${index === currentVideoIndex ? "ring-2 ring-white/80" : ""
                  }`} onClick={() => {
                    setCurrentVideoIndex(index);
                    setIsPlaying(true);
                    if (videoRef.current) {
                      videoRef.current.play();
                    }
                  }}>
                  <img src={img} className="w-full h-full object-cover rounded-xl" />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* end of thumbnail section */}
        {/* start of video player */}
        <div className="max-w-xl mx-auto">
          <div className="relative  aspect-square bg-primary/50 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <video
              ref={videoRef}
              key={currentVideoIndex}
              src={videos[currentVideoIndex]}
              className="w-full h-full object-cover"
              onClick={togglePlay}
              autoPlay
              muted
              onEnded={handleVideoEnd}
            />

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
              </div>
            )}

            {/* Navigation Arrows */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={previousVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </button>
                <button
                  onClick={nextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </button>
              </>
            )}

            {/* Control Buttons */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10">
              <button
                onClick={togglePlay}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-white" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
              >
                <Maximize2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            {/* Video Indicators */}
            {videos.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${index === currentVideoIndex
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/70"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
