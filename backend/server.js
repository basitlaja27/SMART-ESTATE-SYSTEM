<<<<<<< HEAD
require('dotenv').config(); // Load environment variables

const app = require("./src/app");

// Test route 
app.get("/test", (req, res) => {
  res.json({ message: "Backend is running and connected!" });
});

// Use Render's port or fallback to 5000 locally
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});