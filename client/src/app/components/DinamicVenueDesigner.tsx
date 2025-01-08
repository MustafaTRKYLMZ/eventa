"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Venue } from "./types";
import { getSeatsSvg } from "../services/getSeatsSvg";
import initialVenueData from "../data/initialVenueData.json";
import { getRowsSvg } from "../services/getRowsSvg";

export const DinamicVenueDesigner = () => {
  console.log("initialVenueData", initialVenueData[0]);
  const [venueData, setVenueData] = useState<Venue>(initialVenueData[0]);

  const svgRef = useRef<SVGSVGElement>(null);

  //   const getLocalData = () => {
  //     const localVenue = localStorage.getItem("venueData");
  //     if (localVenue) {
  //       setVenueData(JSON.parse(localVenue));
  //     }
  //   };

  useEffect(() => {
    // getLocalData();
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const section = venueData.floors[0].sections.map((section) => section);
    const rows = section.flatMap((section) => section.rows);
    const seats = rows.flatMap((row) => row.seats);

    const centerX = 250;
    const centerY = 250;

    getRowsSvg(svg, section, rows, centerX, centerY, setVenueData);
    getSeatsSvg(svg, section, seats, centerX, centerY, setVenueData);
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
      </div>
    </div>
  );
};

/// venue data
