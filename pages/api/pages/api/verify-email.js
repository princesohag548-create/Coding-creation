export default function handler(req, res) {

  const { email, otp } = req.body;

  if(email === global.emailUser && otp == global.emailOTP){
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }

}
