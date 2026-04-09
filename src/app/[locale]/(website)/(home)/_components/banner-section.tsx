import { Building2 } from "lucide-react";
import Link from "next/link";

export default function BannerSection() {
  return (
    <div className="container">
      <div className="bg-white flex flex-col md:flex-row gap-3 md:justify-between py-10 px-5 sm:px-10 shadow-2xl shadow-primary/10 rounded-lg md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          <Building2 size={60} />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              احجــز مكتبك الآن فـــــي الأردن
            </h2>
            <p className="text-secondary text-sm font-bold">
              خصومات تصل إلى 50٪ بمنــاسبــة الافتتاح
            </p>
          </div>
        </div>
        <div>
          <Link
            href={`/`}
            className="bg-secondary w-fit hover:border-primary block rounded-sm px-14 duration-300 text-lg text-center border border-secondary hover:text-white hover:bg-primary text-white py-1"
          >
            احجز الأن
          </Link>
        </div>
      </div>
    </div>
  );
}
