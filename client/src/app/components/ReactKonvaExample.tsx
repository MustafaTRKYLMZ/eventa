"use client";

import dynamic from "next/dynamic";

const ReactKonva = dynamic(() => import("react-konva"), { ssr: false });

export const ReactKonvaExample = () => {
  const { Stage, Layer, Rect, Text } = ReactKonva;

  return (
    <Stage width={800} height={600}>
      <Layer>
        <Rect x={100} y={100} width={200} height={100} fill="blue" />
        <Text text="Seat 1" x={120} y={120} fontSize={18} fill="white" />
      </Layer>
    </Stage>
  );
};
