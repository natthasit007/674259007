require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");

const { sequelize } = require("./backend/models");
const newsRoutes = require("./backend/routes/newsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "*";

app.use(
  cors({
    origin:
      CLIENT_URL === "*" ? "*" : CLIENT_URL.split(",").map((s) => s.trim()),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "News API Server is running",
    docs: "/api/news",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "News API Server is running" });
});

app.use("/api/news", newsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

if (require.main === module) {
  sequelize
    .sync()
    .then(() => {
      console.log("Database synced successfully.");
      app.listen(PORT, "0.0.0.0", () => {
        console.log(
          `Server is running on port ${PORT} at http://0.0.0.0:${PORT}`,
        );
      });
    })
    .catch((err) => {
      console.error("Failed to sync database:", err.message);
      process.exit(1);
    });
}

module.exports = app;
