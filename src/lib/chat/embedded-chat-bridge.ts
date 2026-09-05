export const EMBEDDED_CHAT_OPEN_EVENT = "estithmarcom:chat-open";
export const EMBEDDED_CHAT_OPEN_MESSAGE = "estithmarcom.chat.open";
export const EMBEDDED_CHAT_READY_MESSAGE = "estithmarcom.chat.ready";
export const EMBEDDED_CHAT_STATE_MESSAGE = "estithmarcom.chat.state";
export const EMBEDDED_CHAT_PROTOCOL_VERSION = 1;

export type EmbeddedChatTargetType = "category" | "group" | "service";
export type EmbeddedChatLocale = "ar" | "en";
export type EmbeddedChatViewState = "closed" | "open" | "minimized";

export interface EmbeddedChatOpenRequest {
  targetType: EmbeddedChatTargetType;
  targetId: string;
  source?: string;
  websiteServiceId?: string | number;
  pageUrl?: string;
  locale?: EmbeddedChatLocale;
  requestId?: string;
}

export interface EmbeddedChatStateMessage {
  type: typeof EMBEDDED_CHAT_STATE_MESSAGE;
  version: typeof EMBEDDED_CHAT_PROTOCOL_VERSION;
  payload: {
    state: EmbeddedChatViewState;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIdentifier(value: unknown, maximumLength = 128): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximumLength &&
    /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value)
  );
}

function isSafePageUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return false;
  }
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isEmbeddedChatOpenRequest(
  value: unknown,
): value is EmbeddedChatOpenRequest {
  if (!isRecord(value)) return false;
  if (
    value.targetType !== "category" &&
    value.targetType !== "group" &&
    value.targetType !== "service"
  ) {
    return false;
  }
  if (!isIdentifier(value.targetId)) return false;
  if (value.source !== undefined && !isIdentifier(value.source, 64)) return false;
  if (
    value.websiteServiceId !== undefined &&
    !(
      (typeof value.websiteServiceId === "string" && /^\d{1,32}$/.test(value.websiteServiceId)) ||
      (typeof value.websiteServiceId === "number" &&
        Number.isSafeInteger(value.websiteServiceId) &&
        value.websiteServiceId > 0)
    )
  ) {
    return false;
  }
  if (
    value.locale !== undefined &&
    value.locale !== "ar" &&
    value.locale !== "en"
  ) {
    return false;
  }
  if (value.requestId !== undefined && !isIdentifier(value.requestId)) return false;
  if (
    value.pageUrl !== undefined &&
    !isSafePageUrl(value.pageUrl)
  ) {
    return false;
  }
  return true;
}

export function isEmbeddedChatStateMessage(
  value: unknown,
): value is EmbeddedChatStateMessage {
  if (!isRecord(value)) return false;
  if (value.type !== EMBEDDED_CHAT_STATE_MESSAGE) return false;
  if (value.version !== EMBEDDED_CHAT_PROTOCOL_VERSION) return false;
  if (!isRecord(value.payload)) return false;
  return (
    value.payload.state === "closed" ||
    value.payload.state === "open" ||
    value.payload.state === "minimized"
  );
}

export function isEmbeddedChatReadyMessage(value: unknown): boolean {
  return (
    isRecord(value) &&
    value.type === EMBEDDED_CHAT_READY_MESSAGE &&
    value.version === EMBEDDED_CHAT_PROTOCOL_VERSION
  );
}

export function createEmbeddedChatOpenMessage(request: EmbeddedChatOpenRequest) {
  return {
    type: EMBEDDED_CHAT_OPEN_MESSAGE,
    version: EMBEDDED_CHAT_PROTOCOL_VERSION,
    payload: request,
  } as const;
}

export function openEmbeddedChat(request: EmbeddedChatOpenRequest): boolean {
  if (
    typeof window === "undefined" ||
    process.env.NEXT_PUBLIC_CHAT_WIDGET_ENABLED !== "true" ||
    !isEmbeddedChatOpenRequest(request)
  ) {
    return false;
  }

  window.dispatchEvent(
    new CustomEvent<EmbeddedChatOpenRequest>(EMBEDDED_CHAT_OPEN_EVENT, {
      detail: request,
    }),
  );
  return true;
}
