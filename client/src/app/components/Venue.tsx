import { FC, JSX } from "react";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import { DraggableItem } from "./types";
import { Section } from "./Section";

export type VenueProps = {
  venueItems: DraggableItem[];
  setVenueItems: React.Dispatch<React.SetStateAction<DraggableItem[]>>;
  removeItem: (id: string) => void;
  updateRowItems: (rowId: string, newItems: DraggableItem[]) => void;
  addSeatsToRow: (rowId: string) => void;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  setSelectedSeatPackage: React.Dispatch<React.SetStateAction<number>>;
  availableItems: DraggableItem[];
  handleSeatTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleItemDrop: (event: SortableEvent) => void;
  renderIcon: (iconKey: string | undefined) => JSX.Element | null;
  updateRowState: (rowId: string, updatedState: Partial<DraggableItem>) => void;
  scale: number;
};

export const Venue: FC<VenueProps> = ({
  venueItems,
  setVenueItems,
  removeItem,
  updateRowItems,
  addSeatsToRow,
  selectedSeatPackage,
  selectedSeatType,
  setSelectedSeatPackage,
  availableItems,
  handleSeatTypeChange,
  handleItemDrop,
  renderIcon,
  updateRowState,
  scale,
}) => {
  return (
    <div
      className="container mx-auto flex flex-col p-6 rounded-lg"
      style={{
        background: "linear-gradient(135deg, #1a202c, #2d3748)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        minHeight: "100vh",
        color: "#f7fafc",
      }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{
          color: "#f56565",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        Venue Layout
      </h2>
      <ReactSortable
        list={venueItems}
        setList={setVenueItems}
        group={{ name: "shared", pull: true, put: true }}
        onEnd={handleItemDrop}
        onStart={(event) => {
          console.log("drag started", event);
        }}
        onMove={(event) => {
          console.log("dragging", event);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: `${100 * scale}vh`,
          overflow: "auto",
          height: `${100 * scale}vh`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {venueItems.map((section) => (
          <Section
            key={section.id}
            data-id={section.id}
            section={section}
            removeItem={removeItem}
            updateRowItems={updateRowItems}
            handleItemDrop={handleItemDrop}
            renderIcon={renderIcon}
            selectedSeatPackage={selectedSeatPackage}
            selectedSeatType={selectedSeatType}
            setSelectedSeatPackage={setSelectedSeatPackage}
            availableItems={availableItems}
            handleSeatTypeChange={handleSeatTypeChange}
            addSeatsToRow={addSeatsToRow}
            updateRowState={updateRowState}
          />
        ))}
      </ReactSortable>
    </div>
  );
};
