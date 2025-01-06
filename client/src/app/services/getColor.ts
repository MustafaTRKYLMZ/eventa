export const getColor = (
  index: number,
  type: "floor" | "section" | "row" | "seat"
) => {
  const colorPalette = {
    floor: ["#F8BBD0", "#FFF59D", "#B3E5FC", "#C8E6C9", "#FFCCBC"],
    section: ["#F0F8FF", "#FAFAD2", "#FFD700", "#90EE90", "#ADD8E6"],
    row: ["#FFEBEE", "#FFCDD2", "#C8E6C9", "#FFF9C4", "#E3F2FD"],
    seat: ["#FFD700", "#66BB6A", "#FF6347", "#7B68EE", "#FF8C00"],
  };

  const typeColors = colorPalette[type];
  return typeColors[index % typeColors.length];
};
