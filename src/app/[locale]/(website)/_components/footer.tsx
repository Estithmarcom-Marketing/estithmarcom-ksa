"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { FaSnapchatGhost } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { SettingsType } from "@/lib/types/settings";

export default function Footer({ settings }: { settings: SettingsType }) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  return (
    <div className={`relative pt-10 bg-primary`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main-banner.webp')" }}
      />
      <div className="relative container text-white">
        <div className="py-8 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col justify-between max-w-[300px] lg:items-center gap-4">
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  priority
                  className="w-30 md:w-34"
                />
              </div>
              <p className="text-sm lg:text-center">{t("footer.desc")}</p>
              <ul className="flex flex-wrap gap-3 items-center">
                {settings.facebook && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.facebook}
                      aria-label={locale === "ar" ? "فيسبوك" : "Facebook"}
                    >
                      <FaFacebook size={10} />
                    </Link>
                  </li>
                )}
                {settings.x && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.x}
                      aria-label={locale === "ar" ? "تويتر" : "Twitter"}
                    >
                      <FaXTwitter size={10} />
                    </Link>
                  </li>
                )}
                {settings.tiktok && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.tiktok}
                      aria-label={locale === "ar" ? "تيك توك" : "TikTok"}
                    >
                      <FaTiktok size={10} />
                    </Link>
                  </li>
                )}
                {settings.instagram && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.instagram}
                      aria-label={locale === "ar" ? "انستغرام" : "Instagram"}
                    >
                      <FaInstagram size={10} />
                    </Link>
                  </li>
                )}
                {settings.snapchat && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.snapchat}
                      aria-label={locale === "ar" ? "سناب شات" : "Snapchat"}
                    >
                      <FaSnapchatGhost size={10} />
                    </Link>
                  </li>
                )}
                {settings.linkedin && (
                  <li>
                    <Link
                      className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                      href={settings.linkedin}
                      aria-label={locale === "ar" ? "لينكدإن" : "LinkedIn"}
                    >
                      <FaLinkedin size={10} />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <p className="font-bold text-main text-[24px]">
                {t("footer.links")}
              </p>
              <Link
                href={"/services"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.ourservices")}
              </Link>
              <Link
                href={"/"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.story")}
              </Link>
              <Link
                href={"/blog"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.blog")}
              </Link>
            </div>
            <div>
              <p className="font-bold text-main text-[24px]">
                {t("footer.contact")}
              </p>
              <Link
                href={`mailto:${settings}`}
                className="mt-4 w-fit text-[#b4b4bb] flex items-center gap-2"
              >
                <Mail />
                <span className="text-sm">{settings.email}</span>
              </Link>
              <p className="mt-4 text-[#b4b4bb] flex items-center gap-2">
                <MapPin />
                <span className="text-sm">{settings.address}</span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#b4b4bb] py-5">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </div>
  );
}
