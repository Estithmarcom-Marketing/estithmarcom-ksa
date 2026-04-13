"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import logo from "@/assets/logo.png";
import WebsiteSidebar from "./side-bar";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { LanguageSelector } from "@/components/global/language-selector";
import WhatsappSVG from "@/components/flags/whats-app";
import StickyCompactNavbar from "@/components/global/sticky-compact-navbar";

export default function NavBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const strippedPath = "/" + pathname.split("/").slice(2).join("/");

  const linkClass = (href: string) =>
    `text-sm ${ strippedPath === href ? "font-bold" : "" }`;

  return (
    <>
      <WebsiteSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <StickyCompactNavbar />
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="container">
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-16">
              <Image src={logo} alt="logo" priority className="w-24 md:w-32" />

              <ul className={`hidden lg:flex relative before:absolute before:-bottom-4 before:start-1/2 ${locale === "ar" ? "before:translate-x-1/2" : "before:-translate-x-1/2"} before:h-[1px] before:w-[calc(100%-50px)] before:bg-[#6b557f] gap-14 text-white bg-[#6b557f] px-10 py-4 rounded-xl`}>
                <li>
                  <Link href="/" className={linkClass("/")}>{t("home")}</Link>
                </li>
                <li>
                  <Link href="/" className={linkClass("/services")}>{t("services")}</Link>
                </li>
                <li>
                  <Link href="/about-us" className={linkClass("/about-us")}>{t("aboutus")}</Link>
                </li>
                <li>
                  <Link href="/about-us" className={linkClass("/blog")}>{t("blog")}</Link>
                </li>
                <li>
                  <Link href="/blog" className={linkClass("/blog")}>{t("contactus")}</Link>
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

              <div className="hidden lg:flex items-center gap-5 text-white">
                <a href="tel:+966920003991">
                  <WhatsappSVG />
                </a>
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}