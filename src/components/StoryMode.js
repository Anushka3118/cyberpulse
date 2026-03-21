import React, { useEffect, useRef, useState } from "react";

const scenarios = [
  {
    title: "📧 Phishing Email Attack",
    description: "You receive an email: 'Your bank account is locked. Click here to verify.'",
    choices: [
      { text: "Click the link", result: "💀 You got hacked!" },
      { text: "Ignore the email", result: "✅ Safe choice!" },
    ],
  },
  {
    title: "🔐 Fake Login Page",
    description: "Login page looks real but URL is suspicious.",
    choices: [
      { text: "Enter credentials", result: "💀 Password stolen!" },
      { text: "Check URL", result: "✅ You detected it!" },
    ],
  },
];

function StoryMode() {
  const canvasRef = useRef(null);

  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");

  const current = scenarios[step];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let attacks = [];

    function createAttack() {
      return {
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        progress: 0,
        speed: 0.002 + Math.random() * 0.002,
      };
    }

    const interval = setInterval(() => {
      attacks.push(createAttack());
      if (attacks.length > 12) attacks.shift();
    }, 1500);

    function drawCircle(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,215,0,0.04)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 45, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,215,0,0.08)";
      ctx.stroke();
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      attacks.forEach((a) => {
        a.progress += a.speed;

        const x = a.x1 + (a.x2 - a.x1) * a.progress;
        const y = a.y1 + (a.y2 - a.y1) * a.progress;

        drawCircle(a.x1, a.y1);
        drawCircle(a.x2, a.y2);

        ctx.beginPath();
        ctx.moveTo(a.x1, a.y1);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(255,215,0,0.4)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,0,0.8)";
        ctx.fill();
      });

      attacks = attacks.filter((a) => a.progress < 1);

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="story-fullscreen">
      <canvas ref={canvasRef} className="cyber-canvas"></canvas>

      <div className="story-ui">
        <h1 className="story-title">🎭 Cyber Attack Simulation</h1>

        <div className="story-card">
          <h2>{current.title}</h2>
          <p>{current.description}</p>

          {!result && (
            <div className="story-buttons">
              {current.choices.map((choice, i) => (
                <button key={i} onClick={() => setResult(choice.result)}>
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {result && (
            <div className="story-result">
              <p>{result}</p>
              <button onClick={() => {
                setResult("");
                setStep((prev) => (prev + 1) % scenarios.length);
              }}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryMode;