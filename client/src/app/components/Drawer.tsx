// components/Drawer.tsx
"use client";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-400px",
        width: "400px",
        height: "100%",
        backgroundColor: "#333333",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        transition: "right 0.3s ease-in-out",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <button
        style={{
          alignSelf: "flex-end",
          backgroundColor: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Close
      </button>
      <div style={{ marginTop: "20px", flex: 1 }}>{children}</div>
    </div>
  );
};
