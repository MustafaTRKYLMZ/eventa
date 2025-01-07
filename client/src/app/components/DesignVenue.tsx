// components/DesignVenue.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { createStage } from "../services/createStage";
import * as d3 from "d3";
import { UpdateStageDrawer } from "./UpdateStageDrawer";
import { createSvg } from "../services/createSvg";
import { CreateSvg } from "./CreateSvg";
import { Seat } from "./types";
import seats from "../data/seats.json";
export const DesignVenue = () => {
  const [newSeats, setNewSeats] = useState<Seat[]>(seats);
  const [newRows, setNewRows] = useState([
    {
      id: "r1",
      name: "Row 1",
      seats: newSeats,
    },
    {
      id: "r2",
      name: "Row 2",
      seats: ["s3", "s4"],
    },
  ]);

  const [newSections, setNewSections] = useState([
    {
      id: "sec1",
      sectionType: "up",
      xOffset: 0,
      yOffset: -150,
      radius: 100,
      rows: newRows,
    },
  ]);

  const [newFloor, setNewFloor] = useState([
    {
      id: "f1",
      name: "Floor 1",
      sections: newSections,
    },
  ]);
  const [newVenue, setNewVenue] = useState([
    {
      id: "f1",
      name: "Venue 1",
      floors: newFloor,
    },
  ]);

  const [stageInfo, setStageInfo] = useState({
    centerX: 100,
    centerY: 100,
    stageRadius: 10,
    stageWidth: 200,
    stageHeight: 100,
    stageColor: "black",
    stageRotation: 0,
    id: "stage1",
    name: "Main Stage",
    stageAngle: 0,
  });

  // const svg = createSvg({svgRef: useRef<SVGSVGElement>(null), width: 500, height: 500,});
  //console.log("svg", svg);

  // ****************************************************
  console.log("venue: >>>>", newVenue);
  console.log("floor: >>>>", newFloor);
  console.log("section: >>>>", newSections);
  console.log("rows: >>>>", newRows);
  console.log("seats: >>>>", newSeats);
  // ****************************************************

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateSvgModalOpen, setIsCreateSvgModalOpen] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    createStage({ stageInfo, svgRef });
  }, [stageInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStageInfo((prevState) => ({
      ...prevState,
      [name]:
        name === "stageRadius" ||
        name === "stageWidth" ||
        name === "stageHeight" ||
        name === "stageRotation"
          ? Number(value)
          : value,
    }));
  };

  const handleStageClick = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <h1>DesignVenue</h1>
      <div>
        <button onClick={() => setIsCreateSvgModalOpen(true)}>
          Create Svg
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          borderRadius: stageInfo.stageRadius,
        }}
      >
        <svg
          ref={svgRef}
          width={stageInfo?.stageWidth ? stageInfo.stageWidth : 500}
          height={stageInfo?.stageHeight ? stageInfo.stageHeight : 500}
          style={{ cursor: "pointer" }}
          onClick={handleStageClick}
        ></svg>
      </div>
      {/*create svg*/}
      <CreateSvg
        isOPen={isCreateSvgModalOpen}
        setIsOpen={setIsCreateSvgModalOpen}
      />

      <UpdateStageDrawer
        stageInfo={stageInfo}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleInputChange={handleInputChange}
      />
      {/* Venue */}
      {/* seats */}
      <div>
        {newSeats.map((seat) => {
          return (
            <div key={seat.id} className="seat">
              <p>{seat.id}</p>
              <p>{seat.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
