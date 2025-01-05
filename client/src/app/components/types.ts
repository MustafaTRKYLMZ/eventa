export type DraggableItem = {
  id: string;
  type: string;
  name: string;
  icon?: string;
  seatNumber?: string;
  imageUrl?: string;
  seatType?: "standard" | "vip" | "accessible";
  items?: DraggableItem[];
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
};

export type Seat = {
  id: string;
  name: string;
  seatNumber: string;
  seatType: "standard" | "vip" | "accessible";
  icon: string;
  type: string;
};
export type Section = {
  id: string;
  name: string;
  seats: Seat[];
  type: string;
  selectedSeatPackage: number;
  selectedSeatType: DraggableItem | null;
};
export type Venue = {
  id: string;
  name: string;
  sections: Section[];
};
