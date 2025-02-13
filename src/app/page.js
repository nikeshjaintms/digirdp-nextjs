"use client";
import HomePage from "@/pages/HomePage";
import dynamic from "next/dynamic";
// Dynamically import ClientScripts with SSR disabled to avoid hydration issues
const ClientScripts = dynamic(() => import("@/components/ClientScripts"), {
  ssr: false,
});
const TawkToChat = dynamic(() => import("@/components/TawkToChat"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomePage />
      <ClientScripts />
      <TawkToChat />
    </>
  );
}
