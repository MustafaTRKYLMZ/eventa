import { FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { DraggableItem } from "./types";
import { Section } from "./Section";
import { generateLetters } from "../utils/generateLetters";

export type VenueProps = {
  venueItems: DraggableItem[];
  setVenueItems: React.Dispatch<React.SetStateAction<DraggableItem[]>>;
  removeItem: (id: string) => void;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
  addSeatsToRow: (rowId: string) => void;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  updateRowState: (rowId: string, updatedState: Partial<DraggableItem>) => void;
  scale: number;
};

export const Venue: FC<VenueProps> = ({
  venueItems,
  setVenueItems,
  removeItem,
  updateRowItems,
  addSeatsToRow,
  selectedSeatPackage,
  selectedSeatType,
  setSelectedSeatPackage,
  availableItems,
  handleSeatTypeChange,
  updateRowState,
  scale,
}) => {
  const handleSetItems = (newItems: DraggableItem[]) => {
    const updatedItems = generateLetters(newItems);
    setVenueItems(updatedItems);
  };

  return (
    <div
      className="container mx-auto flex flex-col p-6 rounded-lg"
      style={{
        background: "linear-gradient(135deg, #1a202c, #2d3748)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        minHeight: "100vh",
        color: "#f7fafc",
      }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{
          color: "white",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        Venue Layout
      </h2>
      <ReactSortable
        list={venueItems}
        setList={handleSetItems}
        group={{ name: "shared", pull: true, put: true }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          height: "auto",
          overflowY: "auto",
          minHeight: "80vh",
          maxHeight: "100vh",
          padding: "20px",
          boxSizing: "border-box",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {venueItems.map((section) => (
          <Section
            key={section.id}
            data-id={section.id}
            section={section}
            removeItem={removeItem}
            updateRowItems={updateRowItems}
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
