import { useState } from 'react'; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

export default function CodingCreationWebsite() {

const [isLogged, setIsLogged] = useState(false); const [email, setEmail] = useState(""); const [otp, setOtp] = useState(""); const [step, setStep] = useState("email");

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

// ================= LOGIN UI ================= if (!isLogged) { return ( <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 flex flex-col items-center">

<div className="max-w-4xl w-full text-center mb-6">
      <h1 className="text-4xl font-extrabold text-purple-700">Coding Creation</h1>
      <p className="text-gray-600 mt-2">AI Powered App Builder – Everything is possible here</p>
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

// ================= DASHBOARD UI =================

const [prompt, setPrompt] = useState(""); const [code, setCode] = useState("// AI generated code will appear here"); const [preview, setPreview] = useState("Your app preview will appear here");

const buildApp = () => { setCode(// Demo Generated Code\n// Project: ${prompt}\nfunction App(){ return 'Hello App'; }); setPreview("Preview for: " + prompt); };

return ( <div className="min-h-screen bg-gray-100 p-4">

<h1 className="text-3xl font-bold mb-4 text-purple-700">Coding Creation Studio</h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* AI Builder */}
    <Card className="p-3">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">AI Builder</h2>

        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={8}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your app in any language..."
        />

        <Button onClick={buildApp}>Build App</Button>
      </CardContent>
    </Card>

    {/* Source Code */}
    <Card className="p-3">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Source Code</h2>
        <textarea
          className="w-full p-2 border rounded h-80 font-mono"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </CardContent>
    </Card>

    {/* Preview */}
    <Card className="p-3">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div className="border p-3 rounded h-80 bg-white overflow-auto">
          {preview}
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          <Button>Export Website</Button>
          <Button>Download APK</Button>
          <Button>Create API</Button>
          {email === '8346896508' && <Button>Admin Panel</Button>}
        </div>
      </CardContent>
    </Card>

  </div>

</div>

); }
