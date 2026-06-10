import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import ErrBox from '../components/ErrBox';
import { Zap, Eye, EyeOff } from 'lucide-react';

const C = {
  navy: "#0a1628", orange: "#f07d00", gray: "#6b7a99",
  offWhite: "#f0f4ff", border: "#e4eaf5",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!loginId || !pass) { setErr("Please enter your login ID and password."); return; }
    setErr(""); setLoading(true);
    const result = await login(loginId, pass);
    setLoading(false);
    if (!result.success) setErr(result.message);
  };

  return (
    <div style={{ minHeight: "90vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 58, height: 58, background: C.orange, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Zap size={30} color="white" />
          </div>
          <div style={{ fontFamily: C.FD, fontSize: 22, color: C.navy }}>SMART <span style={{ color: C.orange }}>SOLUTION</span></div>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: "44px", boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontFamily: C.FD, fontSize: 36, color: C.navy, marginBottom: 6 }}>WELCOME BACK</h2>
          <p style={{ color: C.gray, fontSize: 15, marginBottom: 32 }}>Sign in with your email, username, or phone number.</p>
          <ErrBox msg={err} />

          <Field 
            label="Email, Username, or Phone" 
            value={loginId} 
            onChange={setLoginId} 
            placeholder="quinton@email.com / quinton / +27 71 234 5678" 
            required 
          />

          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", color: C.navy, fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
              Password <span style={{ color: C.orange }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input 
                type={show ? "text" : "password"} 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
                placeholder="••••••••" 
                style={{
                  width: "100%", padding: "11px 46px 11px 14px", border: `2px solid ${C.border}`,
                  borderRadius: 8, fontSize: 15, color: C.navy, outline: "none", fontFamily: C.FB, boxSizing: "border-box"
                }} 
              />
              <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.gray, display: "flex" }}>
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button onClick={submit} disabled={loading} style={{
            background: C.orange, color: "white", border: "none", padding: "13px",
            borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: C.FB, width: "100%", marginBottom: 18, opacity: loading ? 0.7 : 1
          }}>{loading ? "Signing In..." : "Sign In"}</button>

          <div style={{ textAlign: "center", color: C.gray, fontSize: 14 }}>
            Don't have an account?{" "}
            <button onClick={() => navigate('/register')} style={{ background: "none", border: "none", color: C.orange, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
