import { useState } from "react";
import { useDispatch } from "@/app/context/stateContext";
import { ShapeType } from "@/app/types/Shape";
import { Input } from "@/app/components/Input";
import { ShapePreview } from "./ShapePreview";

export const CreateElementForm = () => {
  const dispatch = useDispatch();

  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.RECTANGLE);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [radius, setRadius] = useState(50);
  const [color, setColor] = useState("orange");
  const [points, setPoints] = useState<string>(""); // Points as a string input
  const [d, setD] = useState<string>("");
  const [angle, setAngle] = useState(0);
  const [x2, setX2] = useState(100);
  const [y2, setY2] = useState(100);
  const [borderRadius, setBorderRadius] = useState(0);

  // Padding variables
  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingRight, setPaddingRight] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);
  const [paddingLeft, setPaddingLeft] = useState(0);

  const addShape = () => {
    const offsetX = 20;
    const offsetY = 20;
    let newShape = {
      id: Math.random().toString(),
      type: shapeType,
      color,
      x: x + offsetX,
      y: y + offsetY,
      radius,
      width,
      height,
      angle,
      points: [] as [number, number][], // Points array as tuples
      d,
      x2,
      y2,
      borderRadius,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    };

    // Shape-specific handling
    if (shapeType === ShapeType.RECTANGLE || shapeType === ShapeType.SQUARE) {
      newShape = {
        ...newShape,
        width: width + paddingLeft + paddingRight,
        height: height + paddingTop + paddingBottom,
      };
    } else if (shapeType === ShapeType.CIRCLE) {
      newShape = { ...newShape, radius };
    } else if (shapeType === ShapeType.POLYGON) {
      // Split the points string and convert to array of [x, y] tuples
      newShape = {
        ...newShape,
        points: points.split(",").map((point) => {
          const [px, py] = point.split(" ").map(Number);
          return [px || 0, py || 0]; // Ensure fallback to 0 if invalid point
        }),
      };
    } else if (shapeType === ShapeType.PATH) {
      newShape = { ...newShape, d };
    }

    dispatch({
      type: "ADD_SHAPE",
      payload: newShape,
    });
    // clear all inputs
    const resetForm = () => {
      setShapeType(ShapeType.RECTANGLE);
      setX(50);
      setY(50);
      setWidth(100);
      setHeight(100);
      setRadius(50);
      setColor("orange");
      setPoints("");
      setD("");
      setAngle(0);
      setX2(100);
      setY2(100);
      setBorderRadius(0);
      setPaddingTop(0);
      setPaddingRight(0);
      setPaddingBottom(0);
      setPaddingLeft(0);
    };
    resetForm();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold">Create Shape</h2>

      {/* Shape Type Selection */}
      <select
        className="p-2 border rounded bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setShapeType(e.target.value as ShapeType)}
        value={shapeType}
      >
        <option value={ShapeType.RECTANGLE}>Rectangle</option>
        <option value={ShapeType.CIRCLE}>Circle</option>
        <option value={ShapeType.ELLIPSE}>Ellipse</option>
        <option value={ShapeType.LINE}>Line</option>
        <option value={ShapeType.POLYGON}>Polygon</option>
        <option value={ShapeType.PATH}>Path</option>
        <option value={ShapeType.SQUARE}>Square</option>
        <option value={ShapeType.TRIANGLE}>Triangle</option>
        <option value={ShapeType.STAR}>Star</option>
        <option value={ShapeType.DIAMOND}>Diamond</option>
      </select>

      <div>
        {/* Common Inputs */}
        <Input
          label="X"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          type="number"
        />
        <Input
          label="Y"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
          type="number"
        />
        <Input
          label="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="color"
        />
      </div>

      {/* Shape-Specific Inputs */}
      {shapeType === ShapeType.RECTANGLE || shapeType === ShapeType.SQUARE ? (
        <>
          <Input
            label="Width"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            type="number"
          />
          <Input
            label="Height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            type="number"
          />
          <Input
            label="Border Radius"
            value={borderRadius}
            onChange={(e) => setBorderRadius(Number(e.target.value))}
            type="number"
          />
          <div className="flex flex-col">
            <div className="flex flex-row gap-4">
              <Input
                label="Padding Top"
                value={paddingTop}
                onChange={(e) => setPaddingTop(Number(e.target.value))}
                type="number"
              />
              <Input
                label="Padding Bottom"
                value={paddingBottom}
                onChange={(e) => setPaddingBottom(Number(e.target.value))}
                type="number"
              />
            </div>
            <div className="flex flex-row gap-4">
              <Input
                label="Padding Right"
                value={paddingRight}
                onChange={(e) => setPaddingRight(Number(e.target.value))}
                type="number"
              />
              <Input
                label="Padding Left"
                value={paddingLeft}
                onChange={(e) => setPaddingLeft(Number(e.target.value))}
                type="number"
              />
            </div>
          </div>
        </>
      ) : null}

      {shapeType === ShapeType.CIRCLE ? (
        <Input
          label="Radius"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          type="number"
        />
      ) : null}

      {shapeType === ShapeType.POLYGON ? (
        <Input
          label="Points (e.g. '50 50, 100 100, 150 50')"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          type="text"
        />
      ) : null}

      {shapeType === ShapeType.PATH ? (
        <Input
          label="Path Data (e.g. 'M10 10 H 90 V 90 H 10 Z')"
          value={d}
          onChange={(e) => setD(e.target.value)}
          type="text"
        />
      ) : null}

      {/* Açı (angle) Input */}
      <Input
        label="Angle (degrees)"
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
        type="number"
      />
      {/* Line-specific Inputs */}
      {shapeType === ShapeType.LINE && (
        <>
          <Input
            label="End X"
            value={x2}
            onChange={(e) => setX2(Number(e.target.value))}
            type="number"
          />
          <Input
            label="End Y"
            value={y2}
            onChange={(e) => setY2(Number(e.target.value))}
            type="number"
          />
        </>
      )}

      <ShapePreview
        shapeType={shapeType}
        x={x}
        y={y}
        width={width}
        height={height}
        radius={radius}
        color={color}
        points={points}
        d={d}
        angle={angle}
        x2={x2}
        y2={y2}
        borderRadius={borderRadius}
        paddingTop={paddingTop}
        paddingRight={paddingRight}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
      />
      <button
        onClick={addShape}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Shape
      </button>
    </div>
  );
};

// reset form
