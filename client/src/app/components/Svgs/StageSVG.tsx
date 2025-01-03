import { FC } from "react";

const StageSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 100"
      className="w-full h-32 mx-auto"
    >
      {/* Stage Background */}
      <rect
        x="0"
        y="30"
        width="300"
        height="40"
        rx="20"
        fill="url(#stageGradient)"
        stroke="#FF4500"
        strokeWidth="2"
      />

      {/* Stage Border */}
      <path
        d="M10,30 Q150,-20 290,30"
        fill="transparent"
        stroke="#FF4500"
        strokeWidth="3"
      />

      {/* Stage Label */}
      <text
        x="150"
        y="60"
        fontSize="18"
        textAnchor="middle"
        fontWeight="bold"
        fill="#fff"
        style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)" }}
      >
        STAGE
      </text>

      <defs>
        {/* Gradient for Stage */}
        <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4caf50" stopOpacity="1" />
          <stop offset="100%" stopColor="#2e7d32" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StageSVG;
