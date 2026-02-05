import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");

  // ===== FIXED: async function =====
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

  // ===== FIXED: async function =====
  const verifyOTP = async () => {

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
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 flex flex-col items-center">

        <div className="max-w-4xl w-full text-center mb-6">
          <h1 className="text-4xl font-extrabold text-purple-700">Coding Creation</h1>
          <p className="text-gray-600 mt-2">AI Powered App Builder</p>
        </div>

        <Card className="w-full max-w-md shadow-xl">
          <CardContent>
            <h2 className="text-xl font-bold mb-3 text-center">Login / Register</h2>

            {step === "email" && (
              <>
                <input
                  className="w-full p-2 border rounded mb-3"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Button className="w-full" onClick={sendOTP}>Send OTP</Button>
              </>
            )}

            {step === "otp" && (
              <>
                <input
                  className="w-full p-2 border rounded mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                <Button className="w-full" onClick={verifyOTP}>Verify OTP</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2>Welcome to Coding Creation</h2>
    </div>
  );
                    }
