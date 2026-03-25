require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "app_user",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "smart_estate",
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_HOST ? { rejectUnauthorized: true } : undefined
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB ERROR:", err);
  } else {
    console.log("✅ MySQL Connected!");
    connection.release();
  }
});

module.exports = db;
