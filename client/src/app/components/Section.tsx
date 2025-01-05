import { FC, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import { AddSeatsSection } from "./AddSeatsSection";
import ControlBoothSVG from "./Svgs/ControlBoothSVG";
import StageSVG from "./Svgs/StageSVG";
import { DraggableItem } from "./types";
import { Seat } from "./Seat";
import StairsSVG from "./Svgs/StairsSVG";

export type SectionProps = {
  section: DraggableItem;
  removeItem: (id: string) => void;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
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
  availableItems,
  addSeatsToRow,
  updateRowState,
}) => {
  const [scale, setScale] = useState(1);
  return (
    <div
      key={section.id}
      className="relative flex flex-col "
      style={{
        width: "100%",
        borderRadius: "15px",
        background: "linear-gradient(135deg, #2b2b2b, #1e1e1e)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
        border: "1px solid rgba(255, 69, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Stage or Row */}
      {section?.type === "stage" ? (
        <StageSVG />
      ) : section?.type === "control-booth" ? (
        <ControlBoothSVG />
      ) : section?.type === "stairs" ? (
        <StairsSVG />
      ) : section?.type === "row" ? (
        <div className="flex flex-col  w-full">
          <ReactSortable
            list={section.items || []}
            setList={(newItems) => updateRowItems(section.id, newItems)}
            group={{ name: "shared", pull: true, put: true }}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              borderRadius: "15px",
              gap: "5px",
              background: "linear-gradient(135deg, #1a1a1a, #000000)",
              minHeight: "80px",
              overflowX: "auto",
              boxShadow: "0 4px 15px rgba(255, 69, 0, 0.5)",
            }}
            data-id={section.id}
          >
            {(section.items || []).map((seat) => (
              <Seat
                scale={scale}
                seat={seat}
                key={seat.id}
                updateRowItems={updateRowItems}
                section={section}
              />
            ))}
          </ReactSortable>
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
        </div>
      ) : null}
      {/* Remove Section Button */}
      {section?.type !== "row" && (
        <div className="display flex justify-end gap-2 p-2 w-full">
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
