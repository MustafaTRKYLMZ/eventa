"use client";
import { FC } from "react";
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { DraggableItem } from "../types/types";
import { renderIcon } from "../utils/renderIcon";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export type AvailableItemsProps = {
  availableItems: DraggableItem[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const AvailableItems: FC<AvailableItemsProps> = ({
  availableItems,
  isSidebarOpen,
  toggleSidebar,
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "w-full sm:w-1/4" : "w-16"
      } bg-gradient-to-r from-gray-800 to-gray-700 text-white  shadow-lg`}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 absolute top-2 left-2 bg-gray-600 rounded-full hover:bg-gray-500 focus:outline-none transition-colors"
      >
        {isSidebarOpen ? (
          <BiChevronRight size={24} />
        ) : (
          <BiChevronLeft size={24} />
        )}
      </button>
      {isSidebarOpen && (
        <>
          <h2 className="text-xl font-bold mb-4  p-4 mt-12">
            🎭 Available Items
          </h2>
          <ReactSortable
            list={availableItems.map((item) => ({
              ...item,
              id: uuidv4(),
            }))}
            setList={() => {}}
            group={{ name: "shared", pull: "clone", put: false }}
            className="flex flex-wrap gap-2 p-2"
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
        </>
      )}
    </div>
  );
};
