import { JSX } from "react";
import ControlBoothSVG from "../components/Svgs/ControlBoothSVG";
import { RowSVG } from "../components/Svgs/RowSVG";
import { SeatSVG } from "../components/Svgs/SeatSVG";
import StageSVG from "../components/Svgs/StageSVG";
import StairsSVG from "../components/Svgs/StairsSVG";

const iconMap: { [key: string]: JSX.Element } = {
  "standard-seat": <SeatSVG type="standard" />,
  "vip-seat": <SeatSVG type="vip" />,
  "accessible-seat": <SeatSVG type="accessible" />,
  stage: <StageSVG />,
  row: <RowSVG />,
  "control-booth": <ControlBoothSVG />,
  stairs: <StairsSVG />,
};

export const renderIcon = (iconKey: string | undefined): JSX.Element => {
  return iconKey ? iconMap[iconKey] : <div />;
};
