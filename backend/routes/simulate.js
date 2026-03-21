const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { input } = req.body;

  let response = {};

  if (input.includes("http") || input.includes("login")) {
    response = {
      type: "Phishing Attack",
      steps: [
        "User clicks suspicious link ⚠️",
        "Fake login page opens",
        "User enters credentials",
        "Attacker captures data 🔴",
        "Account gets compromised 💀"
      ],
      prevention: [
        "Check URL carefully",
        "Avoid unknown links",
        "Enable 2FA"
      ]
    };
  } 
  else if (input.includes("attachment") || input.includes("file")) {
    response = {
      type: "Malware Attack",
      steps: [
        "User downloads file",
        "Malicious code executes 🦠",
        "System gets infected",
        "Data is stolen",
        "System control lost 💀"
      ],
      prevention: [
        "Don’t download unknown files",
        "Use antivirus",
        "Verify sender"
      ]
    };
  } 
  else {
    response = {
      type: "Safe / No Major Threat",
      steps: [
        "Input analyzed",
        "No suspicious pattern found",
        "System remains safe ✅"
      ],
      prevention: [
        "Keep software updated",
        "Use strong passwords"
      ]
    };
  }

  res.json(response);
});

module.exports = router;