import { getBlogDetails } from "@/lib/apis/blog";
import BlogDetailsClient from "./_components/blog-details-client";
import { getCategories } from "@/lib/apis/category";
import notFound from "@/app/[locale]/not-found";

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
