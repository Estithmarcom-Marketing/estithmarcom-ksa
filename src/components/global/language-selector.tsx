"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocale } from "@/hooks/use-locale"

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    title: "EN",
  },
  {
    code: "ar",
    label: "Arabic",
    title: "AR",
  },
]

interface LanguageSelectorProbs {
  width?: "full" | "fit"
}

export function LanguageSelector({width}: LanguageSelectorProbs) {
  const router = useRouter()
  const locale = useLocale()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  const currentLocale = pathname.split("/")[1] || "ar"

  const handleLanguageChange = (locale: string) => {
    if (locale === currentLocale) return

    setIsLoading(true)

    document.cookie = `estithmarcom_lang=${locale}; path=/; max-age=31536000`

    const segments = pathname.split("/")
    segments[1] = locale
    const newPathname = segments.join("/")

    router.push(newPathname)
  }

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={`focus-visible:ring-0 shadow-none ${width === "full" ? "w-full" : "w-fit border-none"}`}
        aria-label={locale == "en" ? "Lang select" : "اختيار اللغة"}
        disabled={isLoading}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[1000]" position="popper" align={locale === "ar" ? "start" : "end"}>
        {LANGUAGES.map((lang) => (
          <SelectItem
            className=""
            key={lang.code}
            value={lang.code}
          >
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
