import "@/app/globals.css";
import React from "react";
import NavBar from "./_components/nav-bar";
import Footer from "./_components/footer";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
