"use client";
import { FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { DraggableItem, Seat, Section } from "./types";
import { SectionPage } from "./SectionPage";
import { generateLetters } from "../utils/generateLetters";

export type VenuePageProps = {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  removeItem: (id: string) => void;
  updateRowSeats: (rowId: string, newItems: Seat[]) => void;
  addSeatsToRow: (rowId: string) => void;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateRowState: (rowId: string, updatedState: Partial<DraggableItem>) => void;
  scale: number;
};

export const VenuePage: FC<VenuePageProps> = ({
  sections,
  setSections,
  removeItem,
  updateRowSeats,
  addSeatsToRow,
  selectedSeatPackage,
  selectedSeatType,
  setSelectedSeatPackage,
  availableItems,
  handleSeatTypeChange,
  updateRowState,
  scale,
}) => {
  const handleSetItems = (newItems: Section[]) => {
    const updatedItems = generateLetters(newItems);
    setSections(updatedItems);
  };
  const countSeats = (sectionId: string) => {
    let countSeats = 0;
    sections
      .filter((section) => section.id === sectionId)
      .map((section) => {
        if (section.type === "row") {
          section.seats?.map((seat) => {
            if (seat.type === "seat") {
              countSeats++;
            }
          });
        }
      }, []);
    return countSeats;
  };
  return (
    <div
      className="container mx-auto flex flex-col  p-2"
      style={{
        background: "linear-gradient(135deg, #1a202c, #2d3748)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        minHeight: "100vh",
        color: "#f7fafc",
        width: "80%",
      }}
    >
      <ReactSortable
        list={sections}
        setList={handleSetItems}
        group={{ name: "shared", pull: true, put: true }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "100%",
          height: "auto",
          overflowY: "auto",
          minHeight: "80vh",
          maxHeight: "100vh",
          padding: "10px",
          boxSizing: "border-box",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {sections.map((section) => (
          <SectionPage
            key={section.id}
            data-id={section.id}
            section={section}
            removeItem={removeItem}
            updateRowSeats={updateRowSeats}
            countSeats={countSeats}
            selectedSeatPackage={selectedSeatPackage}
            selectedSeatType={selectedSeatType}
            setSelectedSeatPackage={setSelectedSeatPackage}
            availableItems={availableItems}
            handleSeatTypeChange={handleSeatTypeChange}
            addSeatsToRow={addSeatsToRow}
            updateRowState={updateRowState}
          />
        ))}
      </ReactSortable>
    </div>
  );
};
