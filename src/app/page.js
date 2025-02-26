"use client";
import HomePage from "@/pages/HomePage";
import dynamic from "next/dynamic";
const TawkToChat = dynamic(() => import("@/components/TawkToChat"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <HomePage />
      <TawkToChat />
     
    </>
  );
}
