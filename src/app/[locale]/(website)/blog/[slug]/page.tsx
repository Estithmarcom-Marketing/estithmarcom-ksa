import { getBlogDetails } from "@/lib/apis/blog";
import BlogDetailsClient from "./_components/blog-details-client";
import { getCategories } from "@/lib/apis/category";
import notFound from "@/app/[locale]/not-found";
import { Metadata } from "next";
import { siteTitle } from "@/helper/site-title";
import { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = await getBlogDetails(slug);

  if (!blog) return {};

  const title = siteTitle(blog.meta_title || blog.title, locale);
  const description = blog.meta_description || blog.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [blog.image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [blog, categories] = await Promise.all([
    getBlogDetails(slug),
    getCategories(),
  ]);

  if (!blog) {
    return notFound();
  }

  return (
    <div>
      <BlogDetailsClient blog={blog} categories={categories} />
    </div>
  );
}
