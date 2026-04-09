import { useEffect, useRef } from "react";

export default function VideoFrame({
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
