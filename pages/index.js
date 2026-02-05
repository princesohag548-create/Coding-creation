import { useState } from 'react';
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  // ===== SEND OTP =====
  const sendOTP = () => {

    if(!phone.startsWith("+")){
      alert("Number must include country code like +91");
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setStep("otp");
        alert("OTP Sent Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // ===== VERIFY OTP =====
  const verifyOTP = () => {

    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => {
        alert("Invalid OTP");
      });
  };

  // ===== LOGIN PAGE =====
  if (!isLogged) {
    return (
      <div style={{ padding:20, textAlign:'center' }}>

        <h1 style={{color:'purple'}}>Coding Creation</h1>
        <h3>Create your dream app</h3>

        <div id="recaptcha-container"></div>

        {step === "phone" && (
          <div>
            <input
              placeholder="Enter mobile with country code +91"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <br/><br/>
            <button onClick={sendOTP}>Send OTP</button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <br/><br/>
            <button onClick={verifyOTP}>Verify OTP</button>
          </div>
        )}

      </div>
    );
  }

  return (
    <div style={{padding:20}}>
      <h2>Welcome to Coding Creation</h2>
      <p>Login Successful!</p>
    </div>
  );
                                      }
