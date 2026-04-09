import formatTime from "@/utils/format-video-time";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import VideoFrame from "./video-frame";
import { useCallback, useEffect, useRef, useState } from "react";

export default function InlinePlayer({ video }: { video: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const [controlsVisible, setControlsVisible] = useState(false);

  // Show controls temporarily then hide (for mobile tap)
  const showControlsTemporarily = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  }, []);

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
    setControlsVisible(false);
  }, [video.src]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

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
    showControlsTemporarily();
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

  const handleEnded = () => {
    setPlaying(false);
    setControlsVisible(true);
  };

  // ── Shared seek logic ──────────────────────────────────────────────────────

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

  // ── Mouse events (desktop) ─────────────────────────────────────────────────

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

  // ── Touch events (mobile) ──────────────────────────────────────────────────

  const handleProgressTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault(); // prevent scroll while scrubbing
      isDragging.current = true;
      const touch = e.touches[0];
      const ratio = getRatioFromClientX(touch.clientX);
      if (ratio !== null) applyRatio(ratio);
      showControlsTemporarily();
    },
    [getRatioFromClientX, applyRatio, showControlsTemporarily],
  );

  const handleProgressTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      const ratio = getRatioFromClientX(touch.clientX);
      if (ratio !== null) applyRatio(ratio);
    },
    [getRatioFromClientX, applyRatio],
  );

  const handleProgressTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ── Volume ─────────────────────────────────────────────────────────────────

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

  // Controls visible on desktop via CSS group-hover; on mobile via state
  const controlsClass = `absolute bottom-0 left-0 right-0 px-4 pb-4 pt-0 flex flex-col gap-2.5 transition-opacity duration-200 ${
    controlsVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

  return (
    <div
      dir="ltr"
      className="relative w-full aspect-video bg-black rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-md group"
      // Show controls on any tap on the container (mobile)
      onTouchStart={showControlsTemporarily}
    >
      {/* Main video */}
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-contain"
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
      />

      {/* Hidden preview video for scrub thumbnail (desktop only) */}
      <video
        ref={previewRef}
        src={video.src}
        className="hidden"
        muted
        playsInline
        preload="metadata"
      />

      {showFrame && (
        <div className="absolute inset-0 pointer-events-none">
          <VideoFrame
            src={video.src}
            frameTime={video.frameTime}
            className="w-full h-full object-contain"
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
      <div className={controlsClass}>
        <div className="relative">
          {/* Hover thumbnail — desktop only */}
          {hoverState && (
            <div
              className="absolute bottom-5 pointer-events-none flex-col items-center gap-1 -translate-x-1/2 hidden md:flex"
              style={{ left: `${hoverState.ratio * 100}%` }}
            >
              <div className="w-[120px] h-[68px] rounded-lg overflow-hidden bg-black border border-white/30 shadow-lg">
                <video
                  src={video.src}
                  className="w-full h-full object-contain"
                  muted
                  playsInline
                  preload="metadata"
                  ref={(el) => {
                    if (el && hoverState) {
                      el.currentTime =
                        hoverState.ratio * (videoRef.current?.duration ?? 0);
                    }
                  }}
                />
              </div>
              <span className="text-white text-[11px] font-medium tabular-nums bg-black/60 px-1.5 py-0.5 rounded">
                {hoverState.label}
              </span>
            </div>
          )}

          {/* Progress track */}
          <div
            ref={progressBarRef}
            className="w-full h-3 flex items-center cursor-pointer relative select-none touch-none"
            onMouseDown={handleProgressMouseDown}
            onMouseMove={handleProgressMouseMove}
            onMouseLeave={handleProgressMouseLeave}
            onTouchStart={handleProgressTouchStart}
            onTouchMove={handleProgressTouchMove}
            onTouchEnd={handleProgressTouchEnd}
          >
            {/* Track bg */}
            <div className="absolute w-full h-1.5 bg-white/30 rounded-full" />
            {/* Filled */}
            <div
              className="absolute left-0 h-1.5 bg-secondary rounded-full"
              style={{ width: `${progress}%` }}
            />
            {/* Scrubber handle */}
            <div
              className="absolute w-4 h-4 bg-white rounded-full shadow-md border-2 border-white/80 -translate-x-1/2"
              style={{ left: `${progress}%` }}
            />
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

          {/* Right: mute + volume slider (hide slider on mobile) */}
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

            <div className="relative w-20 h-5 items-center hidden md:flex">
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
