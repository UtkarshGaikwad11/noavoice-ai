"use client";

import Lottie from "lottie-react";
import animationData from "../../public/loader.json";

export default function Loader() {
  return (
    <div className="w-40 h-40">
      <Lottie animationData={animationData} loop />
    </div>
  );
}