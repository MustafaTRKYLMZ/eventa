import { Input } from "./Input";
import { Drawer } from "./Drawer";
import { Stage } from "./types";
import React from "react";

export type UpdateStageDrawerProps = {
  stageInfo: Stage;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const UpdateStageDrawer = ({
  stageInfo,
  isDrawerOpen,
  setIsDrawerOpen,
  handleInputChange,
}: UpdateStageDrawerProps) => {
  return (
    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <h2>Edit Stage</h2>
      <Input
        label="Radius of Stage"
        name="stageRadius"
        value={stageInfo.stageRadius}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Center of Stage X"
        name="centerX"
        value={stageInfo.centerX}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Center of Stage Y"
        name="centerY"
        value={stageInfo.centerY}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Width of Stage"
        name="stageWidth"
        value={stageInfo.stageWidth}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Height of Stage"
        name="stageHeight"
        value={stageInfo.stageHeight}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Stage Color"
        name="stageColor"
        type="color"
        value={stageInfo.stageColor}
        handleInputChange={handleInputChange}
      />
      <Input
        label="Stage Rotation (Degrees)"
        name="stageRotation"
        type="number"
        value={stageInfo.stageRotation as number | string}
        handleInputChange={handleInputChange}
      />
    </Drawer>
  );
};
