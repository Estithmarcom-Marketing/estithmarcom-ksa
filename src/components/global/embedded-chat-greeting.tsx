"use client";

import { useEffect, useState } from "react";

const ARABIC_GREETING =
  "مرحبًا، هل تحتاج إلى مساعدة؟";
const ENGLISH_GREETING =
  "Hello, do you need help?";

const INITIAL_DELAY_MS = 500;
const CHARACTER_DELAY_MS = 70;
const HOLD_MS = 2600;
const HIDDEN_MS = 700;

interface EmbeddedChatGreetingProps {
  locale: string;
  visible: boolean;
  onOpen: () => void;
}

export function EmbeddedChatGreeting({
  locale,
  visible,
  onOpen,
}: EmbeddedChatGreetingProps) {
  const [dismissed, setDismissed] = useState(false);
  const [displayedGreeting, setDisplayedGreeting] =
    useState("");
  const [cycleVisible, setCycleVisible] =
    useState(false);

  const greetingText =
    locale === "ar"
      ? ARABIC_GREETING
      : ENGLISH_GREETING;

  useEffect(() => {
    if (visible) {
      setDismissed(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || dismissed) {
      setDisplayedGreeting("");
      setCycleVisible(false);
      return;
    }

    let cancelled = false;
    let timerId: number | undefined;

    function runCycle() {
      setDisplayedGreeting("");
      setCycleVisible(false);

      timerId = window.setTimeout(() => {
        if (cancelled) return;

        setCycleVisible(true);
        let characterIndex = 0;

        function typeNextCharacter() {
          if (cancelled) return;

          characterIndex += 1;
          setDisplayedGreeting(
            greetingText.slice(0, characterIndex),
          );

          if (characterIndex < greetingText.length) {
            timerId = window.setTimeout(
              typeNextCharacter,
              CHARACTER_DELAY_MS,
            );
            return;
          }

          timerId = window.setTimeout(() => {
            if (cancelled) return;

            setCycleVisible(false);
            timerId = window.setTimeout(
              runCycle,
              HIDDEN_MS,
            );
          }, HOLD_MS);
        }

        typeNextCharacter();
      }, INITIAL_DELAY_MS);
    }

    runCycle();

    return () => {
      cancelled = true;

      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
    };
  }, [dismissed, greetingText, visible]);

  if (!visible || dismissed) {
    return null;
  }

  const isTyping =
    displayedGreeting.length < greetingText.length;

  const interactionClass =
    cycleVisible
      ? "pointer-events-auto"
      : "pointer-events-none";

  return (
    <div
      className={[
        "fixed bottom-[84px] z-[2147483001]",
        "flex items-center gap-2 pointer-events-none",
        locale === "ar"
          ? "left-5 sm:left-6"
          : "right-5 sm:right-6",
        "transition-all duration-300",
        cycleVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-1",
      ].join(" ")}
    >
      <button
        type="button"
        className={[
          "w-[230px] min-h-10",
          "max-w-[calc(100vw-6.5rem)]",
          "rounded-2xl bg-white px-4 py-2.5",
          "text-sm font-medium text-gray-800",
          "shadow-[0_10px_30px_rgba(15,23,42,0.18)]",
          "border border-gray-100",
          "hover:bg-gray-50 transition-colors",
          "cursor-pointer",
          interactionClass,
        ].join(" ")}
        onClick={onOpen}
        aria-label={greetingText}
        tabIndex={cycleVisible ? 0 : -1}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <span
          className="whitespace-nowrap"
          aria-hidden="true"
        >
          {displayedGreeting}

          {isTyping && (
            <span className="inline-block mx-0.5 text-[#c99f3d] animate-pulse">
              |
            </span>
          )}
        </span>
      </button>

      <button
        type="button"
        className={[
          "w-10 h-10 shrink-0 rounded-full",
          "bg-white text-gray-600",
          "shadow-[0_8px_24px_rgba(15,23,42,0.16)]",
          "border border-gray-100",
          "flex items-center justify-center",
          "hover:text-gray-900 hover:bg-gray-50",
          "transition-colors cursor-pointer",
          interactionClass,
        ].join(" ")}
        onClick={() => setDismissed(true)}
        aria-label={
          locale === "ar"
            ? "إخفاء رسالة الترحيب"
            : "Hide welcome message"
        }
        tabIndex={cycleVisible ? 0 : -1}
      >
        <span
          className="text-2xl leading-none"
          aria-hidden="true"
        >
          ×
        </span>
      </button>
    </div>
  );
}
