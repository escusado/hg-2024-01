"use client";

import { FC, useRef, useState, useEffect } from "react";

const OledScreen: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 128 x 32 0s filled matrix
  const screenModel = Array.from({ length: 128 }, () => {
    return Array.from({ length: 32 }, () => (Math.random() < 0.5 ? 0 : 1));
  });

  useEffect(() => {
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

  return (
    <canvas
      width="128"
      height="32"
      ref={canvasRef}
      style={{ width: "100%", imageRendering: "pixelated" }}
    ></canvas>
  );
};

export default OledScreen;
