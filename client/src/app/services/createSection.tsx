import { stageSvgType } from "./createStage";
import * as d3 from "d3";

export const createStage = ({
  centerX,
  centerY,
  stageRadius,
  stageWidth,
  stageHeight,
  stageColor,
  svgRef,
}: stageSvgType) => {
  const svg = d3.select(svgRef.current);

  svg
    .append("rect")
    .attr("x", centerX - 100)
    .attr("y", centerY - 50)
    .attr("width", stageWidth)
    .attr("height", stageHeight)
    .attr("fill", stageColor)
    .attr("rx", stageRadius);

  return svg;
};
