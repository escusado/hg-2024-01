"use client";

import OledScreen from "@/lib/oled-screen";
import { useState } from "react";

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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Left
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Right
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Forward
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Backward
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Screen smile :)
          </button>
        </div>
        <div className="bg-pink-400 flex-1">
          <OledScreen />
        </div>
      </div>
    </main>
  );
}
