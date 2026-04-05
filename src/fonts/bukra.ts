import localFont from "next/font/local"

export const bukra = localFont({
  src: [
    {
      path: "./29ltbukralight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./29ltbukraregular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./29ltbukrabold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bukra",
  display: "swap",
  preload: false,
})
