import * as d3 from "d3";

export type Svg = {
  centerX: number;
  centerY: number;
  width?: number; // width artık opsiyonel
  height?: number; // height de opsiyonel
  color: string;
  svgRef: React.RefObject<SVGSVGElement>;
  text?: string | undefined | number;
  textColor?: string;
  shape?: string;
  radius?: number; // radius opsiyonel
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
};

export const createSvg = ({
  centerX,
  centerY,
  width,
  height,
  color,
  text,
  textColor,
  shape = "circle",
  radius,
  svg,
}: Svg) => {
  if (shape === "circle" && radius) {
    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 15)
      .attr("fill", color);
  } else if (shape === "rect" && width && height) {
    svg
      .append("rect")
      .attr("x", centerX - width / 2) // X konumunu merkeze göre ayarlıyoruz
      .attr("y", centerY - height / 2) // Y konumunu merkeze göre ayarlıyoruz
      .attr("width", width) // Genişlik
      .attr("height", height) // Yükseklik
      .attr("fill", color); // Rengi belirliyoruz
  }

  // Eğer metin varsa, onu da ekleyelim
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
