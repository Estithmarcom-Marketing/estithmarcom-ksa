"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/assets/logo2.png";
import WebsiteSidebar from "./side-bar";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { LanguageSelector } from "@/components/global/language-selector";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail } from "@hugeicons/core-free-icons";

export default function NavBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const strippedPath = "/" + pathname.split("/").slice(2).join("/");
  const isHome = strippedPath === "/";

  const linkClass = (href: string) =>
    `relative before:absolute before:start-0 before:-bottom-2 before:h-px before:bg-main before:transition-all before:duration-300 ${
      strippedPath === href ? "before:w-full" : "before:w-0 hover:before:w-full"
    }`;

  return (
    <>
      <WebsiteSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header className="bg-primary">
        <div className="container">
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-12">
              <Image src={logo} alt="logo" priority className="w-24 md:w-32" />

              <ul className="hidden lg:flex gap-16 text-white">
                <li>
                  <Link href="/" className={linkClass("/")}>الرئيسية</Link>
                </li>
                <li>
                  <Link href="/about-us" className={linkClass("/about-us")}>عنا</Link>
                </li>

                <li>
                  <Link href="/blog" className={linkClass("/blog")}>المدونة</Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-10">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`${locale === "ar" ? "rotate-180" : ""} lg:hidden`}
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  color="white"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12L10 12" />
                  <path d="M20 5L4 5" />
                  <path d="M20 19L4 19" />
                </svg>
              </button>

              <div className="hidden lg:flex items-center gap-10 text-white">
                <Link href="/contact-us" className={`flex items-center gap-2 ${linkClass("/contact-us")}`}>
                  <HugeiconsIcon icon={Mail} />
                  <span>تواصل معنا</span>
                </Link>
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}