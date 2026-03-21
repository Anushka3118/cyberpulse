import React, { useState } from "react";

const topics = [
  {
    title: "Phishing Attack",
    content: "Fake emails or websites trick users into revealing sensitive info.",
    symptoms: [
      "Unexpected emails asking for login",
      "Suspicious links",
      "Urgent messages like 'verify now'"
    ],
    prevention: [
      "Never click unknown links",
      "Check sender email carefully",
      "Enable 2-factor authentication"
    ]
  },
  {
    title: "Malware",
    content: "Malicious software that damages systems or steals data.",
    symptoms: [
      "Slow system performance",
      "Unknown apps installed",
      "Frequent crashes"
    ],
    prevention: [
      "Install antivirus",
      "Avoid downloading from unknown sites",
      "Keep software updated"
    ]
  },
  {
    title: "DDoS Attack",
    content: "Flooding a server with traffic to make it unavailable.",
    symptoms: [
      "Website suddenly goes down",
      "Extremely slow loading",
      "High traffic spikes"
    ],
    prevention: [
      "Use firewalls",
      "Enable rate limiting",
      "Use DDoS protection services"
    ]
  },
  {
    title: "SQL Injection",
    content: "Attackers insert malicious SQL to access databases.",
    symptoms: [
      "Strange database errors",
      "Unauthorized data access",
      "Website behaving oddly"
    ],
    prevention: [
      "Use prepared statements",
      "Validate user input",
      "Use secure backend practices"
    ]
  },
  {
    title: "Ransomware",
    content: "Encrypts your data and demands payment.",
    symptoms: [
      "Files suddenly locked",
      "Ransom message appears",
      "Cannot access system"
    ],
    prevention: [
      "Backup data regularly",
      "Avoid suspicious downloads",
      "Use strong security tools"
    ]
  }
];

function Awareness() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="awareness-module">
      <h2>🧠 Cyber Awareness Training</h2>

      {topics.map((item, index) => (
        <div key={index} className="card" onClick={() => toggle(index)}>
          <h3>{item.title}</h3>

          {activeIndex === index && (
            <div style={{ marginTop: "10px", color: "#ddd" }}>
              <p><b>⚠️ What is it:</b> {item.content}</p>

              <p><b>🚨 Symptoms:</b></p>
              <ul>
                {item.symptoms.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>

              <p><b>🛡️ Prevention:</b></p>
              <ul>
                {item.prevention.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Awareness;
