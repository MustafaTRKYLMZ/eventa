import { FC } from "react";

export type SeatProps = {
  type: "standard" | "vip" | "accessible";
  seatNumber?: string;
};

export type SeatStyle = {
  fill: string;
  label: string;
  labelStyle?: {
    fontSize?: string;
    fontWeight?: string;
    fill?: string;
    textShadow?: string;
  };
};
const seatStyles: Record<SeatProps["type"], SeatStyle> = {
  standard: {
    fill: "url(#gradientStandard)",
    label: "Standard",
  },
  vip: {
    fill: "url(#gradientVip)",
    label: "VIP",
  },
  accessible: {
    fill: "url(#gradientAccessible)",
    label: "♿",
    labelStyle: {
      fontSize: "24px",
      fontWeight: "bold",
      fill: "#fff",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
  },
};

export const SeatSVG: FC<SeatProps> = ({ type, seatNumber }) => {
  const { fill, label, labelStyle = {} } = seatStyles[type] || {};

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="w-12 h-12 mx-auto"
    >
      {/* Main seat */}
      <rect
        x="40"
        y="40"
        width="120"
        height="60"
        rx="15"
        ry="15"
        fill={fill || "#ccc"}
        stroke="#ccc"
        strokeWidth="2"
      />
      {/* VIP seat */}
      <rect
        x="40"
        y="100"
        width="120"
        height="60"
        rx="15"
        ry="15"
        fill={type === "vip" ? "#e63946" : "#ffcc00"}
        stroke="#ccc"
        strokeWidth="2"
      />

      {/* Armrests of the seat */}
      <rect x="0" y="50" width="30" height="30" rx="5" ry="5" fill="#999" />
      <rect x="170" y="50" width="30" height="30" rx="5" ry="5" fill="#999" />

      {/* Seat footrest */}
      <rect x="40" y="170" width="120" height="30" rx="5" ry="5" fill="#444" />

      {/* Seat number (if available) */}
      {seatNumber && (
        <text
          x="100"
          y="105"
          fontSize="14"
          textAnchor="middle"
          fill="#000"
          fontWeight="bold"
          className="p-2"
        >
          {seatNumber}
        </text>
      )}

      {/* Seat type label */}
      {label && (
        <text
          x="100"
          y="75"
          fontSize={labelStyle?.fontSize || "14"}
          textAnchor="middle"
          fill={labelStyle?.fill || "#000"}
          fontWeight={labelStyle?.fontWeight || "normal"}
          style={{ textShadow: labelStyle?.textShadow }}
        >
          {label}
        </text>
      )}

      {/* Accessible seat icon (only for accessible type) */}
      {type === "accessible" && (
        <circle cx="100" cy="75" r="7" fill="#4fa3ff" opacity="0.5" />
      )}

      <defs>
        {/* Gradient for standard seat */}
        <linearGradient
          id="gradientStandard"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="1" />
          <stop offset="100%" stopColor="#e0b400" stopOpacity="1" />
        </linearGradient>

        {/* Gradient for VIP seat */}
        <linearGradient id="gradientVip" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e63946" stopOpacity="1" />
          <stop offset="100%" stopColor="#a02832" stopOpacity="1" />
        </linearGradient>

        {/* Gradient for accessible seat */}
        <linearGradient
          id="gradientAccessible"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#4fa3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#2e72cc" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
