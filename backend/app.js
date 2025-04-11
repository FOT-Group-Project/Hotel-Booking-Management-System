const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const roomRoutes = require("./routes/room.route");
const roomCategoryRoutes = require("./routes/roomcategory.route");
const bookedRoutes = require("./routes/booked.route");
const detailsRoutes = require("./routes/details.route");
const customerRoutes = require("./routes/customer.route");
const bookingRoutes = require("./routes/booking.route");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://hotel-frontend:5173", // Docker container name for frontend
    credentials: true, // Allow cookies to be sent
  })
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads/room_category"))
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/roomcategory", roomCategoryRoutes);
app.use("/api/booked", bookedRoutes);
app.use("/api/details", detailsRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/booking", bookingRoutes);

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
