"use client"

import PagesHero from "@/components/global/pages-hero"
import ResidencyOrderCard from "@/components/residency/residency-order-card"
import { ResidencyType } from "@/lib/types/residency"
import RichTextViewer from "@/components/global/rich-text-viewer"

export default function ResidencyDetailsClient({ residency }: { residency: ResidencyType }) {

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

        <div className="lg:w-[600px] w-full lg:sticky lg:top-30 self-start">
          <ResidencyOrderCard residency={residency} />
        </div>
      </section>
    </div>
  )
}
