export default function CustomLoader({w = 40, color = "primary"}: {w?: number, color?: "primary" | "white"}) {
  return (
    <div>
      <svg className={`animate-spin`} width={w} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className={`${color === "primary" ? "text-primary" : "text-white"}`}
          strokeDasharray="80 200"
          strokeDashoffset="-15"
        >
          <animate
            attributeName="stroke-dasharray"
            values="1 200;80 200;80 200"
            dur="1.4s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0;-35;-125"
            dur="1.4s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
          />
        </circle>
      </svg>
    </div>
  );
}
