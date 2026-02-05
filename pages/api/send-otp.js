// Example with MSG91 style logic
export default async function handler(req, res) {

  const { phone } = req.body;

  // এখানে MSG91 / Twilio key বসবে
  console.log("OTP requested for:", phone);

  // DEMO OTP
  const demoOTP = "1234";

  // বাস্তবে এখানে SMS API call যাবে

  res.status(200).json({
    success: true,
    message: "OTP Sent"
  });
}
