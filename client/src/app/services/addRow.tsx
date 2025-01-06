import { Venue } from "../components/types";
import { generateUniqueName } from "./generateUniqueName";

export const addRow = (
  floorId: string,
  sectionId: string,
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
                    rows: [
                      ...section.rows,
                      {
                        id: `${Date.now()}`,
                        name: generateUniqueName("New Row"),
                        seats: [
                          { id: `${Date.now()}-1`, number: 1 },
                          { id: `${Date.now()}-2`, number: 2 },
                          { id: `${Date.now()}-3`, number: 3 },
                        ],
                      },
                    ],
                  }
                : section
            ),
          }
        : floor
    ),
  }));
};
