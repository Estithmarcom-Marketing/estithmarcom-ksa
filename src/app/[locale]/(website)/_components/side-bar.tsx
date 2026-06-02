"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { LanguageSelector } from "@/components/global/language-selector";
import Newsletter from "@/components/global/newslettter";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebsiteSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const strippedPath = "/" + (pathname.split("/").slice(2).join("/") || "");

  const linkClass = (href: string) =>
    `text-black text-sm py-5 px-8 block border-b border-[#eae8ed]/50 ${strippedPath === href ? "font-bold" : ""}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        className={`fixed top-0 start-0 h-full w-full sm:w-100 z-999 bg-white flex flex-col transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "translate-x-0"
            : locale === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="flex-none flex items-center justify-between p-6 border-b border-[#eae8ed]/50">
          <Image src={logo} alt="Logo" width={100} priority />
          <button
            onClick={onClose}
            className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            <li>
              <Link onClick={onClose} className={linkClass("/")} href="/">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                className={linkClass("/about-us")}
                href="/about-us"
              >
                {t("aboutus")}
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                className={linkClass("/services")}
                href="/services"
              >
                {t("services")}
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                href="/residencies"
                className={linkClass("/residencies")}
              >
                {t("residencies.title")}
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                className={linkClass("/blog")}
                href="/blog"
              >
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link
                onClick={onClose}
                className={linkClass("/contact-us")}
                href="/contact-us"
              >
                {t("contactus")}
              </Link>
            </li>
          </ul>
          <div className="p-6">
            <Newsletter />
          </div>
        </div>

        <div className="flex-none p-2 border-t border-[#eae8ed]/50 items-center flex flex-col justify-center">
          <LanguageSelector color="black" />
        </div>
      </div>
    </>
  );
}
