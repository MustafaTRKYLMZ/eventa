export const RowSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 50"
      width="100%"
      height="50"
      fill="none"
      className="p-2"
    >
      <rect width="300" height="50" fill="#f0f0f0" rx="8" />
      <line
        x1="10"
        y1="25"
        x2="290"
        y2="25"
        stroke="#ccc"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <text
        x="150"
        y="30"
        fill="#666"
        fontSize="14"
        fontFamily="Arial, sans-serif"
        textAnchor="middle"
      >
        Row
      </text>
    </svg>
  );
};
