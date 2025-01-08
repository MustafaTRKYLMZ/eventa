import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useStateValue } from "../context/stateContext";
import { Shape, ShapeType } from "../types/Shape";

export const ShapesDisplay = () => {
  const { shapes } = useStateValue();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Bind data to shapes
    const shapeSelection = svg
      .selectAll("g.shape")
      .data(shapes as Shape[], function (d: unknown) {
        return (d as Shape).id;
      });

    // Enter new shapes
    const enter = shapeSelection.enter().append("g").attr("class", "shape");

    enter
      .filter((d: Shape) => d.type === ShapeType.RECTANGLE)
      .append("rect")
      .attr("x", (d: Shape) => d.x)
      .attr("y", (d: Shape) => d.y)
      .attr("width", (d: Shape) => d.width)
      .attr("height", (d: Shape) => d.height)
      .attr("fill", (d: Shape) => d.color)
      .attr(
        "transform",
        (d: Shape) =>
          `rotate(${d.angle}, ${d.x + d.width / 2}, ${d.y + d.height / 2})`
      );

    enter
      .filter((d: Shape) => d.type === ShapeType.CIRCLE)
      .append("circle")
      .attr("cx", (d: Shape) => d.x)
      .attr("cy", (d: Shape) => d.y)
      .attr("r", (d: Shape) => d.radius)
      .attr("fill", (d: Shape) => d.color);

    enter
      .filter((d: Shape) => d.type === ShapeType.POLYGON)
      .append("polygon")
      .attr("points", (d: Shape) =>
        d.points ? d.points.map((point) => point.join(",")).join(" ") : ""
      )
      .attr("fill", (d: Shape) => d.color);

    // Update existing shapes
    shapeSelection
      .select("rect")
      .attr("x", (d: Shape) => d.x)
      .attr("y", (d: Shape) => d.y)
      .attr("width", (d: Shape) => d.width)
      .attr("height", (d: Shape) => d.height)
      .attr("fill", (d: Shape) => d.color)
      .attr(
        "transform",
        (d: Shape) =>
          `rotate(${d.angle}, ${d.x + d.width / 2}, ${d.y + d.height / 2})`
      );

    shapeSelection
      .select("circle")
      .attr("cx", (d: Shape) => d.x)
      .attr("cy", (d: Shape) => d.y)
      .attr("r", (d: Shape) => d.radius)
      .attr("fill", (d: Shape) => d.color);

    shapeSelection
      .select("polygon")
      .attr("points", (d: Shape) =>
        d.points ? d.points.map((point) => point.join(",")).join(" ") : ""
      )
      .attr("fill", (d: Shape) => d.color);

    // Exit old shapes
    shapeSelection.exit().remove();
  }, [shapes]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};
