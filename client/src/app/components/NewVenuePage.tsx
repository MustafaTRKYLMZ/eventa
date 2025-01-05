"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import availableItems from "../data/availableItems.json";
import { DraggableItem } from "./types";
import { AvailableItems } from "./AvailableItems";
import { Venue } from "./Venue";
import { Zoom } from "./Zoom";

export default function NewVenuePage() {
  const [hydrated, setHydrated] = useState(false);
  const [venueItems, setVenueItems] = useState<DraggableItem[]>([]);

  const [selectedSeatPackage, setSelectedSeatPackage] = useState<number>(1);
  const [selectedSeatType, setSelectedSeatType] =
    useState<DraggableItem | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const updateRowItems = (rowId: string, newItems: DraggableItem[]) => {
    setVenueItems((prev) => {
      return prev.map((row) => {
        if (row.id === rowId) {
          let seatIndex = 0;

          const updatedItems = newItems.map((item) => {
            if (item.type === "seat") {
              const seatNumber = `${row.name}-${seatIndex + 1}`;
              seatIndex++;

              return { ...item, seatNumber };
            }

            return item;
          });

          return { ...row, items: updatedItems };
        }
        return row;
      });
    });
  };

  const removeItem = (id: string) => {
    setVenueItems((prev) => prev.filter((item) => item.id !== id));
  };
  const getSeatsCurrentIndex = (rowId: string) => {
    const row = venueItems.find((row) => row.id === rowId);
    if (!row) return 0;
    const rowItems = row.items?.filter((item) => item.type === "seat");
    if (!rowItems) return 0;
    return rowItems.length;
  };

  const addSeatsToRow = (rowId: string) => {
    const rowIndex = venueItems.findIndex((row) => row.id === rowId);
    const currentRow = venueItems[rowIndex];

    if (!currentRow.selectedSeatType) return;

    const seatsToAdd = Array(currentRow.selectedSeatPackage)
      .fill(currentRow.selectedSeatType)
      .map((seat, index) => {
        if (seat.type === "seat") {
          const seatsIndex = getSeatsCurrentIndex(rowId);
          const seatNumber = `${currentRow.name}-${seatsIndex + index + 1}`;

          return {
            ...seat,
            id: uuidv4(),
            name: `${seat.name} Seat`,
            seatNumber,
            seatType: seat.seatType,
            icon: seat.icon,
          };
        }

        return {
          ...seat,
          id: uuidv4(),
          name: `${seat.name} Non-Seat`,
          seatType: seat.seatType,
          icon: seat.icon,
        };
      });

    setVenueItems((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              items: [...(row.items || []), ...seatsToAdd],
            }
          : row
      )
    );
  };

  const handleSeatTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedSeatType = availableItems.find(
      (item) => item.id === selectedId
    );

    if (!selectedSeatType) {
      console.error(`No seat type found with id ${selectedId}`);
      return;
    }
    setSelectedSeatType(selectedSeatType as DraggableItem);
  };

  if (!hydrated) return null;

  const updateRowState = (
    rowId: string,
    updatedState: Partial<DraggableItem>
  ) => {
    setVenueItems((prevItems) =>
      prevItems.map((row) =>
        row.id === rowId ? { ...row, ...updatedState } : row
      )
    );
  };
  return (
    <div className=" flex w-full">
      {/* Venue Layout Section */}
      <Venue
        scale={scale}
        removeItem={removeItem}
        updateRowItems={updateRowItems}
        addSeatsToRow={addSeatsToRow}
        selectedSeatPackage={selectedSeatPackage}
        selectedSeatType={selectedSeatType}
        setSelectedSeatPackage={setSelectedSeatPackage}
        handleSeatTypeChange={handleSeatTypeChange}
        venueItems={venueItems}
        setVenueItems={setVenueItems}
        availableItems={availableItems as DraggableItem[]}
        updateRowState={updateRowState}
      />
      {/* Available Items Section */}

      <AvailableItems availableItems={availableItems as DraggableItem[]} />
      <Zoom setScale={setScale} />
    </div>
  );
}
