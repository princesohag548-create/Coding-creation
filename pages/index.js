import { useState } from 'react';

export default function CodingCreationWebsite() {

  // ================= AUTH PART =================
  const [isLogged, setIsLogged] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const sendOTP = () => {
    // real SMS gateway ekhane connect hobe
    setStep("otp");
  };

  const verifyOTP = () => {
    setIsLogged(true);
  };

  // =============== LOGIN PAGE ==================
  if (!isLogged) {
    return (
      <div style={{padding:20, fontFamily:'Arial'}}>
        
        <h1 style={{color:'purple'}}>Coding Creation</h1>

        <h3>Create your dream app</h3>
        <p>Coding creation.. everything is possible here.</p>

        {/* ======= AI GIF BANNER ======= */}
        <div style={{display:'flex', gap:10}}>
          <img src="/ai1.gif" width="30%" />
          <img src="/ai2.gif" width="30%" />
          <img src="/ai3.gif" width="30%" />
        </div>

        <hr/>

        <h3>Login with Mobile</h3>

        {step === "phone" && (
          <div>
            <input
              placeholder="Enter mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
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
            <button onClick={verifyOTP}>Verify & Enter</button>
          </div>
        )}

      </div>
    );
  }

  // =============== DASHBOARD PART ===============

  const [chat, setChat] = useState("");
  const [code, setCode] = useState("// Generated code will appear here");
  const [draft, setDraft] = useState("Live preview will render here");

  const buildApp = () => {
    setCode(`// Project: ${chat}

function App(){
  return "This is demo generated app";
}`);
    setDraft("Preview of: " + chat);
  };

  return (
    <div style={{padding:20}}>

      <h2>Coding Creation – App Builder Website</h2>

      {/* ======== AI BUILDER ======== */}
      <div style={{display:'flex', gap:20}}>

        <div style={{width:'33%'}}>
          <h3>AI Builder</h3>

          <textarea
            rows="10"
            style={{width:'100%'}}
            placeholder="Describe your app in any language..."
            value={chat}
            onChange={e => setChat(e.target.value)}
          />

          <br/><br/>
          <button onClick={buildApp}>Build App</button>
        </div>

        {/* ======== CODE EDITOR ======== */}
        <div style={{width:'33%'}}>
          <h3>Source Code</h3>

          <textarea
            rows="15"
            style={{width:'100%'}}
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>

        {/* ======== PREVIEW ======== */}
        <div style={{width:'33%'}}>
          <h3>Preview</h3>

          <div style={{border:'1px solid gray', height:200}}>
            {draft}
          </div>

          <br/>

          <button>Export Website</button>
          <button>Download APK</button>
          <button>Create API</button>

          {/* ===== ADMIN ONLY ===== */}
          {phone === "8346896508" && (
            <button>Admin Panel</button>
          )}

        </div>

      </div>

      <hr/>
      <p>Support: princesohag548@gmail.com</p>

    </div>
  );
}
