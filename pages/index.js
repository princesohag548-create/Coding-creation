import { useState } from 'react'; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

export default function CodingCreationWebsite() {

const [isLogged, setIsLogged] = useState(false); const [email, setEmail] = useState(""); const [otp, setOtp] = useState(""); const [step, setStep] = useState("email");

const [chat, setChat] = useState([]); const [userText, setUserText] = useState(""); const [loading, setLoading] = useState(false);

// ===== EMAIL OTP FUNCTIONS ===== const sendOTP = async () => { const res = await fetch("/api/email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });

const data = await res.json();
alert(data.message);
setStep("otp");

};

const verifyOTP = async () => { const res = await fetch("/api/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp }) });

const data = await res.json();

if (data.success) {
  setIsLogged(true);
} else {
  alert("Invalid OTP");
}

};

// ===== REAL GPT‑4 AI CALL ===== const sendToAI = async () => { if (!userText) return;

setChat(old => [...old, { role: "user", text: userText }]);
setLoading(true);

try {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userText })
  });

  const data = await res.json();

  setChat(old => [...old, {
    role: "ai",
    text: data.reply
  }]);

} catch (err) {
  setChat(old => [...old, {
    role: "ai",
    text: "AI service error: " + err.message
  }]);
}

setUserText("");
setLoading(false);

};

// ================= LOGIN UI ================= if (!isLogged) { return ( <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 flex flex-col items-center">

<div className="max-w-4xl w-full text-center mb-6">
      <h1 className="text-5xl font-extrabold text-purple-700 tracking-wide">Coding Creation</h1>
      <p className="text-gray-600 mt-2">AI Powered App Builder – Everything is possible here</p>
    </div>

    <Card className="w-full max-w-md shadow-xl backdrop-blur bg-white/70">
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

// ================= DASHBOARD UI ================= return ( <div className="min-h-screen bg-purple-100 p-4">

<h1 className="text-3xl font-bold mb-4 text-purple-700">AI Builder Panel</h1>

  <Card className="p-4 bg-white/70 backdrop-blur">
    <CardContent>

      <div className="h-[500px] overflow-auto mb-3 p-3 bg-purple-50 rounded">
        {chat.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-purple-600 text-white' : 'bg-white'}`}>
              {m.text}
            </span>
          </div>
        ))}

        {loading && <p className="text-sm">AI thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={userText}
          onChange={e => setUserText(e.target.value)}
          placeholder="Tell AI what you want to build..."
        />

        <Button onClick={sendToAI}>Send</Button>
      </div>

    </CardContent>
  </Card>

</div>

); }
