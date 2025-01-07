"use client";

import React, { useEffect, useState } from "react";

export type Seat = {
  seatIndex: number;
  x: number;
  y: number;
  angle: number;
  radius: number;
};

const TheaterSeating = () => {
  const [numSeatsPerRow] = useState(10); // Her sıradaki koltuk sayısı
  const [firstRowRadius] = useState(200); // Birinci sıradaki koltukların r değeri
  const [secondRowRadius] = useState(250); // İkinci sıradaki koltukların r değeri
  const [centerX, setCenterX] = useState(window.innerWidth / 2); // Ekranın merkezi X
  const [centerY, setCenterY] = useState(window.innerHeight / 2); // Ekranın merkezi Y

  const calculateCoordinates = (
    i: number,
    numSeatsPerRow: number,
    radius: number,
    centerX: number,
    centerY: number
  ) => {
    // 0° ile +180° arasında açı dağıtıyoruz
    const angle = (i * 180) / (numSeatsPerRow - 1); // Koltukları eşit aralıklarla dağıtıyoruz
    const pAngle = (angle * Math.PI) / 180; // Radyan cinsine çeviriyoruz

    const pX = centerX + radius * Math.cos(pAngle); // Polar X koordinatını hesapla
    const pY = centerY + radius * Math.sin(pAngle); // Polar Y koordinatını hesapla
    return { x: pX, y: pY, angle }; // Polar Y koordinatını hesapla
  };

  const getSeatsCoordinates = (
    numSeatsPerRow: number,
    radius: number,
    centerX: number,
    centerY: number,
    startIndex: number
  ) => {
    const seats = [];
    for (let i = 0; i < numSeatsPerRow; i++) {
      // 0° ile +180° arasında açı dağıtıyoruz
      const { x, y, angle } = calculateCoordinates(
        i,
        numSeatsPerRow,
        radius,
        centerX,
        centerY
      );
      seats.push({
        seatIndex: startIndex + i, // Koltuğun numarasını doğru şekilde başlatıyoruz
        x,
        y,
        angle, // Koltuğun açısını da saklıyoruz
        radius, // Bu sıradaki koltuklar için r değeri
      });
    }
    return seats;
  };

  // Koltukları sırayla ekliyoruz
  const firstRowSeats = getSeatsCoordinates(
    numSeatsPerRow,
    firstRowRadius,
    centerX,
    centerY,
    0
  ); // İlk sıradaki koltuklar
  const secondRowSeats = getSeatsCoordinates(
    numSeatsPerRow,
    secondRowRadius,
    centerX,
    centerY,
    firstRowSeats.length
  ); // İkinci sıradaki koltuklar

  const allSeats = [...firstRowSeats, ...secondRowSeats]; // Koltukları birleştiriyoruz

  useEffect(() => {
    const updateCenter = () => {
      setCenterX(window.innerWidth / 2);
      setCenterY(window.innerHeight / 2);
    };

    window.addEventListener("resize", updateCenter);
    return () => {
      window.removeEventListener("resize", updateCenter);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <div
        style={{
          position: "absolute",
          left: `${centerX - 100}px`, // Sahnenin merkezi X
          top: `${centerY - 50}px`, // Sahnenin merkezi Y
          width: "200px",
          height: "100px",
          backgroundColor: "red",
          borderRadius: "20%",
        }}
      >
        Center (Sahne)
      </div>

      {/* Koltukları Render Et */}
      {allSeats.map((seat) => (
        <div
          key={seat.seatIndex} // Koltukların benzersiz key'leri
          style={{
            position: "absolute",
            left: `${seat.x - 15}px`, // Koltuğun X koordinatını yerleştir
            top: `${seat.y - 15}px`, // Koltuğun Y koordinatını yerleştir
            width: "30px",
            height: "30px",
            backgroundColor: "blue",
            borderRadius: "50%",
            textAlign: "center",
            lineHeight: "30px",
            color: "white",
            fontSize: "14px",
          }}
        >
          {seat.seatIndex + 1} {/* Koltuğun numarasını doğru şekilde göster */}
        </div>
      ))}
    </div>
  );
};

export default TheaterSeating;
