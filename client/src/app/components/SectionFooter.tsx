"use client";
import { FC } from "react";
import { AddSeatsSection } from "./AddSeatsSection";
import { DraggableItem } from "./types";
import { FaTrash } from "react-icons/fa";

export type SectionFooterProps = {
  section: DraggableItem;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  updateRowState: (rowId: string, updatedState: Partial<DraggableItem>) => void;
  availableItems: DraggableItem[];
  addSeatsToRow: (rowId: string) => void;
  removeItem: (id: string) => void;
  countSeats: (sectionId: string) => number;
};

export const SectionFooter: FC<SectionFooterProps> = ({
  section,
  setScale,
  updateRowState,
  availableItems,
  addSeatsToRow,
  removeItem,
  countSeats,
}) => {
  const handleZoomIn = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.min(prev + 0.1, 3));
  };

  return (
    <div
      key={section.id}
      className="flex lg:flex-row md:flex-col sm:flex-col justify-between items-center border rounded shadow gap-2 w-full"
      style={{
        background: "linear-gradient(135deg, #8b0000, #000000)",
        border: "2px solid #ff4500",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.7)",
        padding: "10px 20px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <div className="flex flex-col sm:flex-row align-center  justify-start sm:justify-between md:m-2 gap-2 w-full">
        <h3 className="font-bold text-sm sm:text-base sm:w-auto sm:flex-grow-0 sm:flex-shrink-0">
          {section.name}
        </h3>
        <p className="text-sm sm:text-base text-center sm:text-left">
          Seats: {countSeats(section.id)}
        </p>
      </div>

      {/* AddSeatsSection */}

      <AddSeatsSection
        setScale={setScale}
        section={section}
        selectedSeatPackage={section.selectedSeatPackage}
        selectedSeatType={section.selectedSeatType}
        setSelectedSeatPackage={(value) =>
          updateRowState(section.id, {
            selectedSeatPackage: value as number,
          })
        }
        handleSeatTypeChange={(e) =>
          updateRowState(section.id, {
            selectedSeatType: availableItems.find(
              (item) => item.id === e.target.value
            ),
          })
        }
        addSeatsToRow={addSeatsToRow}
        removeItem={removeItem}
        availableItems={availableItems}
      />

      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 sm:p-2 sm:ml-auto w-full">
        <button
          onClick={handleZoomIn}
          style={{
            background: "linear-gradient(135deg, #8b0000, #000000)",
            color: "white",
          }}
          className="p-1 text-xs sm:text-sm rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          -
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            background: "linear-gradient(135deg, #8b0000, #000000)",
            color: "white",
          }}
          className="p-1 text-xs sm:text-sm rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          +
        </button>
        <button
          onClick={() => removeItem(section.id)}
          className="p-2 text-xs sm:text-sm rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
