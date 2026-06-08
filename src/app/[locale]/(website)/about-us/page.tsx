import { getHighlights } from "@/lib/apis/stats";
import AboutUsClient from "./_components/abous-us-client";
import { Metadata } from "next";
import { getTranslator, Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = getTranslator(locale);

  return {
    title: t("aboutus.meta.title"),
    description: t("aboutus.meta.description"),
    keywords: t("aboutus.meta.keywords"),
  };
}

export default async function AboutUsPage() {
  const stats = await getHighlights();
  return <AboutUsClient stats={stats} />;
}
