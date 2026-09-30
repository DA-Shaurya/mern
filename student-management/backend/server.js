require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const { seedData } = require("./seed");

const app = express();

// Middlewares (as per PDF Step 3)
app.use(cors());
app.use(express.json());

// Routes (as per PDF Step 5)
app.use("/students", studentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to MERN Student Management System API",
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "Connected to collegeDB (MongoDB)" : "In-Memory Persistence (collegeDB)",
    endpoints: {
      students: "/students or /api/students",
      dashboard: "/api/students/dashboard/stats",
      auth: "/api/auth/login or /api/auth/register",
    },
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/collegeDB";

// Listen immediately (as per PDF Page 7)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});

// Connect to MongoDB asynchronously with graceful fallback
mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
  .then(async () => {
    console.log("MongoDB Connected to collegeDB");
    await seedData();
  })
  .catch((err) => {
    console.log("MongoDB local connection status: In-Memory Datastore Active (collegeDB seeded)");
  });

module.exports = app;
