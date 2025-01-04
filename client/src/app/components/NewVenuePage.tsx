"use client";
import { useState, useEffect, JSX } from "react";
import { v4 as uuidv4 } from "uuid";
import availableItems from "./availableItems.json";
import { SeatSVG } from "./Svgs/SeatSVG";
import StageSVG from "./Svgs/StageSVG";
import { RowSVG } from "./Svgs/RowSVG";
import { DraggableItem } from "./types";
import { AvailableItems } from "./AvailableItems";
import { Venue } from "./Venue";
import ControlBoothSVG from "./Svgs/ControlBoothSVG";
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
    console.log("check", rowId, newItems);
    setVenueItems((prev) => {
      console.log("prev", prev);
      return prev.map((row) =>
        row.id === rowId ? { ...row, items: newItems } : row
      );
    });
  };

  const removeItem = (id: string) => {
    setVenueItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addSeatsToRow = (rowId: string) => {
    const rowIndex = venueItems.findIndex((row) => row.id === rowId);
    const currentRow = venueItems[rowIndex];

    if (!currentRow.selectedSeatType) return;

    const startNumber = (currentRow.items?.length || 0) + 1;

    const seatsToAdd = Array(currentRow.selectedSeatPackage)
      .fill(currentRow.selectedSeatType)
      .map((seat, index) => ({
        ...seat,
        id: uuidv4(),
        name: `${seat.name} Seat`,
        type: "seat",
        seatNumber: `${currentRow.name}-${startNumber + index}`,
        seatType: seat.seatType,
        icon: seat.icon,
      }));

    setVenueItems((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? { ...row, items: [...(row.items || []), ...seatsToAdd] }
          : row
      )
    );
  };

  // const getNextRowName = (existingRows: string[]): string => {
  //   const usedLetters = existingRows.map((rowName) => rowName.charAt(0)).sort();
  //   const lastLetter = usedLetters[usedLetters.length - 1];

  //   if (!lastLetter) return "A";
  //   const nextLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);
  //   if (nextLetter > "Z") {
  //     throw new Error("No more letters available for rows!");
  //   }
  //   return nextLetter;
  // };

  // const handleItemDrop = (evt: SortableEvent) => {
  //   console.log("drag ended", evt);
  //   const { to, item } = evt;

  //   if (!to) {
  //     console.error("No drop target found.");
  //     return;
  //   }

  //   const rowId = to.getAttribute("data-id");
  //   const droppedItemId = item.getAttribute("data-id");

  //   // Eğer düşürülen öğe "row" ise

  //   if (droppedItemId === "row") {
  //     // Only create a new row if rowId is empty
  //     if (!rowId) {
  //       console.log("Target rowId is missing; adding a new row.");
  //       const existingRowNames = venueItems
  //         .filter((row) => row.type === "row")
  //         .map((row) => row.name);
  //       console.log("existingRowNames", existingRowNames);

  //       const newRowName = getNextRowName(existingRowNames);
  //       console.log("newRowName", newRowName);

  //       const newRow: DraggableItem = {
  //         id: uuidv4(),
  //         name: newRowName,
  //         type: "row",
  //         items: [],
  //         selectedSeatPackage: 0,
  //         selectedSeatType: null,
  //       };
  //       to.setAttribute("data-id", newRow.id);

  //       setVenueItems((prev) => [...prev, newRow]);
  //       console.log("Creating a new row:", newRow);
  //     } else {
  //       console.log("Row already exists; no need to create a new one.");
  //       setVenueItems((prevItems) =>
  //         prevItems.map((row) =>
  //           row.id !== rowId
  //             ? {
  //                 ...row,
  //                 items: row.items?.map((item, index) => ({
  //                   ...item,
  //                   seatNumber: `${row.name}-${index + 1}`,
  //                 })),
  //               }
  //             : row
  //         )
  //       );
  //     }
  //   }

  //   setVenueItems((prev) =>
  //     prev.map((row) => {
  //       if (row.id !== rowId) return row;

  //       return {
  //         ...row,
  //         items: row.items?.map((item, index) => ({
  //           ...item,
  //           seatNumber: `${row.name}-${index + 1}`,
  //         })),
  //       };
  //     })
  //   );

  //   console.log("Updated Venue Items:", venueItems);
  // };

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

  const iconMap: { [key: string]: JSX.Element } = {
    "standard-seat": <SeatSVG type="standard" />,
    "vip-seat": <SeatSVG type="vip" />,
    "accessible-seat": <SeatSVG type="accessible" />,
    stage: <StageSVG />,
    row: <RowSVG />,
    "control-booth": <ControlBoothSVG />,
  };

  const renderIcon = (iconKey: string | undefined): JSX.Element => {
    return iconKey ? iconMap[iconKey] : <div />;
  };
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
        renderIcon={renderIcon}
        availableItems={availableItems as DraggableItem[]}
        updateRowState={updateRowState}
      />

      {/* Available Items Section */}

      <AvailableItems
        availableItems={availableItems as DraggableItem[]}
        renderIcon={renderIcon}
      />
      <Zoom setScale={setScale} />
    </div>
  );
}
