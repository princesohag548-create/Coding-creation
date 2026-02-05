export default function handler(req, res) {

  const { phone, otp } = req.body;

  // DEMO CHECK
  if(otp === "1234"){
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }

}
