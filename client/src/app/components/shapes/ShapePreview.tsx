import React, { useState } from "react";
import { ShapeType } from "@/app/types/Shape";

interface ShapePreviewProps {
  shapeType: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  color: string;
  points: string;
  d: string;
  angle: number;
  borderRadius: number;
  x2: number;
  y2: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

export const ShapePreview: React.FC<ShapePreviewProps> = ({
  shapeType,
  x,
  y,
  width,
  height,
  radius,
  color,
  points,
  d,
  angle,
  borderRadius,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  const [scale, setScale] = useState(1);

  const handleMouseEnter = () => {
    setScale(1.1); // Fare şekle girdiğinde biraz büyütme
  };

  const handleMouseLeave = () => {
    setScale(1);
  };

  const handleClick = () => {
    console.log("Shape clicked!");
    setCurrentColor(currentColor === color ? "green" : color);
  };

  const renderShape = () => {
    const adjustedX = x + paddingLeft;
    const adjustedY = y + paddingTop;
    const adjustedWidth = width + paddingLeft + paddingRight;
    const adjustedHeight = height + paddingTop + paddingBottom;

    switch (shapeType) {
      case ShapeType.RECTANGLE:
      case ShapeType.SQUARE:
        // Handle rectangle and square shapes with a border-radius and possible padding
        if (borderRadius > 0) {
          return (
            <path
              d={`M ${adjustedX + borderRadius} ${adjustedY} 
                  H ${adjustedX + adjustedWidth - borderRadius} 
                  A ${borderRadius} ${borderRadius} 0 0 1 ${
                adjustedX + adjustedWidth
              } ${adjustedY + borderRadius}
                  V ${adjustedY + adjustedHeight - borderRadius} 
                  A ${borderRadius} ${borderRadius} 0 0 1 ${
                adjustedX + adjustedWidth - borderRadius
              } ${adjustedY + adjustedHeight} 
                  H ${adjustedX + borderRadius}
                  A ${borderRadius} ${borderRadius} 0 0 1 ${adjustedX} ${
                adjustedY + adjustedHeight - borderRadius
              }
                  V ${adjustedY + borderRadius}
                  A ${borderRadius} ${borderRadius} 0 0 1 ${
                adjustedX + borderRadius
              } ${adjustedY} Z`}
              fill={currentColor} // Use currentColor for fill
              transform={`rotate(${angle}, ${adjustedX + adjustedWidth / 2}, ${
                adjustedY + adjustedHeight / 2
              }) scale(${scale})`} // Apply scale for zoom effect
              onMouseEnter={handleMouseEnter} // Hover event
              onMouseLeave={handleMouseLeave} // Leave event
              onClick={handleClick} // Click event
            />
          );
        }
        return (
          <rect
            x={adjustedX}
            y={adjustedY}
            width={adjustedWidth}
            height={adjustedHeight}
            fill={currentColor} // Use currentColor for fill
            rx={borderRadius} // Apply borderRadius to the rectangle
            ry={borderRadius} // Apply borderRadius to the rectangle
            transform={`rotate(${angle}, ${adjustedX + adjustedWidth / 2}, ${
              adjustedY + adjustedHeight / 2
            }) scale(${scale})`} // Apply scale for zoom effect
            onMouseEnter={handleMouseEnter} // Hover event
            onMouseLeave={handleMouseLeave} // Leave event
            onClick={handleClick} // Click event
          />
        );

      case ShapeType.CIRCLE:
        return (
          <circle
            cx={x}
            cy={y}
            r={radius}
            fill={currentColor} // Use currentColor for fill
            transform={`rotate(${angle}, ${x}, ${y}) scale(${scale})`} // Apply scale for zoom effect
            onMouseEnter={handleMouseEnter} // Hover event
            onMouseLeave={handleMouseLeave} // Leave event
            onClick={handleClick} // Click event
          />
        );

      case ShapeType.POLYGON:
        const polygonPoints = points
          .split(",")
          .map((point) => {
            const [px, py] = point.split(" ").map(Number);
            return `${px + paddingLeft},${py + paddingTop}`; // Adjust points based on padding
          })
          .join(" ");
        return (
          <polygon
            points={polygonPoints}
            fill={currentColor} // Use currentColor for fill
            onMouseEnter={handleMouseEnter} // Hover event
            onMouseLeave={handleMouseLeave} // Leave event
            onClick={handleClick} // Click event
          />
        );

      case ShapeType.PATH:
        return (
          <path
            d={d}
            fill={currentColor}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="preview-container">
      <h3>Shape Preview</h3>
      <svg
        width="300"
        height="300"
        style={{ border: "1px solid #ccc", backgroundColor: "#f9f9f9" }}
      >
        {renderShape()}
      </svg>
    </div>
  );
};
