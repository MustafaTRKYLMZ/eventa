import { FC, JSX } from "react";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { v4 as uuidv4 } from "uuid";
import { DraggableItem } from "./types";
export type AvailableItemsProps = {
  availableItems: DraggableItem[];
  renderIcon: (iconKey: string | undefined) => JSX.Element | null;
  handleItemDrop: (event: SortableEvent) => void;
};

export const AvailableItems: FC<AvailableItemsProps> = ({
  availableItems,
  renderIcon,
  handleItemDrop,
}) => {
  return (
    <div className="w-1/4 p-4 bg-gray-100 border-l">
      <h2 className="text-xl font-bold mb-4">Available Items</h2>
      <ReactSortable
        list={availableItems.map((item) => ({
          ...item,
          id: uuidv4(),
        }))}
        setList={() => {}}
        onEnd={handleItemDrop}
        group={{ name: "shared", pull: "clone", put: false }}
        className="flex flex-wrap gap-2"
        style={{
          minHeight: "100px",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {availableItems.map((item) => (
          <div
            key={item.id}
            data-id={item.type}
            className="p-2 border rounded bg-gray-200 hover:bg-gray-300 cursor-pointer inline-flex items-center"
          >
            <span className="mr-2">{renderIcon(item.icon)}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};
