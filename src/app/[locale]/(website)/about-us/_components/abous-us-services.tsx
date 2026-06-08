"use client";

import Link from "next/link";
import {
  CheckSquare,
  BadgeCheck,
  Monitor,
  Building2,
  HeadsetIcon,
  Briefcase,
  DollarSign,
  Scale,
} from "lucide-react";
import SpecialHeader from "@/components/global/special-header";

import { useLocale } from "@/hooks/use-locale";
import { getTranslator } from "@/lib/i18n";

interface Service {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  linkColor: string;
  href: string;
}

export default function AboutUsServices() {
  const locale = useLocale();
  const { t } = getTranslator(locale);

  const SERVICES: Service[] = [
    {
      icon: <CheckSquare size={28} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      title: t("aboutUs.services.trademark.title"),
      description: t("aboutUs.services.trademark.desc"),
      linkColor: "text-primary",
      href: "/services/trademark-registration",
    },
    {
      icon: <BadgeCheck size={28} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      title: t("aboutUs.services.investor.title"),
      description: t("aboutUs.services.investor.desc"),
      linkColor: "text-primary",
      href: "/services/investor-services",
    },
    {
      icon: <Monitor size={28} />,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-500",
      title: t("aboutUs.services.electronic.title"),
      description: t("aboutUs.services.electronic.desc"),
      linkColor: "text-primary",
      href: "/services/electronic-services",
    },
    {
      icon: <Building2 size={28} />,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      title: t("aboutUs.services.establishment.title"),
      description: t("aboutUs.services.establishment.desc"),
      linkColor: "text-secondary",
      href: "/services/company-establishment",
    },
    {
      icon: <HeadsetIcon size={28} />,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      title: t("aboutUs.services.support.title"),
      description: t("aboutUs.services.support.desc"),
      linkColor: "text-secondary",
      href: "/services/technical-support",
    },
    {
      icon: <Briefcase size={28} />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      title: t("aboutUs.services.consulting.title"),
      description: t("aboutUs.services.consulting.desc"),
      linkColor: "text-purple-500",
      href: "/services/consulting",
    },
    {
      icon: <DollarSign size={28} />,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
      title: t("aboutUs.services.wps.title"),
      description: t("aboutUs.services.wps.desc"),
      linkColor: "text-primary",
      href: "/services/wps",
    },
    {
      icon: <Scale size={28} />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      title: t("aboutUs.services.legal.title"),
      description: t("aboutUs.services.legal.desc"),
      linkColor: "text-yellow-500",
      href: "/services/legal",
    },
  ];

  return (
    <section className="w-full">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <SpecialHeader
          header={t("aboutUs.services.header")}
          desc={t("aboutUs.services.desc")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-300">
      <div
        className={[
          "w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0",
          service.iconBg,
          service.iconColor,
        ].join(" ")}
      >
        {service.icon}
      </div>

      <h3 className="text-base font-bold text-gray-900 leading-snug">
        {service.title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed flex-1">
        {service.description}
      </p>
    </div>
  );
}
