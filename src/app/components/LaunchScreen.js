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
          className="text-black bg-blue-500 shadow-2xl rounded-4xl cursor-pointer"
          onClick={() => setIsLaunch(false)}
        >
          <Image src={lanuch} width={500} height={500} alt="Launch Logo" />
        </div>
      </div>
    );
  }

  return children;
}
