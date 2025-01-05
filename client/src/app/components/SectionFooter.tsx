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
      className="flex flex-col sm:flex-row justify-between items-center border rounded shadow gap-2 "
      style={{
        background: "linear-gradient(135deg, #8b0000, #000000)",
        border: "2px solid #ff4500",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.7)",
        padding: "10px 20px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <div className="flex flex-row gap-2">
        <h3 className="font-bold">{section.name}</h3>
        <p>Seats: {countSeats(section.id)}</p>
      </div>
      {/* Add Seats Section */}
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
      <div className="flex items-center gap-2 sm:gap-4 sm:p-2">
        <button
          onClick={handleZoomIn}
          style={{
            background: "linear-gradient(135deg, #8b0000, #000000)",
            color: "white",
          }}
          className="bottom-0 right-0 p-1 rounded-full bg-gradient-to-br bg-red-500  hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          -
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            background: "linear-gradient(135deg, #8b0000, #000000)",
            color: "white",
          }}
          className="bottom-0 right-0 p-1 rounded-full bg-gradient-to-br bg-red-500  hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          +
        </button>

        <button
          onClick={() => removeItem(section.id)}
          className="bottom-0 right-0 p-2 rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
