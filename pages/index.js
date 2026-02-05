import { useState } from 'react';

export default function CodingCreationWebsite() {

  const [isLogged, setIsLogged] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const sendOTP = () => {
    alert("OTP system will be connected soon");
    setStep("otp");
  };

  const verifyOTP = () => {
    setIsLogged(true);
  };

  // ======= FRONT LANDING PAGE =======
  if (!isLogged) {
    return (
      <div style={{padding:20, fontFamily:'Arial', textAlign:'center'}}>

        <h1 style={{color:'#6a0dad'}}>Coding Creation</h1>

        <h2>Create your dream app</h2>

        <p style={{color:'gray'}}>
          Coding creation.. everything is possible here.
        </p>

        {/* ===== AI GIF SECTION ===== */}
        <div style={{display:'flex', gap:10, justifyContent:'center'}}>

          <img width="30%"
          src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"/>

          <img width="30%"
          src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif"/>

          <img width="30%"
          src="https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif"/>

        </div>

        <hr/>

        <h3>Login with Mobile</h3>

        <p style={{color:'red'}}>
          Real SMS OTP coming in next update
        </p>

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

  // ======= DASHBOARD =======

  const [chat, setChat] = useState("");
  const [code, setCode] = useState("// Generated code will appear here");
  const [draft, setDraft] = useState("Live preview will render here");

  const buildApp = () => {
    setCode(`// Project: ${chat}

function App(){
  return "Demo app created";
}`);
    setDraft("Preview of: " + chat);
  };

  return (
    <div style={{padding:20}}>

      <h2>Coding Creation – App Builder</h2>

      <div style={{display:'flex', gap:20}}>

        <div style={{width:'33%'}}>
          <h3>AI Builder</h3>

          <textarea
            rows="10"
            style={{width:'100%'}}
            placeholder="Describe your app..."
            value={chat}
            onChange={e => setChat(e.target.value)}
          />

          <br/><br/>
          <button onClick={buildApp}>Build App</button>
        </div>

        <div style={{width:'33%'}}>
          <h3>Source Code</h3>

          <textarea
            rows="15"
            style={{width:'100%'}}
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>

        <div style={{width:'33%'}}>
          <h3>Preview</h3>

          <div style={{border:'1px solid gray', height:200}}>
            {draft}
          </div>

          <br/>

          <button>Export Website</button>
          <button>Download APK</button>

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
