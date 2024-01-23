"use client";

import { FC, useRef, useState, useEffect } from "react";

// 128 x 32 0s filled matrix
const zerosScreen: (1 | 0)[][] = Array.from({ length: 128 }, () => {
  return Array.from({ length: 32 }, () => 0);
  // return Array.from({ length: 32 }, () => (Math.random() > 0.5 ? 1 : 0));
});

const OledScreen: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenModel, setScreenModel] = useState(zerosScreen);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    console.log("🧀>>> updateing");
    if (context) {
      // draw pixels from model
      screenModel.forEach((row, x) => {
        row.forEach((pixel, y) => {
          context.fillStyle = pixel > 0 ? "white" : "black";
          context.fillRect(x, y, 1, 1);
        });
      });

      // background+frame
      context.fillStyle = "#00000000";
      context.globalCompositeOperation = "destination-over";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.globalCompositeOperation = "source-over";
      context.lineWidth = 2;
      context.strokeStyle = "#FF000055";
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }, [screenModel, context]);

  const handleExpressionClick = () => {
    const randomX = Math.floor(Math.random() * 128);
    const randomY = Math.floor(Math.random() * 32);
    setScreenModel(addSmileyFace(randomX, randomY, [...screenModel]));
  };

  return (
    <>
      <canvas
        width="128"
        height="32"
        ref={canvasRef}
        style={{ width: "100%", imageRendering: "pixelated" }}
      ></canvas>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={handleExpressionClick}
      >
        🤖
      </button>
    </>
  );
};

const addSmileyFace = (x: number, y: number, screenModel: (1 | 0)[][]) => {
  const face = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  //get screenModel Size
  const screenModelWidth = screenModel.length;
  const screenModelHeight = screenModel[0].length;

  //get face size
  const faceWidth = face.length;
  const faceHeight = face[0].length;

  // draw face and overflow if needed
  for (let i = 0; i < faceWidth; i++) {
    for (let j = 0; j < faceHeight; j++) {
      if (face[i][j]) {
        const xIndex = x + i;
        const yIndex = y + j;

        if (xIndex < screenModelWidth && yIndex < screenModelHeight) {
          screenModel[xIndex][yIndex] = face[i][j] as 1 | 0;
        }
      }
    }
  }

  return screenModel;
};

export default OledScreen;
