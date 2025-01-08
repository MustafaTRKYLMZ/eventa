"use client";

import { useEffect } from "react";
import { useStateValue } from "../context/stateContext";
import { VenueWorkspace } from "../components/venue-workspace/VenueWorkspace";

export default function VenuePage() {
  const { shapes } = useStateValue();

  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem("shapes", JSON.stringify(shapes));
    }
  }, [shapes]);

  return (
    <div className="flex flex-col items-center justify-center m-0 p-0 w-full">
      <VenueWorkspace />
    </div>
  );
}
