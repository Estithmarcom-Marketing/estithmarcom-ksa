"use client"

import PagesHero from "@/components/global/pages-hero"
import { ResidencyType } from "@/lib/types/residency"
import ResidencyForm from "./residency-form"
import RichTextViewer from "@/components/global/rich-text-viewer"
import { CountryType } from "@/lib/types/country"

export default function ResidencyDetailsClient({ residency, countries }: { residency: ResidencyType; countries: CountryType[] }) {

  return (
    <div>
      <PagesHero title={residency.title} desc="تعرف على تفاصيل الإقامات الخاصة باستثماركوم" />
      <section className="container py-[100px]! flex flex-col lg:flex-row items-start gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-primary">{residency.title}</h1>
          <div className="mt-2">
            <RichTextViewer content={residency.description} />
          </div>
        </div>

        <div id="residencyForm" className="lg:w-[600px] w-full lg:sticky lg:top-30 scroll-mt-20 bg-white special-shadow rounded-xl px-6 py-10 self-start">
          <ResidencyForm countries={countries} residency={residency} />
        </div>
      </section>
    </div>
  )
}
