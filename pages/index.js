import { useState } from 'react';

// ===== SAFE FIREBASE LOAD =====
let auth = null;
let signInWithPhoneNumber = null;
let RecaptchaVerifier = null;

try {
  const fb = require("../../firebase");
  const fbauth = require("firebase/auth");

  auth = fb.auth;
  signInWithPhoneNumber = fbauth.signInWithPhoneNumber;
  RecaptchaVerifier = fbauth.RecaptchaVerifier;

} catch (e) {
  console.log("Firebase not connected – running demo mode");
}
// =================================

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  // ===== SEND OTP =====
  const sendOTP = () => {

    // Demo mode if firebase not ready
    if (!auth) {
      alert("Demo OTP Mode: use 1234");
      setStep("otp");
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    );

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setStep("otp");
        alert("OTP Sent to " + phone);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // ===== VERIFY OTP =====
  const verifyOTP = () => {

    // Demo mode
    if (!auth) {
      if (otp === "1234") {
        setIsLogged(true);
      } else {
        alert("Demo OTP is 1234");
      }
      return;
    }

    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => {
        alert("Invalid OTP");
      });
  };

  // ================= LOGIN PAGE =================
  if (!isLogged) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>

        <h1 style={{ color: "purple" }}>Coding Creation</h1>

        <h3>Create your dream app</h3>
        <p>Coding creation.. everything is possible here.</p>

        {/* ===== GIF SECTION ===== */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>

          <img width="30%"
            src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" />

          <img width="30%"
            src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" />

          <img width="30%"
            src="https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif" />

        </div>

        <hr />

        <h3>Login with Mobile</h3>

        <div id="recaptcha-container"></div>

        {step === "phone" && (
          <div>
            <input
              placeholder="Enter mobile with country code +91"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />

            <br /><br />

            <button onClick={sendOTP}>
              Send OTP
            </button>
          </div>
        )}

        {step === "otp" && (
          <div>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />

            <br /><br />

            <button onClick={verifyOTP}>
              Verify OTP
            </button>
          </div>
        )}

      </div>
    );
  }

  // ================= DASHBOARD =================
  const [chat, setChat] = useState("");
  const [code, setCode] = useState("// Generated code will appear here");
  const [draft, setDraft] = useState("Live preview will render here");

  const buildApp = () => {
    setCode(`// Project: ${chat}

function App(){
  return "Demo App Created";
}`);
    setDraft("Preview of: " + chat);
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Coding Creation – App Builder</h2>

      <div style={{ display: "flex", gap: 20 }}>

        <div style={{ width: "33%" }}>
          <h3>AI Builder</h3>

          <textarea
            rows="10"
            style={{ width: "100%" }}
            placeholder="Describe your app..."
            value={chat}
            onChange={e => setChat(e.target.value)}
          />

          <br /><br />

          <button onClick={buildApp}>Build App</button>
        </div>

        <div style={{ width: "33%" }}>
          <h3>Source Code</h3>

          <textarea
            rows="15"
            style={{ width: "100%" }}
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>

        <div style={{ width: "33%" }}>
          <h3>Preview</h3>

          <div style={{ border: "1px solid gray", height: 200 }}>
            {draft}
          </div>

          <br />

          <button>Export Website</button>
          <button>Download APK</button>

          {phone === "8346896508" && (
            <button>Admin Panel</button>
          )}

        </div>

      </div>

      <hr />
      <p>Support: princesohag548@gmail.com</p>

    </div>
  );
              }
