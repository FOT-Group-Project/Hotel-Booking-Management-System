const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

const roomRoutes = require("./routes/room.route");

const roomCategoryRoutes = require("./routes/roomcategory.route");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React app origin
    credentials: true, // Allow cookies to be sent
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/room", roomRoutes);

app.use("/api/roomcategory", roomCategoryRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("server is ready!");
});

module.exports = app;
