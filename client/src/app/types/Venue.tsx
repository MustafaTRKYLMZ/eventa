export type DraggableItem = {
  id: string;
  type:
    | "seat"
    | "package"
    | "corridor"
    | "door"
    | "stage"
    | "controlCenter"
    | "stair";
  name: string;
  seatNumber?: string;
  seatType?: "standard" | "vip" | "accessible";
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
  icon?: string;
  items?: DraggableItem[];
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  angle?: number;
  fillColor?: string;
  strokeColor?: string;
};

export type Seat = {
  id: string;
  name: string;
  seatNumber: string;
  seatType: "standard" | "vip" | "accessible";
  icon: string;
  type: "seat";
  price: number;
  status: "available" | "sold" | "unavailable";
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  angle?: number;
  fillColor: string;
  strokeColor: string;
  rowIndex: number;
  sectionIndex: number;
};

export type Row = {
  id: string;
  name: string;
  seats: Seat[];
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  fillColor?: string;
  strokeColor?: string;
  rowIndex: number;
};

export type Section = {
  id: string;
  name: string;
  rows: Row[];
  type: "normal" | "vip" | "accessible" | "economy" | "balcony";
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  fillColor?: string;
  strokeColor?: string;
  sectionIndex: number;
};

export type Floor = {
  id: string;
  name: string;
  sections: Section[];
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  fillColor?: string;
  strokeColor?: string;
  floorIndex: number;
  stage: DraggableItem;
  controlCenter: DraggableItem;
  doors: DraggableItem[];
  corridors: DraggableItem[];
  stairs: DraggableItem[];
};

export type Venue = {
  id: string;
  name: string;
  floors: Floor[];
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  fillColor?: string;
  strokeColor?: string;
  venueIndex: number;
};
