import { useState } from 'react';

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");

  // ===== SEND OTP =====
  const sendOTP = async () => {
    try {
      const res = await fetch("/api/email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.message);
      setStep("otp");
    } catch (err) {
      alert("OTP send failed");
    }
  };

  // ===== VERIFY OTP =====
  const verifyOTP = async () => {
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (data.success) {
        setIsLogged(true);
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Verification failed");
    }
  };

  // ================= LOGIN PAGE =================
  if (!isLogged) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(140deg,#e9d5ff,#c7d2fe)",
        padding: 20,
        fontFamily: "Arial"
      }}>

        <h1 style={{
          fontSize: 42,
          textAlign: "center",
          color: "#6b21a8"
        }}>
          Coding Creation
        </h1>

        <p style={{ textAlign: "center" }}>
          Everything is possible here
        </p>

        {/* BANNER GIF */}
        <div style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 10
        }}>
          <img src="/banner1.gif" width="45%" />
          <img src="/banner2.gif" width="45%" />
        </div>

        {/* LOGIN CARD */}
        <div style={{
          maxWidth: 400,
          margin: "auto",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.4)",
          padding: 20,
          borderRadius: 16
        }}>

          <h3>Login / Signup</h3>

          {step === "email" && (
            <>
              <input
                style={{ width: "100%", padding: 8, marginBottom: 8 }}
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <button onClick={sendOTP}>
                Send OTP
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <input
                style={{ width: "100%", padding: 8, marginBottom: 8 }}
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />

              <button onClick={verifyOTP}>
                Verify OTP
              </button>
            </>
          )}

        </div>
      </div>
    );
  }

  // =============== AFTER LOGIN ===============

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to Coding Creation Studio</h2>
      <p>Dashboard will be designed next step.</p>
    </div>
  );
              }
