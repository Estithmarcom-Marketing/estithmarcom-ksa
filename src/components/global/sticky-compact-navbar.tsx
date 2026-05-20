"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import logo from "@/assets/logo.png";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import WebsiteSidebar from "@/app/[locale]/(website)/_components/side-bar";
import { LanguageSelector } from "./language-selector";
import WhatsappSVG from "../flags/whats-app";

export default function StickyCompactNavbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShouldShow(window.scrollY > 210);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({ paused: true });

    if (shouldShow) {
      gsap.set(headerRef.current, { yPercent: -100 });
      tl.to(headerRef.current, {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      tl.to(headerRef.current, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.in",
      });
    }

    tl.play();
  }, [shouldShow]);

  useLayoutEffect(() => {
    if (!shouldShow) return;
    if (!dropdownRef.current) return;

    const items = dropdownRef.current.querySelectorAll("a");

    gsap.set(dropdownRef.current, { display: "none" });
    gsap.set(items, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(dropdownRef.current, { display: "block", duration: 0 }).to(items, {
      scaleY: 1,
      duration: 0.18,
      ease: "power2.out",
      stagger: 0.05,
    });

    tlRef.current = tl;
    setServicesOpen(false);

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) {
      setServicesOpen(false);
    }
  }, [shouldShow]);

  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.parentElement?.contains(e.target as Node)
      ) {
        setServicesOpen(false);
        tlRef.current?.reverse();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen]);

  if (!shouldShow) return null;

  const strippedPath = "/" + pathname.split("/").slice(2).join("/");

  const linkClass = (href: string) =>
    `text-xs ${strippedPath === href ? "font-bold" : ""}`;

  return (
    <>
      <WebsiteSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-888 bg-primary shadow-lg backdrop-blur-sm py-[20px]! lg:py-0"
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-16">
              <Image src={logo} alt="logo" priority className="w-12 md:w-16" />

              <ul
                className={`hidden lg:flex relative gap-14 text-white bg-[#6b557f] px-10 py-4 rounded-xl`}
              >
                <li>
                  <Link href="/" className={linkClass("/")}>
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={linkClass("/services")}>
                    {t("services")}
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className={linkClass("/about-us")}>
                    {t("aboutus")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={linkClass("/blog")}>
                    {t("blog")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className={linkClass("/contact-us")}>
                    {t("contactus")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-7">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`${locale === "ar" ? "rotate-180" : ""} lg:hidden`}
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={26}
                  height={26}
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

              <div className="hidden lg:flex items-center gap-7 text-white text-xs">
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
