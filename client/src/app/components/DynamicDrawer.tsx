"use client";

import React, { FC } from "react";

interface DynamicDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DynamicDrawer: FC<DynamicDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 relative">
      <div className="bg-white p-6 rounded-lg w-1/3 relative scrollbar h-full overflow-auto absolute top-0 right-0">
        <div className="mb-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg text-white"
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
