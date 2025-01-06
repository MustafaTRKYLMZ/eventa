import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Seat, Section } from "./types";
import { renderIcon } from "../utils/renderIcon";

export type SeatProps = {
  seat: Seat;
  updateRowSeats: (rowId: string, newItems: Seat[]) => void;
  section: Section;
  scale?: number;
};
export const SeatPage: FC<SeatProps> = ({
  seat,
  updateRowSeats,
  section,
  scale = 1,
}) => {
  const scaledSize = (baseSize: number) => baseSize * scale;

  return (
    <div
      key={seat.id}
      className="flex flex-col items-center justify-between rounded p-2"
      style={{
        flexShrink: 0,
        background: "transparent",
        color: "#fff",
        fontWeight: "600",
        fontSize: `${scaledSize(14)}px`,
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
        {seat.icon && renderIcon(seat.icon)}
      </span>

      <div className="display flex flex-row justify-end gap-2 w-full mt-auto">
        <span
          className="mr-2"
          style={{
            marginRight: scaledSize(2),
          }}
        >
          {seat.seatNumber}
        </span>
        <button
          className="remove-btn"
          style={{
            padding: scaledSize(4),
            borderWidth: "0",
            fontSize: `${scaledSize(12)}px`,
            outline: "none",
            boxShadow: "none",
          }}
          onClick={() =>
            updateRowSeats(
              section.id,
              (section.seats || []).filter((item) => item.id !== seat.id)
            )
          }
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
