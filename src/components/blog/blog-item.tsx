import { BlogType } from "@/lib/types/blog";
import { Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogItem({ blog }: { blog: BlogType }) {
  return (
    <div className="grid md:grid-cols-2 gap-0 md:gap-10">
      <Link href={`/blogs/${blog.slug}`} className="relative aspect-square shrink-0">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-t-3xl md:rounded-t-none md:rounded-s-3xl!"
        />
      </Link>
      <div className="bg-white md:bg-transparent p-5 md:p-0">
        <h4 className="md:text-lg font-bold">{blog.title}</h4>
        <p className="text-sm mt-4 md:mt-8">{blog.description}</p>
        <Link
          href={`/blogs/${blog.slug}`}
          className="text-xs mt-4 font-bold hover:underline text-secondary"
        >
          شاهد المزيد
        </Link>
        <div className="mt-8 flex gap-5">
          <div className="flex gap-1 items-center">
            <User size={13} />
            <span className="text-[10px]">{blog.author}</span>
          </div>
          <div className="flex gap-1 items-center">
            <Eye className="text-blue-500" size={13} />
            <span className="text-[10px]">{blog.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
