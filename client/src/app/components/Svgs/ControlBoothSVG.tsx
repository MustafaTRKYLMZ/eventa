import React from "react";

const ControlBoothSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      width="100"
      height="50"
      className="p-2 gap-2"
    >
      {/* Base Table */}
      <rect x="5" y="20" width="90" height="20" rx="2" fill="#9e9e9e" />

      {/* Screen */}
      <rect x="30" y="5" width="40" height="10" rx="1" fill="#4caf50" />
      <rect x="32" y="7" width="36" height="6" rx="1" fill="#ffffff" />

      {/* Knobs */}
      <circle cx="15" cy="30" r="3" fill="#f44336" />
      <circle cx="25" cy="30" r="3" fill="#2196f3" />
      <circle cx="35" cy="30" r="3" fill="#ffeb3b" />
      <circle cx="45" cy="30" r="3" fill="#4caf50" />
      <circle cx="55" cy="30" r="3" fill="#ff5722" />
      <circle cx="65" cy="30" r="3" fill="#9c27b0" />
      <circle cx="75" cy="30" r="3" fill="#00bcd4" />
    </svg>
  );
};

export default ControlBoothSVG;
