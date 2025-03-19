"use client"
import dynamic from "next/dynamic";
import HeroSection from "./components/Home/HeroSection";
//import "reactjs-tiptap-editor/style.css";
const ReactEditor = dynamic(() => import("@/app/components/ReactEditor"), { ssr: false });

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      {/* <ReactEditor/> */}
    </div>
  );
}
