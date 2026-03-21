// src/components/StoryMode.js
import React, { useState } from "react";

function StoryMode() {
  const [step, setStep] = useState(0);

  const storySteps = [
    "📧 You receive a phishing email…",
    "🖱 You click the link…",
    "💻 System gets compromised…",
    "⚠️ Security team notified…",
    "✅ System secured & awareness updated"
  ];

  const nextStep = () => {
    setStep((prev) => (prev + 1) % storySteps.length);
  };

  return (
    <div className="story-mode">
      <h2>🔥 Story Mode</h2>
      <p>{storySteps[step]}</p>
      <button onClick={nextStep}>Next Step ➡️</button>
    </div>
  );
}

export default StoryMode;