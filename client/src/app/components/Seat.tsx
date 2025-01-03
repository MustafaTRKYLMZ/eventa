import { JSX, FC } from "react";
import { FaTrash } from "react-icons/fa";
import { DraggableItem } from "./types";

export type SeatProps = {
  seat: DraggableItem;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
  renderIcon: (iconKey: string | undefined) => JSX.Element | null;
  section: DraggableItem;
};
export const Seat: FC<SeatProps> = ({
  seat,
  updateRowItems,
  renderIcon,
  section,
}) => {
  return (
    <div
      key={seat.id}
      className="flex items-center justify-between p-2 rounded"
      style={{
        minWidth: "100px",
        flexShrink: 0,
        background: "linear-gradient(135deg, #ff4500, #ff6347)",
        color: "#fff",
        fontWeight: "600",
        fontSize: "0.9rem",
        border: "2px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "10px",
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <span className="mr-2">
        {seat.icon && renderIcon(seat.icon)} {seat.seatNumber}
      </span>
      <button
        className="bottom-0 right-0 p-1 rounded-full bg-gradient-to-br bg-red-500  hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
        onClick={() =>
          updateRowItems(
            section.id,
            (section.items || []).filter((item) => item.id !== seat.id)
          )
        }
      >
        <FaTrash />
      </button>
    </div>
  );
};
