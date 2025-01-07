"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Venue } from "./types";
import { getVenueSvg } from "./getVenueSvg";
import initialVenueData from "../data/initialVenueData.json";

export const DinamicVenueDesigner = () => {
  console.log("initialVenueData", initialVenueData[0]);
  const [venueData, setVenueData] = useState<Venue>(initialVenueData[0]);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // SVG temizle

    const section = venueData.floors[0].sections[0];
    const row = section.rows[0];
    const centerX = 250;
    const centerY = 250;

    getVenueSvg(svg, section, row, centerX, centerY, setVenueData);
  }, [venueData]);

  return (
    <div>
      <h1>Drag & Rotate Seats</h1>
      <svg
        ref={svgRef}
        width="500"
        height="500"
        style={{ border: "1px solid black" }}
      ></svg>
      <div>
        <h2>Current Venue Data</h2>
        <pre>{JSON.stringify(venueData, null, 2)}</pre>
      </div>
    </div>
  );
};

/// venue data
