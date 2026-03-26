"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { LanguageSelector } from "@/components/global/language-selector";
import { Mail } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebsiteSidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const strippedPath = "/" + (pathname.split("/").slice(2).join("/") || "");

  const linkClass = (href: string) =>
    `before:duration-300 relative before:absolute before:h-px before:bg-secondary before:-bottom-2 before:start-0 text-lg ${
      strippedPath === href || (href === "/" && strippedPath === "/")
        ? "before:w-full"
        : "before:w-0 hover:before:w-full"
    }`;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-998 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 start-0 h-full w-72 z-999 bg-primary flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center p-6 border-b border-white/10">
          <Image src={logo} alt="Logo" width={120} priority />
        </div>

        <ul className="flex flex-col gap-7 p-8 text-white max-h-[calc(100vh-220px)] overflow-y-auto">
          <li>
            <Link onClick={onClose} className={linkClass("/")} href="/">
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              onClick={onClose}
              className={linkClass("/about-us")}
              href="/about-us"
            >
              من نحن
            </Link>
          </li>

          <li>
            <Link onClick={onClose} className={linkClass("/blog")} href="/blog">
              المدونة
            </Link>
          </li>
        </ul>

        <div className="mt-auto p-8 border-t border-white/10 text-white flex flex-col gap-6">
          <Link
            href="/contact-us"
            onClick={onClose}
            className={`flex items-center gap-2.5 w-fit ${linkClass("/contact-us")}`}
          >
            <Mail />
            <span>تواصل معنا</span>
          </Link>

          <LanguageSelector />
        </div>
      </div>
    </>
  );
}
