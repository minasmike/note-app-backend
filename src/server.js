const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sessionModel = require("./models/sessionModel");

app.use(express.json()); // Enable JSON parsing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan("combined"));

app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});