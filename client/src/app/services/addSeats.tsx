import { Venue } from "../components/types";

export const addSeats = (
  floorId: string,
  sectionId: string,
  rowId: string,
  count: number,
  setNewVenue: React.Dispatch<React.SetStateAction<Venue>>,
  newVenue: Venue
) => {
  if (!newVenue || !newVenue.floors) {
    return;
  }
  setNewVenue((prev) => ({
    ...prev,
    floors: prev.floors.map((floor) =>
      floor.id === floorId
        ? {
            ...floor,
            sections: floor.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    rows: section.rows.map((row) =>
                      row.id === rowId
                        ? {
                            ...row,
                            seats: [
                              ...row.seats,
                              ...Array.from({ length: count }, (_, i) => ({
                                id: `${Date.now()}-${i + row.seats.length}`,
                                number: row.seats.length + i + 1,
                              })),
                            ],
                          }
                        : row
                    ),
                  }
                : section
            ),
          }
        : floor
    ),
  }));
};
