"use client";
import * as d3 from "d3";
import { Row, Seat, Section, Venue } from "../components/types";
import { createSvg } from "./createSvg";

export const getSeatsSvg = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  section: Section,
  seats: Seat[],
  centerX: number,
  centerY: number,
  setVenueData: (data: Venue) => void
) => {
  const group = svg.append("g");

  seats.forEach((seat) => {
    const { seatNumber, radius, color } = seat;
    const angleInRadians = (seat.angle * Math.PI) / 180;

    // Koltuğun pozisyonu
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);

    // Koltuk (çember)
    const seatGroup = group
      .append("g")
      .attr("transform", `translate(${x}, ${y})`)
      .call(
        d3
          .drag()
          .on("start", function () {
            d3.select(this).raise().attr("stroke", "black"); // Sürükleme başladığında vurgula
          })
          .on("drag", function (event) {
            console.log("Dragging seat", seat.id);
            console.log("Event", event);

            // Yeni pozisyonu hesapla
            const newX = event.x;
            const newY = event.y;

            // Yeni radius hesaplama (mesafe)
            const newRadius = Math.sqrt(
              Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
            );
            console.log("New radius:", newRadius);

            // Pozisyonu güncelle
            d3.select(this).attr("transform", `translate(${newX}, ${newY})`);

            // Drag sırasında radius'u güncelle
            //   d3.select(this).attr("radius", newRadius);
          })
          .on("end", function (event) {
            d3.select(this).attr("stroke", null);

            const newX = event.x;
            const newY = event.y;

            // Yeni radius'u hesapla
            const finalRadius = Math.sqrt(
              Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
            );
            console.log("Final radius:", finalRadius);

            // Pozisyonu güncelle
            // d3.select(this).attr("radius", finalRadius);

            // Yeni açıyı hesapla
            const newAngle =
              Math.atan2(newY - centerY, newX - centerX) * (180 / Math.PI);

            // Normalize the angle to be between 0 and 360
            const normalizedAngle = (newAngle + 360) % 360;

            console.log(`Seat ${seat.id} new angle:`, normalizedAngle);

            const row = section.rows.find((r) => r.id === seat.rowId);

            // State güncelle
            setVenueData((prevVenueData) => {
              const updatedFloors = prevVenueData.floors.map((floor) => {
                return {
                  ...floor,
                  sections: floor.sections.map((sec) => {
                    if (sec.id === section.id) {
                      return {
                        ...sec,
                        rows: sec.rows.map((r) => {
                          if (r.id === row.id) {
                            return {
                              ...r,
                              radius: finalRadius, // final radius'u state'e ekle
                              seats: r.seats.map((s) =>
                                s.id === seat.id
                                  ? {
                                      ...s,

                                      x: newX,
                                      y: newY,
                                      angle: normalizedAngle,
                                      radius: finalRadius,
                                    }
                                  : s
                              ),
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
          })
      );
    createSvg({
      svg: seatGroup,
      centerX: 0,
      centerY: 0,
      radius: seat.radius, // örneğin 15px
      color: color || "blue",
      shape: "circle", // çember olarak ayarladık
      text: seatNumber.toString(),
      textColor: "white",
    });
  });
};
