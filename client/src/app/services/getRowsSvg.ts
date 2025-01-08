"use client";
import * as d3 from "d3";
import { Row, Section, Venue } from "../components/types";
import { createSvg } from "./createSvg";

export const getRowsSvg = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  sections: Section[],
  rows: Row[],
  centerX: number,
  centerY: number,
  setVenueData: (data: Venue) => void
) => {
  const group = svg.append("g");

  rows.forEach((row) => {
    const angleInRadians = (row.angle * Math.PI) / 180;
    console.log("row >>>>>>>>", row);

    const x = centerX + row.radius * Math.cos(angleInRadians);
    const y = centerY + row.radius * Math.sin(angleInRadians);
    console.log("first x, y: ...........", x, y);
    // Koltuk (çember)
    const rowGroup = group
      .append("g")
      .attr("transform", `translate(${x}, ${y})`)
      .call(
        d3
          .drag()
          .on("start", function () {
            d3.select(this).raise().attr("stroke", "black"); // Sürükleme başladığında vurgula
          })
          .on("drag", function (event) {
            const newX = event.x;
            const newY = event.y;

            if (!isNaN(newX) && !isNaN(newY)) {
              // Pozisyonu güncelle
              console.log("tranlate: ...........", newX, newY);
              d3.select(this).attr("transform", `translate(${newX}, ${newY})`);
            } else {
              console.log("Error: ...........", x, y);
            }
          })
          .on("end", function (event) {
            d3.select(this).attr("stroke", null);

            const newX = event.x;
            const newY = event.y;

            if (!isNaN(newX) && !isNaN(newY)) {
              // Yeni radius'u hesapla
              const finalRadius = Math.sqrt(
                Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
              );

              // Yeni açıyı hesapla
              const newAngle =
                Math.atan2(newY - centerY, newX - centerX) * (180 / Math.PI);

              const normalizedAngle = (newAngle + 360) % 360;

              // State güncelle
              setVenueData((prevVenueData) => {
                const updatedFloors = prevVenueData.floors.map((floor) => {
                  return {
                    ...floor,
                    sections: floor.sections.map((sec) => {
                      const currentSection = sections.find(
                        (s) => s.id === sec.id
                      );

                      if (currentSection && sec.id === currentSection.id) {
                        return {
                          ...sec,
                          rows: sec.rows.map((r) => {
                            if (r.id === row.id) {
                              return {
                                ...r,
                                x: newX,
                                y: newY,
                                radius: finalRadius,
                                angle: normalizedAngle,
                              };
                            }
                            return r;
                          }),
                        };
                      }
                      return sec;
                    }),
                  };
                });

                return { ...prevVenueData, floors: updatedFloors };
              });
              //   localStorage.setItem("venueData", JSON.stringify(venueData));
            }
          })
      );

    // SVG'yi oluştur
    createSvg({
      svg: rowGroup,
      centerX: 0,
      centerY: 0,
      radius: row.radius,
      color: "white",
      text: `Row ${row.id}`,
      textColor: "black",
      shape: "rect",
      width: 200,
      height: 250,
    });
  });
};
