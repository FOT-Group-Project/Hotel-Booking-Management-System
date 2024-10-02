const express = require("express");
const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// About route
app.get("/about", (req, res) => {
  res.send("About page");
});

// A route for displaying a simple JSON response
app.get("/api", (req, res) => {
  res.json({ message: "This is a simple API endpoint", data: [1, 2, 3, 4, 5] });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
