"use client";

import { useLocale } from "@/hooks/use-locale";
import { ChevronsDown } from "lucide-react";
import CustomLoader from "./custom-loader";

interface LoadMoreButtonProps {
  loading?: boolean;
  onClick?: () => void;
}

export default function LoadMoreButton({
  loading = false,
  onClick,
}: LoadMoreButtonProps) {
  const locale = useLocale();

  return loading ? (
    <CustomLoader w={30} />
  ) : (
    <button
      onClick={onClick}
      disabled={loading}
      aria-label={locale === "en" ? "Load more" : "تحميل المزيد"}
      className={"text-primary cursor-pointer animate-bounce-special"}
    >
      <ChevronsDown size={30} />
    </button>
  );
}
