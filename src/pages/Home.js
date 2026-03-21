import React, { useState } from "react";

import MapComponent from "../components/MapComponent";
import Charts from "../components/Charts";
import Alerts from "../components/Alerts";
import AttackFeed from "../components/AttackFeed";
import Awareness from "../components/Awareness";
import StoryMode from "../components/StoryMode";
import AISection from "../components/AISection";

function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="app-container">

      {/* 🔥 HERO SECTION */}
      <div className="hero">
        <h1 className="hero-title">🚨 CyberAttack Visualization</h1>
        <p className="hero-sub">
          Real-Time Cyber Attack Visualization & AI Defense System
        </p>
      </div>

      {/* 🔘 NAVIGATION TABS */}
      <div className="tabs">
        <button onClick={() => setActiveTab("home")}>🏠 Home</button>
        <button onClick={() => setActiveTab("ai")}>🤖 AI Scanner</button>
        <button onClick={() => setActiveTab("awareness")}>🎓 Awareness</button>
        <button onClick={() => setActiveTab("attacks")}>🌍 Live Attacks</button>
        <button onClick={() => setActiveTab("story")}>📖 Story Mode</button>
        <button onClick={() => setActiveTab("charts")}>📊 Charts</button>
      </div>

      {/* 🏠 HOME TAB (DEFAULT) */}
      {activeTab === "home" && (
        <>
          <MapComponent />
          <AttackFeed />
          <Alerts />
        </>
      )}

      {/* 🤖 AI */}
      {activeTab === "ai" && <AISection />}

      {/* 🎓 Awareness */}
      {activeTab === "awareness" && <Awareness />}

      {/* 🌍 Live Attacks */}
      {activeTab === "attacks" && (
        <>
          <MapComponent />
          <AttackFeed />
        </>
      )}

      {/* 📖 Story */}
      {activeTab === "story" && <StoryMode />}

      {/* 📊 Charts */}
      {activeTab === "charts" && <Charts />}
    </div>
  );
}

export default Home;