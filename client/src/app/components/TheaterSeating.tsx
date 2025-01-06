"use client";

import React, { useEffect, useState } from "react";

const TheaterSeating: React.FC = () => {
  const [numSeatsPerRow] = useState(10); // Her sıradaki koltuk sayısı
  const [firstRowRadius] = useState(200); // Birinci sıradaki koltukların r değeri
  const [secondRowRadius] = useState(250); // İkinci sıradaki koltukların r değeri
  const [centerX, setCenterX] = useState(window.innerWidth / 2); // Ekranın merkezi X
  const [centerY, setCenterY] = useState(window.innerHeight / 2); // Ekranın merkezi Y

  // Koltukları hesaplamak
  const seats = [];

  // Birinci sıradaki koltuklar
  for (let i = 0; i < numSeatsPerRow; i++) {
    // 0° ile +180° arasında açı dağıtıyoruz
    const angle = (i * 180) / (numSeatsPerRow - 1); // Koltukları eşit aralıklarla dağıtıyoruz
    const pAngle = (angle * Math.PI) / 180; // Radyan cinsine çeviriyoruz

    const pX = centerX + firstRowRadius * Math.cos(pAngle); // Polar X koordinatını hesapla
    const pY = centerY + firstRowRadius * Math.sin(pAngle); // Polar Y koordinatını hesapla

    seats.push({
      seatIndex: i,
      x: pX,
      y: pY,
      angle: angle, // Koltuğun açısını da saklıyoruz
      radius: firstRowRadius, // Bu sıradaki koltuklar için r değeri
    });
  }

  // İkinci sıradaki koltuklar
  for (let i = 0; i < numSeatsPerRow; i++) {
    // 0° ile +180° arasında açı dağıtıyoruz
    const angle = (i * 180) / (numSeatsPerRow - 1); // Koltukları eşit aralıklarla dağıtıyoruz
    const pAngle = (angle * Math.PI) / 180; // Radyan cinsine çeviriyoruz

    const pX = centerX + secondRowRadius * Math.cos(pAngle); // Polar X koordinatını hesapla
    const pY = centerY + secondRowRadius * Math.sin(pAngle); // Polar Y koordinatını hesapla

    seats.push({
      seatIndex: i + numSeatsPerRow,
      x: pX,
      y: pY,
      angle: angle, // Koltuğun açısını da saklıyoruz
      radius: secondRowRadius, // Bu sıradaki koltuklar için r değeri
    });
  }

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
          left: `${centerX - 25}px`, // Sahnenin merkezi X
          top: `${centerY - 25}px`, // Sahnenin merkezi Y
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
      >
        Center (Sahne)
      </div>

      {seats.map((seat) => (
        <div
          key={seat.seatIndex}
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
          {seat.seatIndex + 1}
        </div>
      ))}
    </div>
  );
};

export default TheaterSeating;
