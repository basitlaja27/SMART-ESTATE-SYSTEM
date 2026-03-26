const db = require("../config/db");
const { v4: uuidv4 } = require('uuid');

exports.generateQRCode = async (req, res) => {
  const { residentId, visitorName, visitDate } = req.body;

  if (!residentId || !visitorName || !visitDate) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const qrCode = uuidv4();

  try {
    const [result] = await db.query(
      "INSERT INTO visitors (resident_id, visitor_name, qr_code, visit_date) VALUES (?, ?, ?, ?)",
      [residentId, visitorName, qrCode, visitDate]
    );
    res.json({ message: "QR Code generated", qrCode, id: result.insertId });
  } catch (err) {
    console.error("QR generation error:", err);
    res.status(500).json({ message: "Failed to generate QR code", error: err.message });
  }
};

exports.validateQRCode = async (req, res) => {
  const { qrCode } = req.body;

  try {
    const [results] = await db.query(
      "SELECT * FROM visitors WHERE qr_code = ?", [qrCode]
    );

    if (!results.length) {
      return res.status(404).json({ message: "Invalid QR Code" });
    }

    const visitor = results[0];

    if (visitor.status === 'checked_in') {
      return res.status(400).json({ message: "QR Code already used" });
    }

    await db.query(
      "UPDATE visitors SET status = 'checked_in' WHERE id = ?", [visitor.id]
    );

    res.json({
      valid: true,
      visitorName: visitor.visitor_name,
      message: "Access Granted"
    });
  } catch (err) {
    console.error("QR validation error:", err);
    res.status(500).json({ message: "Validation failed", error: err.message });
  }
};

exports.getVisitorHistory = async (req, res) => {
  const { residentId } = req.params;

  try {
    const [results] = await db.query(
      "SELECT * FROM visitors WHERE resident_id = ? ORDER BY visit_date DESC",
      [residentId]
    );
    res.json(results);
  } catch (err) {
    console.error("Visitor history error:", err);
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
};
