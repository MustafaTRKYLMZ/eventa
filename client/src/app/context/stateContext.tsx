"use client";
import React, {
  createContext,
  useContext,
  Dispatch,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Action, initialState, ShapeReducer } from "./shapeReducer";
import { Shape } from "../types/Shape";

// State context
export const StateContext = createContext<typeof initialState | undefined>(
  undefined
);

export const DispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);
export const GlobalSvgContext = createContext<SVGSVGElement | null>(null);
export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(ShapeReducer, initialState);

  useEffect(() => {
    const savedShapes = localStorage.getItem("shapes");

    if (savedShapes) {
      const parsedShapes = JSON.parse(savedShapes);

      if (Array.isArray(parsedShapes)) {
        parsedShapes.forEach((shape: Shape) => {
          dispatch({
            type: "ADD_SHAPE",
            payload: shape,
          });
        });
      } else if (typeof parsedShapes === "object" && parsedShapes !== null) {
        const shapesArray = Object.values(parsedShapes) as Shape[];
        shapesArray.forEach((shape) => {
          dispatch({
            type: "ADD_SHAPE",
            payload: shape,
          });
        });
      } else {
        console.warn("Unsupported shape data format:", parsedShapes);
      }
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateValue must be used within a StateProvider");
  }
  return context;
};

export const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error("useDispatch must be used within a StateProvider");
  }
  return context;
};
export const useGlobalSvg = () => {
  const context = useContext(GlobalSvgContext);
  if (!context) {
    throw new Error("useGlobalSvg must be used within a StateProvider");
  }
  return context;
};
