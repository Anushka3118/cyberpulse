import React, { useState } from "react";

function AISection() {
  const [input, setInput] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [simResult, setSimResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 PHISHING SCAN
  const handleScan = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://127.0.0.1:5001/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Backend not responding");

      const data = await res.json();
      setScanResult(data);
      setSimResult(null);
    } catch (err) {
      setError("❌ Backend connection failed. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 ATTACK SIMULATION
  const handleSimulate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://127.0.0.1:5001/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) throw new Error("Backend not responding");

      const data = await res.json();
      setSimResult(data);
      setScanResult(null);
    } catch (err) {
      setError("❌ Backend connection failed. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="awareness-module">
      <h2>🤖 AI Cyber Scanner</h2>

      <input
        type="text"
        placeholder="Enter URL or email text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleScan}>🔍 Scan</button>
        <button onClick={handleSimulate}>⚡ Simulate Attack</button>
      </div>

      {/* LOADING */}
      {loading && <p>⏳ Processing...</p>}

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔍 SCAN RESULT */}
      {scanResult && (
        <div className="card">
          <h3>Scan Result</h3>
          <p>Risk Score: {scanResult.score}%</p>
          <p>Status: {scanResult.status}</p>

          {scanResult.reasons.map((r, i) => (
            <p key={i}>⚠️ {r}</p>
          ))}
        </div>
      )}

      {/* 🧠 SIMULATION RESULT */}
      {simResult && (
        <div className="card">
          <h3>Attack Type: {simResult.type}</h3>

          {simResult.steps.map((step, i) => (
            <p key={i}>➡️ {step}</p>
          ))}

          <h4>🛡️ Prevention</h4>
          {simResult.prevention.map((p, i) => (
            <p key={i}>✔️ {p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AISection;