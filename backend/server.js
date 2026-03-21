const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("CyberPulse Backend Running 🚀");
});

// routes
const scanRoute = require("./routes/scan");
const simulateRoute = require("./routes/simulate");

app.use("/scan", scanRoute);
app.use("/simulate", simulateRoute);

app.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
  });