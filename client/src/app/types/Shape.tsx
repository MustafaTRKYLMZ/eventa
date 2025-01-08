// Şekil türleri için enum
export enum ShapeType {
  RECTANGLE = "rectangle",
  CIRCLE = "circle",
  POLYGON = "polygon",
  PATH = "path",
  ELLIPSE = "ellipse",
  LINE = "line",
  SQUARE = "square",
  TRIANGLE = "triangle",
  STAR = "star",
  DIAMOND = "diamond",
}

export type Shape = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  color: string;
  radius: number;
  points?: [number, number][];
};
