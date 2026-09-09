"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  EMBEDDED_CHAT_OPEN_EVENT,
  createEmbeddedChatOpenMessage,
  isEmbeddedChatOpenRequest,
  isEmbeddedChatReadyMessage,
  isEmbeddedChatStateMessage,
  type EmbeddedChatOpenRequest,
  type EmbeddedChatViewState,
} from "@/lib/chat/embedded-chat-bridge";

const WIDGET_ENABLED =
  process.env.NEXT_PUBLIC_CHAT_WIDGET_ENABLED === "true";

function EnabledEmbeddedChat() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const pendingRequestRef = useRef<EmbeddedChatOpenRequest | undefined>(undefined);
  const requestedOpenRef = useRef(false);
  const viewStateRef = useRef<EmbeddedChatViewState>("closed");
  const [viewState, setViewState] =
    useState<EmbeddedChatViewState>("closed");

  const updateViewState = useCallback((state: EmbeddedChatViewState) => {
    viewStateRef.current = state;
    setViewState(state);
  }, []);

  const sendOpenRequest = useCallback((request: EmbeddedChatOpenRequest) => {
    const targetWindow = iframeRef.current?.contentWindow;
    if (!targetWindow) return false;

    targetWindow.postMessage(
      createEmbeddedChatOpenMessage(request),
      window.location.origin,
    );
    return true;
  }, []);

  useEffect(() => {
    function handleChatCommand(event: Event) {
      if (!(event instanceof CustomEvent)) return;
      if (!isEmbeddedChatOpenRequest(event.detail)) return;

      requestedOpenRef.current = viewStateRef.current !== "open";
      updateViewState("open");

      if (readyRef.current && sendOpenRequest(event.detail)) {
        pendingRequestRef.current = undefined;
      } else {
        pendingRequestRef.current = event.detail;
      }
    }

    window.addEventListener(EMBEDDED_CHAT_OPEN_EVENT, handleChatCommand);
    return () => {
      window.removeEventListener(EMBEDDED_CHAT_OPEN_EVENT, handleChatCommand);
    };
  }, [sendOpenRequest, updateViewState]);

  useEffect(() => {
    function handleFrameMessage(event: MessageEvent<unknown>) {
      const frameWindow = iframeRef.current?.contentWindow;
      if (!frameWindow || event.source !== frameWindow) return;
      if (event.origin !== window.location.origin) return;

      if (isEmbeddedChatReadyMessage(event.data)) {
        readyRef.current = true;
        const pendingRequest = pendingRequestRef.current;
        if (pendingRequest && sendOpenRequest(pendingRequest)) {
          pendingRequestRef.current = undefined;
        }
        return;
      }

      if (!isEmbeddedChatStateMessage(event.data)) return;
      const nextState = event.data.payload.state;

      if (nextState === "closed" && requestedOpenRef.current) {
        return;
      }

      requestedOpenRef.current = false;
      updateViewState(nextState);
    }

    window.addEventListener("message", handleFrameMessage);
    return () => window.removeEventListener("message", handleFrameMessage);
  }, [sendOpenRequest, updateViewState]);

  const isExpanded = viewState === "open";

  return (
    <div
      data-chat-view-state={viewState}
      className={[
        "fixed bottom-0 end-0 z-[2147483000] overflow-hidden bg-transparent",
        "transition-[width,height] duration-300 motion-reduce:transition-none",
        isExpanded
          ? "h-[100dvh] w-screen sm:h-[min(720px,calc(100dvh-16px))] sm:w-[420px]"
          : "h-[72px] w-[72px]",
      ].join(" ")}
    >
      <iframe
        ref={iframeRef}
        src="/chat-widget/index.html"
        title="محادثة استثماركوم"
        className="h-full w-full border-0 bg-transparent"
        loading="eager"
        referrerPolicy="origin"
        onLoad={() => {
          readyRef.current = false;
        }}
      />
    </div>
  );
}

export default function EmbeddedChat() {
  if (!WIDGET_ENABLED) return null;
  return <EnabledEmbeddedChat />;
}
