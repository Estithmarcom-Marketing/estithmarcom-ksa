import "@/app/globals.css";
import React from "react";
import NavBar from "./_components/nav-bar";
import Footer from "./_components/footer";
import { getSettings } from "@/lib/apis/settings";
import { getStaticPages } from "@/lib/apis/static-page";
import EmbeddedChat from "@/components/global/embedded-chat";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings()
  const pages = await getStaticPages()
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} pages={pages} />
      <EmbeddedChat />
    </div>
  );
}
