import { Shape } from "../types/Shape";

export type State = {
  shapes: Shape[];
};

export const initialState: State = {
  shapes: [],
};

export type Action =
  | { type: "ADD_SHAPE"; payload: Shape }
  | { type: "UPDATE_SHAPE"; payload: Shape }
  | { type: "DELETE_SHAPE"; payload: string };

export const ShapeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_SHAPE":
      return {
        ...state,
        shapes: [...state.shapes, action.payload],
      };

    case "UPDATE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.map((shape) =>
          shape.id === action.payload.id
            ? { ...shape, ...action.payload }
            : shape
        ),
      };

    case "DELETE_SHAPE":
      return {
        ...state,
        shapes: state.shapes.filter((shape) => shape.id !== action.payload),
      };

    default:
      return state;
  }
};
