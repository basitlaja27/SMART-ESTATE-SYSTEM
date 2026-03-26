const db = require("../config/db");

exports.getAllPayments = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM payments");
    res.json(results);
  } catch (err) {
    console.error("Get payments error:", err);
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};

exports.getUserPayments = async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM payments WHERE user_id = ?",
      [userId]
    );
    res.json(results);
  } catch (err) {
    console.error("Get user payments error:", err);
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  const { userId, amount, description } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO payments (user_id, amount, description, status) VALUES (?, ?, ?, 'completed')",
      [userId, amount, description]
    );
    res.json({ message: "Payment successful", id: result.insertId });
  } catch (err) {
    console.error("Create payment error:", err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};

exports.getDues = async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM payments WHERE user_id = ? AND status = 'pending'",
      [userId]
    );
    let totalDues = 0;
    if (results.length > 0) {
      totalDues = results.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    }
    res.json({ amount: totalDues });
  } catch (err) {
    console.error("Get dues error:", err);
    res.status(500).json({ message: "Failed to fetch dues", error: err.message });
  }
};
