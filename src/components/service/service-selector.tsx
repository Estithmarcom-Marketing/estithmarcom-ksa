"use client";

import { JSX, useState } from "react";
import { services_type, ServiceTypeItem } from "@/data/services_type";
import { useLocale } from "@/hooks/use-locale";
import { getTranslator, TranslationKey } from "@/lib/i18n";

interface ServiceSelectorProps {
  onSelect?: (item: ServiceTypeItem | null) => void;
}

function ServiceIcon({ icon, selected }: { icon: string; selected: boolean }) {
  const stroke = selected ? "white" : "currentColor";
  const cls = "w-6 h-6";

  const paths: Record<string, JSX.Element> = {
    "renew-cr": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
    "edit-cr": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    ),
    "new-cr": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    "cancel-cr": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    ),
    "work-visa": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
        />
      </svg>
    ),
    "renew-work": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    ),
    transfer: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
    "exit-visa": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </svg>
    ),
    "building-permit": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
    "commercial-license": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    ),
    "completion-cert": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-.476 3.865 3.745 3.745 0 0 1-3.865.476A3.745 3.745 0 0 1 12 21a3.745 3.745 0 0 1-3.066-1.591 3.745 3.745 0 0 1-3.865-.476 3.745 3.745 0 0 1-.476-3.865A3.745 3.745 0 0 1 3 12a3.745 3.745 0 0 1 1.591-3.066 3.745 3.745 0 0 1 .476-3.865 3.745 3.745 0 0 1 3.865-.476A3.745 3.745 0 0 1 12 3a3.745 3.745 0 0 1 3.066 1.591 3.745 3.745 0 0 1 3.865.476 3.745 3.745 0 0 1 .476 3.865A3.745 3.745 0 0 1 21 12Z"
        />
      </svg>
    ),
    "survey-map": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={1.8}
        className={cls}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
  };

  return paths[icon] ?? null;
}

export function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  const locale = useLocale();
  const { t } = getTranslator(locale);
  const categories = Object.keys(services_type);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (item: ServiceTypeItem) => {
    const newId = selectedId === item.id ? null : item.id;
    setSelectedId(newId);
    onSelect?.(newId ? item : null);
  };

  const currentItems = services_type[activeCategory] ?? [];

  return (
    <div>
      <div className="px-5 pt-5 pb-0">
        <h2
          className={`text-base font-bold text-gray-800 mb-4 ${
            locale === "ar" ? "text-right" : "text-left"
          }`}
        >
          {t("serviceSelector.title" as TranslationKey)}
        </h2>

        <div className="flex gap-0 overflow-hidden overflow-x-auto hide-scrollbar border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setSelectedId(null);
                onSelect?.(null);
              }}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeCategory === cat
                    ? "text-primary border-b-2 border-primary -mb-px"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {t(cat as TranslationKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 grid sm:grid-cols-2 gap-3">
        {currentItems.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`flex flex-col gap-1.5 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                locale === "ar" ? "text-right" : "text-left"
              }
                ${
                  isSelected
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-gray-800 hover:border-primary/40 hover:bg-primary/5"
                }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`p-1.5 rounded-md transition-colors ${
                    isSelected ? "bg-white/20" : "bg-primary/10"
                  }`}
                >
                  <span className={isSelected ? "text-white" : "text-primary"}>
                    <ServiceIcon icon={item.icon} selected={isSelected} />
                  </span>
                </div>
              </div>

              <p
                className={`font-semibold text-sm leading-snug ${isSelected ? "text-white" : "text-gray-800"}`}
              >
                {t(item.title as TranslationKey)}
              </p>
              <p
                className={`text-xs leading-relaxed ${isSelected ? "text-white/80" : "text-gray-500"}`}
              >
                {t(item.description as TranslationKey)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
