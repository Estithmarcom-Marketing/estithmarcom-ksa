"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Send, Check, ChevronRight } from "lucide-react"
import { useLocale } from "@/hooks/use-locale"
import { getTranslator } from "@/lib/i18n"
import { chatbotServices, type ServiceNode } from "@/data/chatbot-services"
import { PhoneInput } from "@/components/global/phone-input"
import { isValidPhoneNumber } from "libphonenumber-js"
import Image from "next/image"
import chatbotImg from "@/assets/chatbot.svg"
import logo from "@/assets/logo4.png"

interface ChatMessage {
  id: string
  type: "bot" | "user"
  text: string
}

type InputMode =
  | "none"
  | "service"
  | "text"
  | "phone"
  | "details"
  | "confirm"
  | "success"

export default function Chatbot() {
  const locale = useLocale()
  const { t } = getTranslator(locale)

  const [isOpen, setIsOpen] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMode, setInputMode] = useState<InputMode>("none")
  const [serviceLevel, setServiceLevel] = useState(0)
  const [serviceNodes, setServiceNodes] = useState<ServiceNode[]>([])
  const [nameValue, setNameValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [detailsValue, setDetailsValue] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setShowPanel(true)
      setTimeout(() => setAnimateContent(true), 30)
    } else {
      setAnimateContent(false)
      initialized.current = false
      const timer = setTimeout(() => {
        setShowPanel(false)
        setMessages([])
        setInputMode("none")
        setServiceLevel(0)
        setServiceNodes([])
        setNameValue("")
        setTextValue("")
        setPhoneValue("")
        setDetailsValue("")
        setServices([])
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true
      initChat()
    }
  }, [isOpen])

  function addMessage(msg: ChatMessage) {
    setMessages((prev) => [...prev, msg])
  }

  function initChat() {
    addMessage({ id: "greeting", type: "bot", text: t("chatbot.greeting" as any) })
    setTimeout(() => {
      addMessage({
        id: "services-1",
        type: "bot",
        text: t("chatbot.selectService" as any),
      })
      setServiceLevel(0)
      setServiceNodes(chatbotServices)
      setInputMode("service")
    }, 500)
  }

  function handleOptionClick(node: ServiceNode) {
    const label = t(node.label as any)
    const newServices = [...services]
    newServices[serviceLevel] = label
    setServices(newServices)
    addMessage({ id: `user-${Date.now()}`, type: "user", text: label })

    const hasChildren = node.children && node.children.length > 0
    const nextLevel = serviceLevel + 1

    if (hasChildren && nextLevel < 3) {
      setServiceLevel(nextLevel)
      setServiceNodes(node.children!)
      setTimeout(() => {
        addMessage({
          id: `services-${nextLevel + 1}`,
          type: "bot",
          text: t("chatbot.selectService" as any),
        })
      }, 300)
    } else {
      setInputMode("text")
      setServiceNodes([])
      setTimeout(() => {
        addMessage({ id: "ask-name", type: "bot", text: t("chatbot.typeName" as any) })
      }, 300)
    }
  }

  function handleTextSend(e: React.FormEvent) {
    e.preventDefault()
    const val = textValue.trim()
    if (!val) return
    setNameValue(val)
    addMessage({ id: `user-${Date.now()}`, type: "user", text: val })
    setTextValue("")
    setInputMode("phone")
    setTimeout(() => {
      addMessage({ id: "ask-phone", type: "bot", text: t("chatbot.typePhone" as any) })
    }, 300)
  }

  function handlePhoneSend(e: React.FormEvent) {
    e.preventDefault()
    if (!phoneValue || !isValidPhoneNumber(phoneValue)) return
    addMessage({ id: `user-${Date.now()}`, type: "user", text: phoneValue })
    setInputMode("details")
    setTimeout(() => {
      addMessage({ id: "ask-details", type: "bot", text: t("chatbot.typeDetails" as any) })
    }, 300)
  }

  function handleDetailsSend(e: React.FormEvent) {
    e.preventDefault()
    const value = detailsValue
    if (!value || !value.trim()) return
    addMessage({ id: `user-${Date.now()}`, type: "user", text: value })
    setInputMode("confirm")
    setTimeout(() => {
      addMessage({ id: "summary", type: "bot", text: t("chatbot.confirmTitle" as any) })
    }, 300)
  }

  function handleSubmit() {
    setSubmitting(true)
    const payload = {
      name: nameValue,
      phone: phoneValue,
      services: services.filter(Boolean),
      details: detailsValue,
    }
    console.log("Chatbot Payload:", payload)
    setInputMode("success")
  }

  function renderBotBubble(msg: ChatMessage) {
    return (
      <div key={msg.id} className="flex items-start mb-3">
        <div className="w-7 h-7 rounded-full bg-[#44295a] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
          <Image src={logo} alt="logo" width={25} height={25} />
        </div>
        <div
          className={`mx-2 px-3.5 py-2.5 rounded-2xl bg-[#44295a] text-white text-sm leading-relaxed max-w-[80%] ${
            locale === "ar" ? "rounded-br-sm" : "rounded-bl-sm"
          }`}
        >
          <p>{msg.text}</p>
        </div>
      </div>
    )
  }

  function renderUserBubble(msg: ChatMessage) {
    return (
      <div key={msg.id} className="flex justify-end mb-3">
        <div
          className={`px-3.5 py-2.5 rounded-2xl bg-[#b99745] text-white text-sm leading-relaxed max-w-[80%] ${
            locale === "ar" ? "rounded-bl-sm" : "rounded-br-sm"
          }`}
          dir={msg.text.startsWith("+") ? "ltr" : undefined}
        >
          <p>{msg.text}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />}

      <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-3">
        {showPanel && (
          <div
            className={`w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ease-out flex flex-col ${
              animateContent
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
            style={{ height: "min(600px, calc(100vh - 120px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#44295a] text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  <Image src={logo} alt="logo" width={25} height={25} />
                </div>
                <p className="text-sm font-semibold">{t("chatbot.title" as any)}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 hide-scrollbar">
              {messages.map((msg) =>
                msg.type === "bot" ? renderBotBubble(msg) : renderUserBubble(msg)
              )}

              {inputMode === "success" && (
                <div className="text-center py-6 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-7 h-7" />
                  </div>
                  <p className="text-gray-800 font-semibold text-sm mb-3">{t("chatbot.success" as any)}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-[#b99745] hover:underline font-medium"
                  >
                    {t("chatbot.close" as any)}
                  </button>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {inputMode === "service" && (
              <div className="shrink-0 border-t border-gray-100 px-4 py-3 max-h-48 overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-1.5">
                  {serviceNodes.map((node) => (
                    <button
                      key={node.label}
                      onClick={() => handleOptionClick(node)}
                      className="w-full text-start px-3.5 py-2.5 rounded-xl border border-[#b99745]/30 bg-white hover:bg-[#b99745]/10 transition-colors text-sm font-medium text-gray-800 flex items-center justify-between group"
                    >
                      <span>{t(node.label as any)}</span>
                      {node.children && node.children.length > 0 && (
                        <ChevronRight
                          className={`w-4 h-4 text-[#b99745] group-hover:translate-x-0.5 transition-transform ${
                            locale === "ar" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {inputMode === "text" && (
              <form onSubmit={handleTextSend} className="shrink-0 border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder={t("chatbot.namePlaceholder" as any)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b99745]/50 focus:border-[#b99745] transition-all"
                    autoFocus
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  />
                  <button
                    type="submit"
                    disabled={!textValue.trim()}
                    className="h-10 px-4 rounded-full bg-[#b99745] disabled:bg-gray-300 text-white flex items-center gap-1.5 shrink-0 transition-colors text-sm font-medium"
                  >
                    <Send className="w-4 h-4" />
                    {t("chatbot.send" as any)}
                  </button>
                </div>
              </form>
            )}

            {inputMode === "phone" && (
              <form onSubmit={handlePhoneSend} className="shrink-0 border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <PhoneInput
                      value={phoneValue}
                      onChange={setPhoneValue}
                      placeholder={t("chatbot.phoneLabel" as any)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!phoneValue || !isValidPhoneNumber(phoneValue)}
                    className="h-10 px-4 rounded-full bg-[#b99745] disabled:bg-gray-300 text-white flex items-center gap-1.5 shrink-0 transition-colors text-sm font-medium mt-2"
                  >
                    <Send className="w-4 h-4" />
                    {t("chatbot.send" as any)}
                  </button>
                </div>
              </form>
            )}

            {inputMode === "details" && (
              <form onSubmit={handleDetailsSend} className="shrink-0 border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={detailsValue}
                    onChange={(e) => setDetailsValue(e.target.value)}
                    placeholder={t("chatbot.detailsPlaceholder" as any)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#b99745]/50 focus:border-[#b99745] transition-all"
                    autoFocus
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-full bg-[#b99745] hover:bg-[#a6863a] text-white flex items-center gap-1.5 shrink-0 transition-colors text-sm font-medium"
                  >
                    <Send className="w-4 h-4" />
                    {t("chatbot.send" as any)}
                  </button>
                </div>
              </form>
            )}

            {inputMode === "confirm" && (
              <div className="shrink-0 border-t border-gray-100 px-4 py-3">
                <button
                  onClick={handleSubmit}
                  disabled={false}
                  className="w-full py-2.5 bg-[#b99745] hover:bg-[#a6863a] disabled:bg-gray-300 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {t("chatbot.submit" as any)}
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-gray-700 rotate-90 scale-110"
              : "bg-secondary hover:bg-secondary/80 cursor-pointer"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Image src={chatbotImg} alt="chatbot" width={50} height={50} />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  )
}
