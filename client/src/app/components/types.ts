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
