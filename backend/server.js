require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIXED CORS (no crash)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("CyberPulse Backend Running 🚀");
});

// routes
const scanRoute = require("./routes/scan");
const simulateRoute = require("./routes/simulate");

app.use("/scan", scanRoute);
app.use("/simulate", simulateRoute);

// ✅ PORT
app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});