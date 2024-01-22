"use client";

import { useState } from "react";
import ControlPanel from "@/components/control-panel";
import OledScreen from "@/components/oled-screen";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main
      className="bg-green-100 text-white flex flex-col"
      style={{ boxShadow: "inset 0 0 0 2px red" }}
    >
      <div className="p-2" style={{ backgroundColor: "rgba(0,0,0,.8)" }}>
        <div className="">Marioneto v0.12</div>
      </div>

      <div className="flex flex-row p-2 flex-1">
        <div className="bg-yellow-400 flex-1 p-2">
          <ControlPanel />
        </div>
        <div className="bg-pink-400 flex-1">
          <OledScreen />
        </div>
      </div>
    </main>
  );
}
