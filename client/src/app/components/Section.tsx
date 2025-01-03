import { FC, JSX } from "react";
import { FaTrash } from "react-icons/fa";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { AddSeatsSection } from "./AddSeatsSection";
import ControlBoothSVG from "./Svgs/ControlBoothSVG";
import StageSVG from "./Svgs/StageSVG";
import { DraggableItem } from "./types";
import { Seat } from "./Seat";

export type SectionProps = {
  section: DraggableItem;
  removeItem: (id: string) => void;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
  handleItemDrop: (event: SortableEvent) => void;
  renderIcon: (iconKey: string | undefined) => JSX.Element | null;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addSeatsToRow: (rowId: string) => void;
  updateRowState: (rowId: string, updatedState: Partial<DraggableItem>) => void;
};

export const Section: FC<SectionProps> = ({
  section,
  removeItem,
  updateRowItems,
  handleItemDrop,
  renderIcon,
  availableItems,
  addSeatsToRow,
  updateRowState,
}) => {
  return (
    <div
      key={section.id}
      className="relative flex flex-col p-2"
      style={{
        minHeight: "120px",
        width: "100%",
        borderRadius: "15px",
        background: "linear-gradient(135deg, #2b2b2b, #1e1e1e)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(255, 69, 0, 0.5)",
      }}
      data-id={section.id}
    >
      {/* Stage or Row */}
      {section?.type === "stage" ? (
        <StageSVG />
      ) : section?.type === "control-booth" ? (
        <ControlBoothSVG />
      ) : section?.type === "row" ? (
        <div>
          <ReactSortable
            list={section.items || []}
            setList={(newItems) => updateRowItems(section.id, newItems)}
            group={{ name: "shared", pull: true, put: true }}
            onEnd={handleItemDrop}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "10px",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #1a1a1a, #000000)",
              borderWidth: "5px",
              borderStyle: "solid",
              borderColor: "#ff4500",
              minHeight: "80px",
              overflowX: "auto",
              boxShadow: "0 4px 15px rgba(255, 69, 0, 0.5)",
            }}
          >
            {(section.items || []).map((seat) => (
              <Seat
                seat={seat}
                key={seat.id}
                updateRowItems={updateRowItems}
                renderIcon={renderIcon}
                section={section}
              />
            ))}
          </ReactSortable>
          {/* Add Seats Section */}
          <AddSeatsSection
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
        </div>
      ) : null}
      {/* Remove Section Button */}
      {section?.type !== "row" && (
        <div className="dislay flex justify-end">
          <button
            onClick={() => removeItem(section.id)}
            className="bottom-0 right-0 p-2 rounded-full bg-gradient-to-br bg-red-500  hover:bg-red-800 text-white shadow-lg border-2 border-white cursor-pointer transition-transform transform hover:scale-105"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};
