"use client";

import { FC } from "react";

type ControlPanelProps = {
  className?: string;
};

const ControlPanel: FC<ControlPanelProps> = ({ className }) => {
  return (
    <div className="bg-neutral-200">
      <div className="text-neutral-500">Controls:</div>
      <div className="text-sm">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ⏪
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          ⏩
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          🔼
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          🔽
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          🤖
        </button> */}
      </div>
    </div>
  );
};

export default ControlPanel;
