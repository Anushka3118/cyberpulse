import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const attackData = [
  { name: "Malware", value: 30 },
  { name: "Phishing", value: 25 },
  { name: "DDoS", value: 20 },
  { name: "MitM", value: 10 },
  { name: "SQL Injection", value: 8 },
  { name: "Zero-day", value: 5 },
  { name: "Ransomware", value: 15 },
  { name: "Supply Chain", value: 7 },
];

const countryData = [
  { country: "Russia", attacks: 100 },
  { country: "Ukraine", attacks: 95 },
  { country: "China", attacks: 90 },
  { country: "USA", attacks: 85 },
  { country: "Nigeria", attacks: 80 },
  { country: "Romania", attacks: 75 },
  { country: "N. Korea", attacks: 70 },
  { country: "UK", attacks: 65 },
  { country: "Brazil", attacks: 60 },
  { country: "India", attacks: 55 },
];

const COLORS = [
  "#ff4d4d",
  "#ff6666",
  "#ff1a1a",
  "#cc0000",
  "#990000",
  "#ff8080",
  "#ff3333",
  "#b30000",
];

function Charts() {
  return (
    <div className="charts-section">
      <h2 style={{ textAlign: "center" }}>📊 Cyber Attack Analytics</h2>

      {/* PIE CHART */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={attackData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {attackData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* BAR CHART */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BarChart width={600} height={300} data={countryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="attacks" fill="#ff4d4d" />
        </BarChart>
      </div>
    </div>
  );
}

export default Charts;