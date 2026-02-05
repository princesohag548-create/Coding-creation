import { useState } from 'react';

export default function CodingCreationWebsite() {

const [isLogged, setIsLogged] = useState(false); const [email, setEmail] = useState(""); const [otp, setOtp] = useState(""); const [step, setStep] = useState("email");

const [chat, setChat] = useState([]); const [userText, setUserText] = useState(""); const [loading, setLoading] = useState(false);

// ===== EMAIL OTP FUNCTIONS ===== const sendOTP = async () => { try { const res = await fetch("/api/email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });

const data = await res.json();
  alert(data.message);
  setStep("otp");

} catch (e) {
  alert("OTP send failed");
}

};

const verifyOTP = async () => { try { const res = await fetch("/api/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp }) });

const data = await res.json();

  if (data.success) {
    setIsLogged(true);
  } else {
    alert("Invalid OTP");
  }

} catch (e) {
  alert("Verification failed");
}

};

// ===== CALL AI BACKEND ===== const sendToAI = async () => { if (!userText) return;

const text = userText;
setUserText("");

setChat(old => [...old, { role: "user", text }]);
setLoading(true);

try {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: text })
  });

  const data = await res.json();

  setChat(old => [...old, {
    role: "ai",
    text: data.reply || "No response"
  }]);

} catch (e) {
  setChat(old => [...old, {
    role: "ai",
    text: "AI connection error"
  }]);
}

setLoading(false);

};

// ===== LOGIN PAGE ===== if (!isLogged) { return ( <div style={{ minHeight: "100vh", background: "linear-gradient(140deg,#e9d5ff,#c7d2fe)", padding: 20 }}>

<h1 style={{ fontSize: 40, textAlign: "center", color: "#6b21a8" }}>
      Coding Creation
    </h1>

    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <img src="/banner1.gif" width="45%" />
      <img src="/banner2.gif" width="45%" />
    </div>

    <div style={{ maxWidth: 420, margin: "auto", backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.45)", padding: 20, borderRadius: 18 }}>

      {step === "email" && (
        <>
          <input
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  </div>
);

}

// ===== DASHBOARD ===== return ( <div style={{ minHeight: "100vh", background: "linear-gradient(140deg,#e9d5ff,#c7d2fe)", padding: 16 }}>

<h2 style={{ color: "#6b21a8" }}>AI Builder Panel</h2>

  <div style={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.5)", padding: 12, borderRadius: 16, height: 420, overflow: "auto" }}>

    {chat.map((c, i) => (
      <div key={i} style={{ marginBottom: 8, textAlign: c.role === "user" ? "right" : "left" }}>
        <div style={{ display: "inline-block", padding: 8, borderRadius: 12, background: c.role === "user" ? "#7c3aed" : "#fff", color: c.role === "user" ? "#fff" : "#000" }}>
          {c.text}
        </div>
      </div>
    ))}

    {loading && <p>AI thinking...</p>}

  </div>

  <div style={{ display: "flex", marginTop: 10, gap: 8 }}>
    <input
      style={{ flex: 1, padding: 10 }}
      value={userText}
      onChange={e => setUserText(e.target.value)}
      placeholder="Tell AI what you want..."
    />
    <button onClick={sendToAI}>Send</button>
  </div>

</div>

); }
