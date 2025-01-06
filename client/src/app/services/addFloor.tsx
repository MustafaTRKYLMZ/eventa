import { Venue } from "../components/types";
import { generateUniqueName } from "./generateUniqueName";

export const addFloor = (
  newVenue: Venue,
  setNewVenue: React.Dispatch<React.SetStateAction<Venue>>
) => {
  if (!newVenue) {
    return;
  }
  setNewVenue((prev) => ({
    ...prev,
    floors: [
      ...prev.floors,
      {
        id: `${Date.now()}`,
        name: generateUniqueName("New Floor"),
        sections: [],
      },
    ],
  }));
};
