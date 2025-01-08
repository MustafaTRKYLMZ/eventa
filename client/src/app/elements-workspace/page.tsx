"use client";

import { useEffect, useState } from "react";
import { ShapesDisplay } from "../components/ShapesDisplay";
import { useStateValue } from "../context/stateContext";

import { DynamicModal } from "../components/modal/DynamicModal";
import { CreateElementForm } from "../components/shapes/CreateElementForm";
//import elements from "../data/elements.json";

export default function ElementsWorkspace() {
  const { shapes } = useStateValue();

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Shapes", shapes);

  const onClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem("shapes", JSON.stringify(shapes));
    }
  }, [shapes]);

  return (
    <div className="display flex flex-col items-center justify-center m-0 p-0">
      <div className="display flex flex-row items-center justify-between mr-8 p-0 w-full">
        <h1 className="text-3xl font-bold mb-4 p-4">elements workspace</h1>
        <button onClick={() => setIsModalOpen(true)}>Create new element</button>
      </div>
      {/* mdoal */}
      <DynamicModal isOpen={isModalOpen} onClose={onClose}>
        <CreateElementForm />
      </DynamicModal>
      {/* elements */}
      <div className="gap-4 grid grid-cols-3">
        <ShapesDisplay />
      </div>
    </div>
  );
}
