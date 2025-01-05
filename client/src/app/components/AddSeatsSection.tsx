"use client";
import { FC } from "react";
import { DraggableItem } from "./types";

export type AddSeatsSectionProps = {
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addSeatsToRow: (rowId: string) => void;
  section: DraggableItem;
  removeItem: (id: string) => void;
  setScale: React.Dispatch<React.SetStateAction<number>>;
};

export const AddSeatsSection: FC<AddSeatsSectionProps> = ({
  section,
  selectedSeatPackage,
  selectedSeatType,
  setSelectedSeatPackage,
  handleSeatTypeChange,
  addSeatsToRow,
  availableItems,
}) => {
  return (
    <div
      className=" flex items-center gap-4 justify-between md:justify-between"
      key={section.id}
    >
      <select
        value={selectedSeatPackage}
        onChange={(e) => setSelectedSeatPackage(Number(e.target.value))}
        className="p-2 border rounded bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
        style={{
          border: "1px solid #ff4500",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <option value={1}>1 </option>
        <option value={5}>5 </option>
        <option value={10}>10 </option>
        <option value={20}>20 </option>
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
        <option value=""> Seat Type</option>
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
        className="p-2  text-white  hover:bg-red-100 hover:shadow-lg transition-all duration-300 w-full"
        style={{
          background: "linear-gradient(135deg, #8b0000, #000000)",
          cursor: "pointer",
        }}
      >
        {/* Mobile: Icon */}
        <span className="block md:hidden">+</span>

        {/* Desktop: Add Seats Text */}
        <span className="hidden md:block">Add</span>
      </button>
    </div>
  );
};
