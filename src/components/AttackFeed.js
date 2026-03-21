import React, { useEffect, useState } from "react";

const countries = [
  "Russia", "Ukraine", "China", "USA", "Nigeria",
  "Romania", "North Korea", "UK", "Brazil", "India"
];

const attackTypes = [
  "Malware", "Phishing", "DDoS", "MitM",
  "SQL Injection", "Zero-day", "Ransomware", "Supply Chain"
];

const severities = ["Low", "Medium", "High"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function AttackFeed() {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAttack = {
        id: Date.now(),
        from: getRandom(countries),
        to: getRandom(countries),
        type: getRandom(attackTypes),
        severity: getRandom(severities),
        time: new Date().toLocaleTimeString(),
      };

      setAttacks((prev) => [newAttack, ...prev.slice(0, 9)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="attack-feed">
      <h2>🚨 Live Cyber Attacks</h2>

      {attacks.map((attack) => (
        <div key={attack.id} className="card">
          <p>
            🌍 <b>{attack.from}</b> ➝ <b>{attack.to}</b>
          </p>
          <p>💣 Type: {attack.type}</p>
          <p>
            🔥 Severity:{" "}
            <span className={`severity ${attack.severity.toLowerCase()}`}>
              {attack.severity}
            </span>
          </p>
          <p>⏱ {attack.time}</p>
        </div>
      ))}
    </div>
  );
}

export default AttackFeed;