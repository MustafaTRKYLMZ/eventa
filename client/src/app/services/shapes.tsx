import * as d3 from "d3";

// Şekil türleri için enum
export const ShapeType = {
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  POLYGON: "polygon",
};

// Şekil özellikleri
export const createShape = (svg, shape) => {
  const { id, type, x, y, width, height, angle, color, radius, points } = shape;

  // Dikdörtgen oluşturma
  const createRectangle = () => {
    return svg
      .append("rect")
      .attr("id", id)
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color)
      .attr("stroke", "black");
  };

  // Daire oluşturma
  const createCircle = () => {
    return svg
      .append("circle")
      .attr("id", id)
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", radius)
      .attr("fill", color)
      .attr("stroke", "black");
  };

  // Poligon oluşturma
  const createPolygon = () => {
    return svg
      .append("polygon")
      .attr("id", id)
      .attr("points", points?.map(([x, y]) => `${x},${y}`).join(" "))
      .attr("fill", color)
      .attr("stroke", "black");
  };

  switch (type) {
    case ShapeType.RECTANGLE:
      return createRectangle();
    case ShapeType.CIRCLE:
      return createCircle();
    case ShapeType.POLYGON:
      return createPolygon();
    default:
      return null;
  }
};

// Taşıma işlemi
export const moveShape = (shape, dx, dy) => {
  shape.x += dx;
  shape.y += dy;
  d3.select(`#${shape.id}`).attr("x", shape.x).attr("y", shape.y);
};

// Şekli döndürme
export const rotateShape = (shape, angle) => {
  shape.angle = angle;
  d3.select(`#${shape.id}`).attr(
    "transform",
    `rotate(${angle}, ${shape.x}, ${shape.y})`
  );
};

// Boyutlandırma işlemi
export const resizeShape = (shape, width, height) => {
  shape.width = width;
  shape.height = height;
  d3.select(`#${shape.id}`).attr("width", width).attr("height", height);
};

// Mouse Event'lerini ekleme
export const addMouseEvents = (shape, svg) => {
  let isResizing = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let resizeStartX = 0;
  let resizeStartY = 0;

  const element = d3.select(`#${shape.id}`);

  element
    .on("mousedown", (event) => {
      // Taşıma ya da boyutlandırma işlemi
      if (isCornerClick(event)) {
        startResize(event);
      } else {
        startDrag(event);
      }
    })
    .on("mousemove", (event) => {
      if (isResizing) {
        resize(event);
      } else if (isDragging) {
        drag(event);
      }
    })
    .on("mouseup", () => {
      endDragOrResize();
    });

  const isCornerClick = (event) => {
    const { x, y, width, height } = shape;
    const cornerArea = 20; // Köşe alanı
    return (
      Math.abs(event.clientX - (x + width)) < cornerArea &&
      Math.abs(event.clientY - (y + height)) < cornerArea
    );
  };

  const startDrag = (event) => {
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    isDragging = true;
  };

  const drag = (event) => {
    const dx = event.clientX - dragStartX;
    const dy = event.clientY - dragStartY;
    moveShape(shape, dx, dy);
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  };

  const startResize = (event) => {
    isResizing = true;
    resizeStartX = event.clientX;
    resizeStartY = event.clientY;
  };

  const resize = (event) => {
    const dx = event.clientX - resizeStartX;
    const dy = event.clientY - resizeStartY;
    resizeShape(shape, shape.width + dx, shape.height + dy);
    resizeStartX = event.clientX;
    resizeStartY = event.clientY;
  };

  const endDragOrResize = () => {
    isDragging = false;
    isResizing = false;
  };
};
