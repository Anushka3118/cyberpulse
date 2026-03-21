import "./App.css";
import React, { useState } from "react";

// COMPONENTS
import MapComponent from "./components/MapComponent";
import Charts from "./components/Charts";
import Alerts from "./components/Alerts";
import AttackFeed from "./components/AttackFeed";
import Awareness from "./components/Awareness";
import StoryMode from "./components/StoryMode";
import AISection from "./components/AISection";

// 🏠 HOME COMPONENT
function Home() {
  return (
    <div className="fade-in">

      <h1 className="app-title">🚨 CYBERATTACK VISUALIZATION</h1>
      <p className="app-subtitle">
        Real-Time Cyber Attack Intelligence Dashboard
      </p>

      {/* 🌍 MAP */}
      <div className="map-container">
        <MapComponent />
      </div>

      {/* 🔥 LIVE FEED */}
      <div className="card">
        <h3>🔥 Live Threat Feed</h3>
        <p>⚠️ Phishing attacks rising globally</p>
        <p>⚡ Malware traffic detected</p>
        <p>🚨 Suspicious login attempts ongoing</p>
      </div>

      {/* ⚡ QUICK STATS */}
      <div className="card">
        <h3>📊 Quick Stats</h3>
        <p>🌍 Active Attacks: 128</p>
        <p>🚨 Critical Threats: 32</p>
        <p>🛡️ Systems Protected: 1,204</p>
      </div>

    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="app-container">

      {/* 🔥 NAVBAR */}
      <div className="navbar">

        <button
          className={activeTab === "home" ? "active-tab" : ""}
          onClick={() => setActiveTab("home")}
        >
          🏠 Home
        </button>

        <button
          className={activeTab === "ai" ? "active-tab" : ""}
          onClick={() => setActiveTab("ai")}
        >
          🤖 AI Scanner
        </button>

        <button
          className={activeTab === "attacks" ? "active-tab" : ""}
          onClick={() => setActiveTab("attacks")}
        >
          🚨 Live Attacks
        </button>

        <button
          className={activeTab === "awareness" ? "active-tab" : ""}
          onClick={() => setActiveTab("awareness")}
        >
          📚 Awareness
        </button>

        <button
          className={activeTab === "story" ? "active-tab" : ""}
          onClick={() => setActiveTab("story")}
        >
          🎭 Story Mode
        </button>

        <button
          className={activeTab === "charts" ? "active-tab" : ""}
          onClick={() => setActiveTab("charts")}
        >
          📊 Analytics
        </button>

      </div>

      {/* 🔥 TAB CONTENT */}
      <div className="fade-in">

        {activeTab === "home" && <Home />}

        {activeTab === "ai" && <AISection />}

        {/* ✅ MERGED TAB (NO MAP) */}
        {activeTab === "attacks" && (
          <div className="fade-in">
            <Alerts />
            <AttackFeed />
          </div>
        )}

        {activeTab === "awareness" && <Awareness />}

        {activeTab === "story" && <StoryMode />}

        {activeTab === "charts" && <Charts />}

      </div>

    </div>
  );
}

export default App;