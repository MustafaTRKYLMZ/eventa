"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import availableItems from "../data/availableItems.json";
import { DraggableItem, Seat, Section, Venue } from "./types";
import { AvailableItems } from "./AvailableItems";
import { VenuePage } from "./VenuePage";
import { Zoom } from "./Zoom";

export default function NewVenuePage() {
  const [hydrated, setHydrated] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const [selectedSeatPackage, setSelectedSeatPackage] = useState<number>(1);
  const [selectedSeatType, setSelectedSeatType] =
    useState<DraggableItem | null>(null);
  const [scale, setScale] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const newVenues = venues.map((venue) => {
      return {
        ...venue,
        sections: sections,
      };
    });

    setVenues(newVenues);
  }, [sections]);

  console.log("venues", venues);
  const updateRowSeats = (rowId: string, newItems: Seat[]) => {
    setSections((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          let seatIndex = 0;

          const updatedSeats = newItems.map((section) => {
            if (section.type === "seat") {
              const seatNumber = `${row.name}-${seatIndex + 1}`;
              seatIndex++;

              return { ...section, seatNumber };
            }

            return section;
          });

          return { ...row, seats: updatedSeats };
        }
        return row;
      });
    });
  };

  const removeItem = (id: string) => {
    setSections((prev) => prev.filter((item) => item.id !== id));
  };
  const getSeatsCurrentIndex = (sectionId: string) => {
    const section = sections.find((section) => section.id === sectionId);
    if (!section) return 0;
    const sectionSeats = section.seats?.filter((seat) => seat.type === "seat");
    if (!sectionSeats) return 0;
    return sectionSeats.length;
  };

  const addSeatsToRow = (rowId: string) => {
    const rowIndex = sections.findIndex((section) => section.id === rowId);
    const currentRow = sections[rowIndex];

    if (!currentRow.selectedSeatType) return;

    const seatsToAdd = Array(currentRow.selectedSeatPackage)
      .fill(currentRow.selectedSeatType)
      .map((seat, index) => {
        if (seat.type === "seat") {
          const seatsIndex = getSeatsCurrentIndex(rowId);
          const seatNumber = `${currentRow.name}-${seatsIndex + index + 1}`;

          return {
            ...seat,
            id: uuidv4(),
            name: `${seat.name} Seat`,
            seatNumber,
            seatType: seat.seatType,
            icon: seat.icon,
          };
        }

        return {
          ...seat,
          id: uuidv4(),
          name: `${seat.name} Non-Seat`,
          seatType: seat.seatType,
          icon: seat.icon,
        };
      });

    setSections((prev) =>
      prev.map((section) =>
        section.id === rowId
          ? {
              ...section,
              seats: [...(section.seats || []), ...seatsToAdd],
            }
          : section
      )
    );
  };

  const handleSeatTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedSeatType = availableItems.find(
      (item) => item.id === selectedId
    );

    if (!selectedSeatType) {
      console.error(`No seat type found with id ${selectedId}`);
      return;
    }
    setSelectedSeatType(selectedSeatType as DraggableItem);
  };

  if (!hydrated) return null;

  const updateRowState = (
    rowId: string,
    updatedState: Partial<DraggableItem>
  ) => {
    setSections((prevItems) =>
      prevItems.map((row) =>
        row.id === rowId ? { ...row, ...updatedState } : row
      )
    );
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className=" flex w-full">
      {/* Venue Layout Section */}
      <VenuePage
        scale={scale}
        removeItem={removeItem}
        updateRowSeats={updateRowSeats}
        addSeatsToRow={addSeatsToRow}
        selectedSeatPackage={selectedSeatPackage}
        selectedSeatType={selectedSeatType}
        setSelectedSeatPackage={setSelectedSeatPackage}
        handleSeatTypeChange={handleSeatTypeChange}
        sections={sections}
        setSections={setSections}
        availableItems={availableItems as DraggableItem[]}
        updateRowState={updateRowState}
      />
      {/* Available Items Section */}

      <AvailableItems
        availableItems={availableItems as DraggableItem[]}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Zoom setScale={setScale} />
    </div>
  );
}
