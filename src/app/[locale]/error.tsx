"use client"

import { useLocale } from "@/hooks/use-locale"
import { getTranslator } from "@/lib/i18n"

export default function GlobalError({ reset }: { reset: () => void }) {
  const locale = useLocale()

  const { t } = getTranslator(locale)
  return (
    <div className="flex flex-col bg-secondary items-center relative justify-center px-4 py-20 min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-8xl sm:text-9xl font-bold text-main mb-4">
          500
        </h1>
      </div>
    </div>
  )
}
