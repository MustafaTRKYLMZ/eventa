"use client";
import React, { FC } from "react";
import { DinamicModal } from "./DinamicModal";

export type CreateSvgProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const CreateSvg: FC<CreateSvgProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div>
      <h1>CreateSvg</h1>
      <DinamicModal show={isOpen} onClose={() => setIsOpen(false)}>
        Hello Create Svg Modal
      </DinamicModal>
    </div>
  );
};
