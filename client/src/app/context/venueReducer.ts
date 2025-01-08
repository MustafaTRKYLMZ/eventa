import { Venue } from "../types/Venue";

export type State = {
  venues: Venue[];
};

export const initialState: State = {
  venues: [],
};

export type Action =
  | { type: "ADD_VENUE"; payload: Venue }
  | { type: "UPDATE_VENUE"; payload: Venue }
  | { type: "DELETE_VENUE"; payload: string };

export const VenueReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_VENUE":
      return {
        ...state,
        venues: [...state.venues, action.payload],
      };

    case "UPDATE_VENUE":
      return {
        ...state,
        venues: state.venues.map((venue) =>
          venue.id === action.payload.id
            ? { ...venue, ...action.payload }
            : venue
        ),
      };

    case "DELETE_VENUE":
      return {
        ...state,
        venues: state.venues.filter((venue) => venue.id !== action.payload),
      };

    default:
      return state;
  }
};
