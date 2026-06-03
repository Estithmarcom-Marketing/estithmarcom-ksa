import { BlogType } from "@/lib/types/blog";
import BlogDetailsClient from "./_components/blog-details-client";
import blog_img from "@/assets/blog_img.jpg";

export default function BlogPage() {
  const blog: BlogType = {
    id: 1,
    image: blog_img,
    created_at: "2023-01-01",
    slug: "government-procedures",
    title: "كيفية تحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة",
    description:
      "في هذا المقال، سنشرح الخطوات اللازمة لتحويل شركة ذات مسئولية محدودة إلى مساهمة مغلقة في المملكة العربية السعودية. سنتناول المتطلبات القانونية والإجرائية لهذا التحويل، بالإضافة إلى الفوائد والتحديات التي قد تواجهها الشركات خلال هذه العملية.",
    category: { id: 1, name: "تأسيس الشركات" },
  };

  return (
    <div>
      <BlogDetailsClient blog={blog} />
    </div>
  );
}
