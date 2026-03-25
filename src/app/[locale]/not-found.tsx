import { getTranslator, Locale } from "@/lib/i18n"
import { headers } from "next/headers"

export default async function NotFound() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") as Locale) || "ar"

  const { t } = getTranslator(locale)
  return (
    <div className="flex bg-primary flex-col items-center relative justify-center px-4 py-20 min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-8xl sm:text-9xl font-bold text-secondary mb-4">404</h1>
      </div>
    </div>
  )
}
