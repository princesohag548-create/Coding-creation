// pages/api/ai.js
export default async function handler(req, res) {

  const { prompt } = req.body;

  // Temporary powerful logic (later real AI add korbo)
  let reply = "";

  // ===== BASIC BRAIN =====
  if (prompt.toLowerCase().includes("loan")) {
    reply = "I will create a complete Loan App with EMI, KYC and dashboard.";
  }
  else if (prompt.toLowerCase().includes("app")) {
    reply = "I am generating your app structure, UI and backend logic.";
  }
  else {
    reply = "I understood your instruction: " + prompt;
  }

  res.status(200).json({
    reply
  });
}
