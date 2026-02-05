import { useState } from "react";

export default function Home() {

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");

  async function sendOTP() {

    const res = await fetch("/api/email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    alert(data.message);
    setStep("otp");
  }

  async function verifyOTP() {

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
  }

  if (!isLogged) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Coding Creation</h1>

        {step === "email" && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <br /><br />
            <button onClick={sendOTP}>Send OTP</button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <br /><br />
            <button onClick={verifyOTP}>Verify OTP</button>
          </>
        )}
      </div>
    );
  }

  return <h2>Welcome to Coding Creation</h2>;
}
