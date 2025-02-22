"use client"

import dynamic from "next/dynamic";
//import "reactjs-tiptap-editor/style.css";

const ReactEditor = dynamic(() => import("@/app/components/ReactEditor"), { ssr: false });

export default function Home() {
  return (
    <div>
      <ReactEditor/>
    </div>
  );
}
