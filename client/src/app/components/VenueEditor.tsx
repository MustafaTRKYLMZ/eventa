"use client";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import venueData from "../data/venueData.json";
import { Venue, Section } from "./types";
import { addSeats } from "../services/addSeats";
import { getColor } from "../services/getColor";
//import { addSection } from "../services/addSection"; // Servisten ekledik
import { addFloor } from "../services/addFloor";
import { generateUniqueName } from "../services/generateUniqueName";

export const VenueEditor = () => {
  const [newVenue, setNewVenue] = useState<Venue | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Aktif menü id'si
  const { venue } = venueData[0];

  useEffect(() => {
    if (venueData && venueData[0]) {
      setNewVenue(venueData[0]?.venue || null);
    }
  }, []);

  const updateSectionsOrder = (floorId: string, newOrder: string[]) => {
    if (!newVenue || !newVenue.floors) {
      return;
    }
    setNewVenue((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              sections: newOrder.map((id) =>
                floor.sections.find((section) => section.id === id)
              ),
            }
          : floor
      ),
    }));
  };

  // Add Row to Section
  const addRow = (
    floorId: string,
    sectionId: string,
    setNewVenue: React.Dispatch<React.SetStateAction<Venue>>,
    newVenue: Venue
  ) => {
    if (!newVenue || !newVenue.floors) {
      return;
    }

    setNewVenue((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              sections: floor.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      rows: [
                        ...section.rows,
                        {
                          id: `${Date.now()}`,
                          name: generateUniqueName("New Row"),
                          seats: [
                            { id: `${Date.now()}-1`, number: 1 },
                            { id: `${Date.now()}-2`, number: 2 },
                            { id: `${Date.now()}-3`, number: 3 },
                          ],
                        },
                      ],
                    }
                  : section
              ),
            }
          : floor
      ),
    }));
  };

  // Add Section
  const handleAddSection = (
    floorId: string,
    direction: "vertical" | "horizontal"
  ) => {
    if (newVenue) {
      addSection(floorId, direction, setNewVenue, newVenue); // Servis fonksiyonunu çağırıyoruz
    }
  };

  const addSection = (
    floorId: string,
    direction: "horizontal" | "vertical" = "vertical",
    setNewVenue: React.Dispatch<React.SetStateAction<Venue | null>>,
    newVenue: Venue | null
  ) => {
    // Benzersiz ID'yi istemci tarafında oluşturmak için bir state kullanacağız.

    // Eğer uniqueId hazırsa, ekleme işlemini yapabiliriz.

    setNewVenue((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === floorId
          ? {
              ...floor,
              sections: [
                ...floor.sections,
                {
                  id: `${Date.now()}`, // Date.now() yerine uniqueId'yi kullanıyoruz
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
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{venue.name}</h1>

      {/* Button to add a new floor */}
      <div className="flex justify-between mb-4">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => newVenue && addFloor(newVenue, setNewVenue)}
        >
          + Yeni Kat
        </button>
      </div>

      {/* Floor Sections */}
      {newVenue?.floors?.map((floor, floorIndex) => (
        <div
          key={floor.id}
          className="p-4"
          style={{
            backgroundColor: getColor(floorIndex, "floor"), // Kat renkleri
          }}
        >
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <h2 className="font-semibold text-lg">{floor.name}</h2>
            </div>

            {/* Menü */}
            <div className="relative inline-block">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === floor.id ? null : floor.id)
                } // Sadece bu katın menüsünü aç
                className="bg-gray-400 text-white p-2 rounded-full"
              >
                <span className="text-lg">...</span>
              </button>

              {activeMenu === floor.id && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-2 w-40">
                  <button
                    className="block text-left text-gray-700 py-1 px-2 hover:bg-gray-200 w-full"
                    onClick={() => handleAddSection(floor.id, "vertical")}
                  >
                    Alta Ekle
                  </button>
                  <button
                    className="block text-left text-gray-700 py-1 px-2 hover:bg-gray-200 w-full"
                    onClick={() => handleAddSection(floor.id, "horizontal")}
                  >
                    Yana Ekle
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Floor Sections */}
          <ReactSortable
            group={{ name: "floors", pull: "clone", put: true }}
            tag="div"
            className="flex flex-col gap-4"
            onChange={(order: string[]) => updateSectionsOrder(floor.id, order)}
            list={floor.sections}
            setList={(newState: Section[]) =>
              updateSectionsOrder(
                floor.id,
                newState.map((section) => section.id)
              )
            }
          >
            {floor.sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="p-4"
                style={{
                  backgroundColor: getColor(sectionIndex, "section"),
                }}
              >
                <div className="flex justify-between">
                  <h3>{section.name}</h3>
                  {/* Add Row */}
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      newVenue &&
                      addRow(floor.id, section.id, setNewVenue, newVenue)
                    }
                  >
                    + Row
                  </button>
                </div>

                <div>
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={row.id}
                      className="flex mb-4"
                      style={{
                        backgroundColor: getColor(rowIndex, "row"),
                      }}
                    >
                      <>
                        {" "}
                        {row.seats.map((seat, seatIndex) => (
                          <div
                            key={seat.id}
                            className="w-12 h-12 text-center flex justify-center items-center"
                            style={{
                              backgroundColor: getColor(seatIndex, "seat"),
                            }}
                          >
                            {seat.number}
                          </div>
                        ))}
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                          onClick={() =>
                            addSeats(
                              floor.id,
                              section.id,
                              section.rows[section.rows.length - 1]?.id || "",
                              5,
                              setNewVenue,
                              newVenue
                            )
                          }
                        >
                          + Seats
                        </button>
                      </>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      ))}
    </div>
  );
};
