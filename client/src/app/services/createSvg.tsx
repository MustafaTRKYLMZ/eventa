import * as d3 from "d3";

export type Svg = {
  centerX: number;
  centerY: number;
  radius: number;
  width: number;
  height: number;
  color: string;
  svgRef: React.RefObject<SVGSVGElement>;
  text?: string;
  textColor?: string;
};

export const createSvg = ({
  centerX,
  centerY,
  radius,
  width,
  height,
  color,
  svgRef,
  text,
  textColor,
}: Svg) => {
  const svg = d3.select(svgRef.current);

  svg
    .append("rect")
    .attr("x", centerX - 100)
    .attr("y", centerY - 50)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", color)
    .attr("rx", radius);
  //text
  if (text || textColor) {
    svg
      .append("text")
      .attr("x", centerX)
      .attr("y", centerY + 10)
      .attr("text-anchor", "middle")
      .attr("fill", textColor || "white")
      .attr("font-size", "12px")
      .text(text || "");
  }
  return svg;
};
