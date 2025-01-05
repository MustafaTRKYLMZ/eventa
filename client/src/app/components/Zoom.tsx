import React, { FC } from "react";

export type ZoomProps = {
  setScale: React.Dispatch<React.SetStateAction<number>>;
};

export const Zoom: FC<ZoomProps> = ({ setScale }) => {
  const handleZoomIn = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.min(prev + 0.1, 3));
  };

  return (
    <div
      className="space-x-2 flex items-end flex-col gap-2 justify-center rounded "
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={handleZoomIn}
        style={{
          background: "linear-gradient(135deg, #8b0000, #000000)",
          color: "white",
        }}
        className="px-4 py-2 rounded shadow-lg hover:opacity-90 transition-opacity"
      >
        -
      </button>
      <button
        onClick={handleZoomOut}
        style={{
          background: "linear-gradient(135deg, #8b0000, #000000)",
          color: "white",
        }}
        className="px-4 py-2 rounded shadow-lg hover:opacity-90 transition-opacity"
      >
        +
      </button>
    </div>
  );
};
