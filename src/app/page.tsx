"use client"

import dynamic from "next/dynamic";

const ReactEditor = dynamic(() => import("@/pages/ReactEditor"), { ssr: false });

export default function Home() {
  return (
    <div>
      <ReactEditor/>
    </div>
  );
}
