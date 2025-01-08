"use client";

import { LeftSideBar } from "../LeftSideBar";
import { MainContent } from "../MainContent";
import { RightSideBar } from "../RightSideBar";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const VenueWorkspace = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Layout for sidebar and main content */}
      <div className="flex flex-row flex-grow w-full h-full">
        {/* Left Sidebar */}
        <LeftSideBar />

        {/* Main Content */}
        <MainContent />

        {/* Right Sidebar */}
        <RightSideBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
