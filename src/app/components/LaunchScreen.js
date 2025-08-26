"use client";

import { useState } from "react";
import Image from "next/image";

import lanuch from "../../../public/lanuch.png";

export default function LaunchScreen({ children }) {
  const [isLaunch, setIsLaunch] = useState(true);

  if (isLaunch) {
    return (
      <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-white">
        <div
          className="text-black flex items-center flex-col cursor-pointer"
          onClick={() => setIsLaunch(false)}
        >
          <Image src={lanuch} width={350} height={350} alt="Launch Logo" />
          <p className="text-gray-400 mt-4">-version 0.2</p>
        </div>
      </div>
    );
  }

  return children;
}
