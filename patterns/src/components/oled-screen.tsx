"use client";

import { FC, useRef, useState, useEffect } from "react";

// 128 x 32 0s filled matrix
const zerosScreen = Array.from({ length: 128 }, () => {
  return Array.from({ length: 32 }, () => 0);
});

const OledScreen: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenModel, setScreenModel] = useState(zerosScreen);

  useEffect(() => {
    console.log("🧀>>> sup");
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // background+frame
        ctx.fillStyle = "black";
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "#333333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // draw pixels from model
        screenModel.forEach((row, x) => {
          row.forEach((pixel, y) => {
            if (pixel) {
              ctx.fillStyle = "white";
              ctx.fillRect(x, y, 1, 1);
            }
          });
        });
      }
    }
  }, [canvasRef, screenModel]);

  const handleExpressionClick = () => {
    setScreenModel(addSmileyFace(1, 1, screenModel));
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

const addSmileyFace = (x: number, y: number, screenModel: number[][]) => {
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
          screenModel[xIndex][yIndex] = face[i][j];
        }
      }
    }
  }

  return screenModel;
};

export default OledScreen;
