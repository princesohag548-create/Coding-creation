export default function handler(req, res) {

  const { email } = req.body;

  const OTP = Math.floor(100000 + Math.random() * 900000);

  // Demo storage
  global.emailOTP = OTP;
  global.emailUser = email;

  console.log("OTP for", email, "is", OTP);

  // এখানে পরে real email service লাগাব

  res.status(200).json({
    success: true,
    message: "OTP Sent to Email (check console for demo)"
  });
}
