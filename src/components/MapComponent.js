import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Country coordinates (VERY IMPORTANT)
const coords = {
  Russia: [61, 105],
  Ukraine: [48, 31],
  China: [35, 103],
  USA: [37, -95],
  Nigeria: [9, 8],
  Romania: [45, 25],
  "North Korea": [40, 127],
  UK: [55, -3],
  Brazil: [-10, -55],
  India: [20, 78],
};

const attackTypes = [
  "Malware",
  "Phishing",
  "DDoS",
  "MitM",
  "SQL Injection",
  "Zero-day",
  "Ransomware",
  "Supply Chain",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function MapComponent() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const from = getRandom(Object.keys(coords));
      const to = getRandom(Object.keys(coords));

      if (from === to) return;

      const newAttack = {
        id: Date.now(),
        from,
        to,
        type: getRandom(attackTypes),
      };

      setAttacks((prev) => [newAttack, ...prev.slice(0, 5)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {attacks.map((attack) => {
          const fromCoords = coords[attack.from];
          const toCoords = coords[attack.to];

          if (!fromCoords || !toCoords) return null;

          return (
            <React.Fragment key={attack.id}>
              {/* LINE */}
              <Polyline
                positions={[fromCoords, toCoords]}
                pathOptions={{ color: "red", weight: 2 }}
              />

              {/* SOURCE DOT */}
              <CircleMarker
                center={fromCoords}
                radius={6}
                pathOptions={{ color: "red" }}
              />

              {/* TARGET DOT */}
              <CircleMarker
                center={toCoords}
                radius={6}
                pathOptions={{ color: "yellow" }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapComponent;