import { FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { DraggableItem } from "./types";
import { renderIcon } from "../utils/renderIcon";

export type AvailableItemsProps = {
  availableItems: DraggableItem[];
};

export const AvailableItems: FC<AvailableItemsProps> = ({ availableItems }) => {
  return (
    <div
      className="w-full sm:w-1/4 p-4 border-l shadow-lg"
      style={{
        background: "linear-gradient(135deg, #1e293b, #334155)",
        color: "#f1f5f9",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        🎭 Available Items
      </h2>
      <ReactSortable
        list={availableItems.map((item) => ({
          ...item,
          id: uuidv4(),
        }))}
        setList={() => {}}
        group={{ name: "shared", pull: "clone", put: false }}
        className="flex flex-wrap gap-2"
        style={{
          minHeight: "10px",
          border: "1px dashed #6b7280",

          borderRadius: "8px",
        }}
      >
        {availableItems.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className="available-item"
            style={{
              width: "auto",
              minWidth: "50px",
            }}
          >
            <span className="text-lg">{renderIcon(item.icon)}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
