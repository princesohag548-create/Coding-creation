import { useState } from 'react';

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");

  const sendOTP = async () => {

    const res = await fetch("/api/email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    alert(data.message);
    setStep("otp");
  };

  const verifyOTP = async () => {

    const res = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if(data.success){
      setIsLogged(true);
    } else {
      alert("Invalid OTP");
    }
  };

  if (!isLogged) {
    return (
      <div style={{ padding:20, textAlign:'center' }}>

        <h1>Coding Creation</h1>

        {step === "email" && (
          <div>
            <input
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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

  return <h2>Welcome to Coding Creation</h2>;
                  }
