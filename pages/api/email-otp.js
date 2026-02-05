import nodemailer from "nodemailer";

export default async function handler(req, res) {

  const { email } = req.body;

  if(!email){
    return res.status(400).json({ success:false, message:"Email required" });
  }

  const OTP = Math.floor(100000 + Math.random() * 900000);

  // temporary store (demo level)
  global.emailOTP = OTP;
  global.emailUser = email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "princesohag548@gmail.com",
      pass: "hlmu vbka bvzm msdj"
    }
  });

  const mailOptions = {
    from: "Coding Creation <princesohag548@gmail.com>",
    to: email,
    subject: "Your Coding Creation OTP",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Coding Creation OTP</h2>
        <h1 style="color:purple">${OTP}</h1>

        <p>This code is valid for 5 minutes.</p>
        <p>Do not share this code with anyone.</p>
      </div>
    `
  };

  try{
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP Sent to your email"
    });

  }catch(err){
    res.status(500).json({
      success:false,
      message: "Email sending failed"
    });
  }

}
