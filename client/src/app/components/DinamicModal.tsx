// components/Modal.tsx
"use client";
import React from "react";

interface DinamicModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DinamicModal: React.FC<DinamicModalProps> = ({
  show,
  onClose,
  children,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "orange",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
        <button
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
