"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch,
} from "react";
import { VenueReducer, initialState } from "./venueReducer";
import { Action } from "./venueReducer";

// Global Venue State Context
export const GlobalVenueContext = createContext<
  typeof initialState | undefined
>(undefined);

// Global Dispatch Context
export const DispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

export const GlobalVenueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(VenueReducer, initialState);

  return (
    <GlobalVenueContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GlobalVenueContext.Provider>
  );
};

// Custom hook to access the venue state
export const useGlobalVenue = () => {
  const context = useContext(GlobalVenueContext);
  if (!context) {
    throw new Error("useGlobalVenue must be used within a GlobalVenueProvider");
  }
  return context;
};

// Custom hook to access the dispatch function
export const useDispatchVenue = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error(
      "useDispatchVenue must be used within a GlobalVenueProvider"
    );
  }
  return context;
};
