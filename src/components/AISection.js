import React, { useState } from "react";

function AISection() {
  const [input, setInput] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [simResult, setSimResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 PHISHING SCAN
  const handleScan = async () => {
    try {
      setLoading(true);
      setError("");
      setScanResult("");

      const res = await fetch("http://127.0.0.1:5001/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Backend not responding");

      const data = await res.json();

      setScanResult(data.result); // ✅ important
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
      setSimResult(null);

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
      setScanResult("");

    } catch (err) {
      setError("❌ Backend connection failed. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="awareness-module">
      <h2>🤖 AI Cyber Scanner</h2>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter URL or email text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="ai-input"
      />

      {/* BUTTONS */}
      <div className="ai-buttons">
        <button onClick={handleScan}>🔍 Scan</button>
        <button onClick={handleSimulate}>⚡ Simulate Attack</button>
      </div>

      {/* LOADING */}
      {loading && <p className="ai-loading">⏳ AI is analyzing...</p>}

      {/* ERROR */}
      {error && <p className="ai-error">{error}</p>}

      {/* 🔍 SCAN RESULT (UPGRADED UI) */}
      {scanResult && (
        <div className="card">
          <h3>🧠 AI Analysis</h3>

          <div className="ai-terminal">
            {scanResult.split("\n").map((line, i) => {
              let className = "";

              if (line.toLowerCase().includes("risk score")) className = "ai-score";
              else if (line.toLowerCase().includes("attack type")) className = "ai-type";
              else if (line.toLowerCase().includes("reasons")) className = "ai-reason";
              else if (line.toLowerCase().includes("prevention")) className = "ai-prevent";

              return (
                <p key={i} className={className}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* 🧠 SIMULATION RESULT */}
      {simResult && (
        <div className="card">
          <h3>⚡ Attack Type: {simResult.type}</h3>

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