"use client";
import { useState, useEffect } from "react";
import { Venue } from "../components/types";
import { generateUniqueName } from "../services/generateUniqueName"; // Varsayılan unique ID oluşturma fonksiyonu

export const addSection = (
  floorId: string,
  direction: "horizontal" | "vertical" = "vertical",
  setNewVenue: React.Dispatch<React.SetStateAction<Venue | null>>,
  newVenue: Venue | null
) => {
  // Benzersiz ID'yi istemci tarafında oluşturmak için bir state kullanacağız.
  const [uniqueId, setUniqueId] = useState<string>("");

  // Bu useEffect sadece istemci tarafında çalışır, çünkü window objesinin varlığını kontrol ederiz.
  useEffect(() => {
    if (typeof window !== "undefined") {
      // client-side olduğunda benzersiz bir ID üret
      setUniqueId(`${Date.now()}-${Math.random()}`);
    }
  }, []);
  if (!newVenue || !newVenue.floors) {
    return;
  }
  // Eğer uniqueId hazırsa, ekleme işlemini yapabiliriz.
  if (uniqueId) {
    setNewVenue((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              sections: [
                ...floor.sections,
                {
                  id: uniqueId, // Burada Date.now() yerine uniqueId'yi kullanıyoruz
                  name: generateUniqueName("New Section"),
                  type: "economy", // Varsayılan tür: economy
                  rows: [],
                  direction, // Yatay veya dikey
                },
              ],
            }
          : floor
      ),
    }));
  }
};
