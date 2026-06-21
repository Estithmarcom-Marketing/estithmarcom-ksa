import { getStaticPageByIdentifier } from "@/lib/apis/static-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";
import { Locale } from "@/lib/i18n";
import PagesHero from "@/components/global/pages-hero";
import RichTextViewer from "@/components/global/rich-text-viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const page = await getStaticPageByIdentifier(slug);

  if (!page) return {};

  const title = siteTitle(page.meta_title || page.title, locale);
  const description = page.meta_description;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getStaticPageByIdentifier(slug);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <PagesHero title={page.title} />
      <section className="container py-16!">
        <RichTextViewer content={page.content} />
      </section>
    </div>
  );
}
