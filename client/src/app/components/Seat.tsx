import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { DraggableItem } from "./types";
import { renderIcon } from "../utils/renderIcon";

export type SeatProps = {
  seat: DraggableItem;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
  section: DraggableItem;
  scale?: number;
};
export const Seat: FC<SeatProps> = ({
  seat,
  updateRowItems,
  section,
  scale = 1,
}) => {
  const scaledSize = (baseSize: number) => baseSize * scale;

  return (
    <div
      key={seat.id}
      className="flex items-center justify-between rounded"
      style={{
        flexShrink: 0,
        background: "linear-gradient(135deg, #ff4500, #ff6347)",
        color: "#fff",
        fontWeight: "600",
        fontSize: `${scaledSize(14)}px`,
        border: `${2 * scale}px solid rgba(255, 255, 255, 0.8)`,
        borderRadius: `${scaledSize(10)}px`,
        boxShadow: `0 ${scaledSize(3)}px ${scaledSize(8)}px rgba(0, 0, 0, 0.3)`,
        height: `${scaledSize(80)}px`,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <span
        className="mr-2"
        style={{
          marginRight: scaledSize(2),
        }}
      >
        {seat.icon && renderIcon(seat.icon)} {seat.seatNumber}
      </span>
      <div className="display flex justify-end gap-2" style={{}}>
        <button
          className="p-1 rounded-full bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
          style={{
            padding: scaledSize(4),
            borderWidth: `${2 * scale}px`,
            fontSize: `${scaledSize(12)}px`,
          }}
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
    </div>
  );
};
