"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import sections from "../data/sections.json";
import floors from "../data/floors.json";
import venue from "../data/venue.json";
import rows from "../data/rows.json";
import seats from "../data/seats.json";
import { Row, Section, Venue } from "./types";
import { Seat } from "./TheaterSeating";
import { stageSvgType } from "../services/createStage";

// Stage oluşturma fonksiyonu
const createStage = ({
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

export type seatSvgType = {
  seatData: { x: number; y: number; index: number }[];
  seatRadius: number;
  svgRef: React.RefObject<SVGSVGElement>;
};

// Koltukları oluşturma fonksiyonu
const createSeats = ({ seatData, seatRadius, svgRef }: seatSvgType) => {
  const svg = d3.select(svgRef.current);

  // Koltukları çizin
  svg
    .selectAll("circle")
    .data(seatData)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", seatRadius)
    .attr("fill", "blue");

  // Koltuk numaralarını ekle
  svg
    .selectAll("text")
    .data(seatData)
    .enter()
    .append("text")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y + 5)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "12px")
    .text((d) => d.index);
};

const D3TheaterSeating = () => {
  const [newSections, setNewSections] = useState<Section[] | null>(sections);
  const [newFloor, setNewFloor] = useState<Section[] | null>(floors);
  const [newVenue, setNewVenue] = useState<Venue | null>(venue);
  const [newRow, setNewRow] = useState<Row | null>(rows);
  const [newSeat, setNewSeat] = useState<Seat | null>(seats);

  console.log(
    "newvenue",
    newVenue,
    "/n newVenue",
    newVenue,
    "/n newRow",
    newRow,
    "/n newSeat",
    newSeat
  );

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Sahnenin ortası
    const centerX = 400;
    const centerY = 300;

    // Sahne ayarları
    const stageRadius = 20;
    const stageWidth = 200;
    const stageHeight = 100;
    const stageColor = "red";

    // Koltuk ayarları
    const seatsPerRow = 10;
    const seatRadius = 15;
    const rowSpacing = 100; // Koltuk sırası aralığı

    // Sahneyi oluştur
    createStage({
      centerX,
      centerY,
      stageRadius,
      stageWidth,
      stageHeight,
      stageColor,
      svgRef,
    });

    // Section'lar için koltuklar oluştur
    sections.forEach((section, sectionIndex) => {
      const { xOffset, yOffset } = section;

      const sectionX = centerX + xOffset;
      const sectionY = centerY + yOffset;

      // Her section için kutu oluşturuyoruz
      const svg = d3.select(svgRef.current);
      svg
        .append("rect")
        .attr("x", sectionX - 50)
        .attr("y", sectionY - 50)
        .attr("width", 100)
        .attr("height", 100)
        .attr("fill", "gray")
        .attr("rx", 10);

      // Koltukları oluştur
      const generateSeats = (radius) => {
        const seats = [];
        for (let i = 0; i < seatsPerRow; i++) {
          const angle = (i * Math.PI) / (seatsPerRow - 1); // 0 ile π arasında açılar
          const x = sectionX + radius * Math.cos(angle); // Koltuk X koordinatı
          const y = sectionY + radius * Math.sin(angle); // Koltuk Y koordinatı
          seats.push({ x, y, index: i + 1 + sectionIndex * seatsPerRow });
        }
        return seats;
      };

      const seatData = generateSeats(30); // Her section için koltuklar

      // Koltukları çiz
      createSeats({
        seatData,
        seatRadius,
        svgRef,
      });
    });
  }, []);

  return <svg ref={svgRef} width={800} height={600} />;
};

export default D3TheaterSeating;
