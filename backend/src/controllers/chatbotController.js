exports.queryBot = async (req, res) => {
  const userMessage = (req.body.message || "").toLowerCase();
  let reply = "I'm not sure I understand. Can you rephrase? I can help you with payments, generating QR codes for visitors, making complaints, or finding emergency contacts.";

  if (userMessage.includes("pay") || userMessage.includes("due") || userMessage.includes("bill")) {
    reply = "To make a payment for your estate dues, please go to the 'Make Payments' section on your dashboard and click 'Proceed to Pay'.";
  } else if (userMessage.includes("qr") || userMessage.includes("visitor") || userMessage.includes("guest") || userMessage.includes("invite")) {
    reply = "You can generate a QR code for your visitors by navigating to the 'Generate QR' section on your dashboard. Enter the visitor's name and visit date to create one.";
  } else if (userMessage.includes("complaint") || userMessage.includes("issue") || userMessage.includes("problem") || userMessage.includes("report")) {
    reply = "If you have an issue, please use the 'Make Complaints' section on your dashboard to lodge a formal complaint. The estate manager will review it shortly.";
  } else if (userMessage.includes("contact") || userMessage.includes("emergency") || userMessage.includes("manager") || userMessage.includes("security")) {
    reply = "For emergencies, you can reach the Security Desk at 0801-234-5678 or the Estate Manager at 0809-876-5432. You can also check the 'Help' section for more details.";
  } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
    reply = "Hello! I am the Smart Estate Assistant. I can help you navigate the system. Ask me about payments, visitors, complaints, or contacts.";
  } else if (userMessage.includes("thank")) {
    reply = "You're welcome! Let me know if you need anything else.";
  } else if (userMessage.includes("site") || userMessage.includes("whole site") || userMessage.includes("features")) {
    reply = "The Smart Estate System allows you to manage your residency. Key features include:\n- Dashboard: View announcements and quick summaries.\n- Make Payments: Settle your estate dues.\n- Generate QR: Create access codes for your visitors.\n- Make Complaints: Report any issues to management.\n- Help: Find emergency contacts.";
  }

  res.json({ reply });
};