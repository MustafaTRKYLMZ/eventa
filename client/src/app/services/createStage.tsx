import * as d3 from "d3";

export type stageSvgType = {
  stageInfo: {
    centerX: number;
    centerY: number;
    stageRadius: number;
    stageWidth: number;
    stageHeight: number;
    stageColor: string;
    stageRotation: number; // Ekledik
  };
  svgRef: React.RefObject<SVGSVGElement>;
};

export const createStage = ({ stageInfo, svgRef }: stageSvgType) => {
  const svg = d3.select(svgRef.current);
  const {
    centerX,
    centerY,
    stageRadius,
    stageWidth,
    stageHeight,
    stageColor,
    stageRotation, // Rotasyon değerini alıyoruz
  } = stageInfo;

  // SVG'yi temizlemeden önce yeni bir sahne eklemeyi engellemek için
  svg.selectAll("*").remove();

  // Sahneyi oluşturuyoruz
  svg
    .append("rect")
    .attr("x", centerX - stageWidth / 2) // Koordinatları merkezle hizalayarak
    .attr("y", centerY - stageHeight / 2)
    .attr("width", stageWidth)
    .attr("height", stageHeight)
    .attr("fill", stageColor)
    .attr("rx", stageRadius)
    .attr("transform", `rotate(${stageRotation}, ${centerX}, ${centerY})`);
  //add text
  svg
    .append("text")
    .attr("x", centerX)
    .attr("y", centerY + 10)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "12px")
    .text("Stage")
    .attr("transform", `rotate(${stageRotation}, ${centerX}, ${centerY})`);

  return svg;
};
