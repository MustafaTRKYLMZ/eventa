const StairsSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50" // Küçük boyutlar
      width="50" // SVG'nin boyutunu küçülttük
      height="50"
    >
      {/* Background */}
      <rect width="50" height="50" fill="transparent" />

      {/* Stairs */}
      <g fill="rgba(255, 69, 0, 0.5)" stroke="#5A3311" strokeWidth="1">
        {/* First Step */}
        <rect x="5" y="40" width="45" height="5" />
        {/* Second Step */}
        <rect x="10" y="30" width="35" height="5" />
        {/* Third Step */}
        <rect x="15" y="20" width="25" height="5" />
        {/* Fourth Step */}
        <rect x="20" y="10" width="15" height="5" />
        {/* Fifth Step */}
        <rect x="25" y="0" width="5" height="5" />
      </g>

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="stairsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StairsSVG;
