import { useState, useEffect } from 'react';
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  // ===== একবারই Recaptcha বানাবে =====
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  }, []);

  // ===== SEND OTP =====
  const sendOTP = () => {

    if(!phone.startsWith("+")){
      alert("Use country code like +91XXXXXXXXXX");
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setStep("otp");
        alert("OTP Sent!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  // ===== VERIFY OTP =====
  const verifyOTP = () => {

    if(!window.confirmationResult){
      alert("Request OTP first");
      return;
    }

    window.confirmationResult.confirm(otp)
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

        <div id="recaptcha-container"></div>

        {step === "phone" && (
          <div>
            <input
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{padding:8, width:260}}
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
              style={{padding:8, width:260}}
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
