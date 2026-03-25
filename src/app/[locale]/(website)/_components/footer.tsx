"use client";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { FaSnapchatGhost } from "react-icons/fa";
import useAxios from "@/hooks/use-axios";
import { InfoType } from "@/lib/types/info";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail, MapPinCheckIcon } from "@hugeicons/core-free-icons";

export default function Footer() {
  let info: InfoType = {
    address: "",
    email: "",
    facebook: "",
    instagram: "",
    name: "",
    phone: "",
    snapchat: "",
    tiktok: "",
    x: "",
  };
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const Axios = useAxios();

  return (
    <div
      className={`relative pt-20 bg-primary`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/main-banner.webp')" }}
      />
      <div className="relative container text-white">
        <div className="flex flex-col sm:flex-row justify-between gap-4 pb-10 border-b border-[#2f3247]">
          <ul className="flex flex-wrap gap-3 items-center">
            {info.facebook && (
              <li>
                <Link
                  className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                  href={info.facebook}
                  aria-label={locale === "ar" ? "فيسبوك" : "Facebook"}
                >
                  <FaFacebook size={14} />
                </Link>
              </li>
            )}
            {info.x && (
              <li>
                <Link
                  className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                  href={info.x}
                  aria-label={locale === "ar" ? "تويتر" : "Twitter"}
                >
                  <FaXTwitter size={14} />
                </Link>
              </li>
            )}
            {info.tiktok && (
              <li>
                <Link
                  className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                  href={info.tiktok}
                  aria-label={locale === "ar" ? "تيك توك" : "TikTok"}
                >
                  <FaTiktok size={14} />
                </Link>
              </li>
            )}
            {info.instagram && (
              <li>
                <Link
                  className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                  href={info.instagram}
                  aria-label={locale === "ar" ? "انستغرام" : "Instagram"}
                >
                  <FaInstagram size={14} />
                </Link>
              </li>
            )}
            {info.snapchat && (
              <li>
                <Link
                  className="block border duration-300 hover:bg-white hover:text-black border-white rounded-full p-2"
                  href={info.snapchat}
                  aria-label={locale === "ar" ? "سناب شات" : "Snapchat"}
                >
                  <FaSnapchatGhost size={14} />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="py-8 border-b border-[#2f3247]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <p className="font-bold text-main text-[24px]">
                {t("footer.contact")}
              </p>
              <Link
                href={`mailto:${info.email}`}
                className="mt-4 w-fit text-[#b4b4bb] flex items-center gap-2"
              >
                <HugeiconsIcon icon={Mail} />
                <span className="text-sm">{info.email}</span>
              </Link>
              <p className="mt-4 text-[#b4b4bb] flex items-center gap-2">
                <HugeiconsIcon icon={MapPinCheckIcon} />
                <span className="text-sm">{info.address}</span>
              </p>
            </div>
            <div>
              <p className="font-bold text-main text-[24px]">
                {t("footer.links")}
              </p>
              <Link
                href={"/"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.whoarewe")}
              </Link>
              <Link
                href={"/services"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.ourservices")}
              </Link>
              <Link
                href={"/blog"}
                className="mt-4 w-fit block text-sm text-[#b4b4bb] hover:underline"
              >
                {t("footer.blog")}
              </Link>
            </div>
            <div>test</div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#b4b4bb] py-10">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </p>
      </div>
    </div>
  );
}
