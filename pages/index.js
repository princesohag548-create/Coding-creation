import { useState } from 'react'; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

// ===== GLASS MORPHISM THEME - UNIQUE FONT STYLE =====

export default function CodingCreationWebsite() {

const [isLogged, setIsLogged] = useState(false); const [email, setEmail] = useState(""); const [otp, setOtp] = useState(""); const [step, setStep] = useState("email");

const sendOTP = async () => { const res = await fetch("/api/email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });

const data = await res.json();
alert(data.message);
setStep("otp");

};

const verifyOTP = async () => { const res = await fetch("/api/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp }) });

const data = await res.json();
if (data.success) setIsLogged(true);
else alert("Invalid OTP");

};

// ===== LOGIN PAGE DESIGN ===== if (!isLogged) { return ( <div className="min-h-screen flex flex-col items-center p-4" style={{ background: 'linear-gradient(140deg,#e9d5ff,#c7d2fe)', fontFamily: 'Poppins, Arial' }}>

{/* BIG BRAND TITLE */}
    <div className="mt-4 mb-3 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide"
        style={{
          background: 'linear-gradient(to right,#7c3aed,#2563eb)',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
        Coding Creation
      </h1>
      <p className="text-gray-700 mt-1">Everything is possible here</p>
    </div>

    {/* BANNER + GIF SECTION */}
    <div className="w-full max-w-3xl grid grid-cols-2 gap-3 mb-4">
      <img src="/banner1.gif" className="rounded-xl border shadow" />
      <img src="/banner2.gif" className="rounded-xl border shadow" />
    </div>

    {/* GLASS CARD LOGIN */}
    <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg w-full max-w-md">

      <h2 className="text-xl font-semibold text-center mb-3">Login / Sign Up</h2>

      {step === 'email' && (
        <>
          <input
            className="w-full p-3 rounded-lg mb-3 bg-white/70 border"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button className="w-full" onClick={sendOTP}>Send OTP</Button>
        </>
      )}

      {step === 'otp' && (
        <>
          <input
            className="w-full p-3 rounded-lg mb-3 bg-white/70 border"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <Button className="w-full" onClick={verifyOTP}>Verify OTP</Button>
        </>
      )}

    </div>
  </div>
);

}

// ===== DASHBOARD (AFTER LOGIN) =====

const [prompt, setPrompt] = useState(""); const [code, setCode] = useState("// AI generated code will appear here"); const [preview, setPreview] = useState("Your app preview will appear here");

const buildApp = () => { setCode(// Generated for: ${prompt} function App(){ return 'Hello'; }); setPreview("Preview for: " + prompt); };

return ( <div className="min-h-screen p-4" style={{ background: 'linear-gradient(140deg,#e9d5ff,#c7d2fe)' }}>

<h1 className="text-4xl font-extrabold mb-4 text-purple-800">Coding Creation Studio</h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <Card className="p-3 backdrop-blur-md bg-white/60">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">AI Builder</h2>
        <textarea
          className="w-full p-2 border rounded mb-2 bg-white/70"
          rows={8}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your app..."
        />
        <Button onClick={buildApp}>Build App</Button>
      </CardContent>
    </Card>

    <Card className="p-3 backdrop-blur-md bg-white/60">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Source Code</h2>
        <textarea
          className="w-full p-2 border rounded h-80 font-mono bg-white/70"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </CardContent>
    </Card>

    <Card className="p-3 backdrop-blur-md bg-white/60">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className="border p-3 rounded h-80 bg-white/80 overflow-auto">
          {preview}
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <Button>Export Website</Button>
          <Button>Download APK</Button>
          <Button>Create API</Button>
        </div>
      </CardContent>
    </Card>

  </div>
</div>

); }
