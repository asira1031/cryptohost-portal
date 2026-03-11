const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8085;

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "gateway",
    port: PORT,
    ts: new Date().toISOString()
  });
});

app.get("/status", (req, res) => {
  res.json({
    ok: true,
    status: "online",
    ts: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Gateway is LIVE on http://127.0.0.1:${PORT}`);
});

// Keep process alive explicitly
setInterval(() => {}, 1000);