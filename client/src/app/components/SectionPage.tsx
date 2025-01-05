"use client";
import { FC, useState } from "react";
import { FaAngleUp, FaTrash } from "react-icons/fa";
import { ReactSortable } from "react-sortablejs";
import ControlBoothSVG from "./Svgs/ControlBoothSVG";
import StageSVG from "./Svgs/StageSVG";
import { DraggableItem, Seat, Section } from "./types";
import { SeatPage } from "./SeatPage";
import StairsSVG from "./Svgs/StairsSVG";
import { SectionFooter } from "./SectionFooter";
import { FaAngleDown } from "react-icons/fa6";

export type SectionPageProps = {
  section: Section;
  removeItem: (id: string) => void;
  updateRowSeats: (rowId: string, newItems: Seat[]) => void;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addSeatsToRow: (rowId: string) => void;
  updateRowState: (rowId: string, updatedState: Partial<Section>) => void;
  countSeats: (sectionId: string) => number;
};

export const SectionPage: FC<SectionPageProps> = ({
  section,
  removeItem,
  updateRowSeats,
  availableItems,
  addSeatsToRow,
  updateRowState,
  countSeats,
}) => {
  const [scale, setScale] = useState(1);
  const [isAddSeatsSectionOpen, setIsAddSeatsSectionOpen] = useState(false);
  const toggleAddSeatsSection = () => {
    setIsAddSeatsSectionOpen((prev) => !prev);
  };

  //sectionContent
  let sectionContent = null;
  switch (section?.type) {
    case "stage":
      sectionContent = <StageSVG />;
      break;
    case "control-booth":
      sectionContent = <ControlBoothSVG />;
      break;
    case "stairs":
      sectionContent = <StairsSVG />;
      break;
    case "row":
      sectionContent = (
        <div className="flex flex-col w-full">
          <ReactSortable
            list={section.seats || []}
            setList={(seats) => updateRowSeats(section.id, seats)}
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
            {(section.seats || []).map((seat) => (
              <SeatPage
                scale={scale}
                seat={seat}
                key={seat.id}
                updateRowSeats={updateRowSeats}
                section={section}
              />
            ))}
          </ReactSortable>

          {/* Toggle Button for AddSeatsSection */}
          <div className="flex justify-end w-full absolute bottom-0 right-0 m-2">
            <button
              onClick={toggleAddSeatsSection}
              className="text-sm sm:text-base bg-gradient-to-br bg-red-500 hover:bg-red-800 text-white rounded p-2"
            >
              {isAddSeatsSectionOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>

          {/* Section Footer */}
          {isAddSeatsSectionOpen && (
            <SectionFooter
              section={section}
              setScale={setScale}
              updateRowState={updateRowState}
              availableItems={availableItems}
              addSeatsToRow={addSeatsToRow}
              removeItem={removeItem}
              countSeats={countSeats}
            />
          )}
        </div>
      );
      break;
  }
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
      {sectionContent}
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
