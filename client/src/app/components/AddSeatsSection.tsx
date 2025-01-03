import { FC } from "react";
import { DraggableItem } from "./types";
import { FaTrash } from "react-icons/fa";

export type AddSeatsSectionProps = {
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addSeatsToRow: (rowId: string) => void;
  section: DraggableItem;
  removeItem: (id: string) => void;
};

export const AddSeatsSection: FC<AddSeatsSectionProps> = ({
  section,
  selectedSeatPackage,
  selectedSeatType,
  setSelectedSeatPackage,
  handleSeatTypeChange,
  addSeatsToRow,
  removeItem,
  availableItems,
}) => {
  return (
    <div
      key={section.id}
      className="flex justify-between items-center border rounded shadow"
      style={{
        background: "linear-gradient(135deg, #8b0000, #000000)",
        border: "2px solid #ff4500",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.7)",
        padding: "10px 20px",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h3 className="font-bold">{section.name}</h3>
      <div className="mt-4 flex items-center gap-4">
        <select
          value={selectedSeatPackage}
          onChange={(e) => setSelectedSeatPackage(Number(e.target.value))}
          className="p-2 border rounded bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
          style={{
            border: "1px solid #ff4500",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          <option value={1}>1 Seat</option>
          <option value={5}>5 Seats</option>
          <option value={10}>10 Seats</option>
          <option value={20}>20 Seats</option>
        </select>
        <select
          value={selectedSeatType?.id || ""}
          onChange={handleSeatTypeChange}
          className="p-2 border rounded bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
          style={{
            border: "1px solid #ff4500",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          <option value="">Select Seat Type</option>
          {availableItems.map(
            (item) =>
              item.type === "seat" && (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )
          )}
        </select>
        <button
          onClick={() => addSeatsToRow(section.id)}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Add Seats
        </button>
      </div>
      <button
        onClick={() => removeItem(section.id)}
        className="bottom-0 right-0 p-2 rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
      >
        <FaTrash />
      </button>
    </div>
  );
};
