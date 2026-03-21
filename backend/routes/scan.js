const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { text } = req.body;

  let score = 0;
  let reasons = [];

  const input = text.toLowerCase();

  // 🔴 1. Suspicious Keywords
  const keywords = ["login", "verify", "update", "urgent", "bank", "password"];
  keywords.forEach((word) => {
    if (input.includes(word)) {
      score += 10;
      reasons.push(`Suspicious keyword: ${word}`);
    }
  });

  // 🔴 2. HTTP (not HTTPS)
  if (input.includes("http://")) {
    score += 20;
    reasons.push("Not secure (HTTP)");
  }

  // 🔴 3. Suspicious Domains
  const domains = [".xyz", ".ru", ".tk", ".ml"];
  domains.forEach((d) => {
    if (input.includes(d)) {
      score += 20;
      reasons.push("Suspicious domain detected");
    }
  });

  // 🔴 4. Too many numbers
  if ((input.match(/\d/g) || []).length > 5) {
    score += 10;
    reasons.push("Too many numbers in URL");
  }

  // 🔴 5. Long URL
  if (input.length > 80) {
    score += 10;
    reasons.push("Unusually long URL");
  }

  // 🔴 6. Fake-looking domains
  if (input.includes("secure") && input.includes("login")) {
    score += 15;
    reasons.push("Fake secure login pattern");
  }

  // 🔴 FINAL STATUS
  let status = "Safe ✅";

  if (score > 60) status = "🚨 High Risk (Phishing)";
  else if (score > 30) status = "⚠️ Suspicious";
  else status = "✅ Likely Safe";

  res.json({
    score,
    status,
    reasons,
  });
});

module.exports = router;