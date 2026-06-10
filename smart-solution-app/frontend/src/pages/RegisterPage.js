import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import ErrBox from '../components/ErrBox';
import { Zap, ArrowLeft, Mail, CheckCircle, Eye, EyeOff } from 'lucide-react';

const C = {
  navy: "#0a1628", orange: "#f07d00", gray: "#6b7a99",
  offWhite: "#f0f4ff", border: "#e4eaf5",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const RegisterPage = () => {
  const { register, verifyEmail, resendOTP, pendingEmail } = useAuth();
  const navigate = useNavigate();

  // Step 1: Registration form
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 2: OTP
  const [otp, setOtp] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = async () => {
    // Validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErr("Please fill in all required fields."); return;
    }
    if (form.password !== form.confirmPassword) {
      setErr("Passwords do not match."); return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters."); return;
    }

    setErr(""); setLoading(true);
    const result = await register(form);
    setLoading(false);

    if (result.success) {
      setStep(2);
      startResendTimer();
    } else {
      setErr(result.message);
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) { setErr("Please enter the 6-digit code."); return; }
    setErr(""); setLoading(true);
    const result = await verifyEmail(otp);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErr(result.message);
    }
  };

  const handleResend = async () => {
    setErr(""); setLoading(true);
    const result = await resendOTP();
    setLoading(false);
    if (result.success) {
      startResendTimer();
    } else {
      setErr(result.message);
    }
  };

  return (
    <div style={{ minHeight: "90vh", background: C.offWhite, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 58, height: 58, background: C.orange, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Zap size={30} color="white" />
          </div>
          <div style={{ fontFamily: C.FD, fontSize: 22, color: C.navy }}>SMART <span style={{ color: C.orange }}>SOLUTION</span></div>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: "44px", boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>

          {/* Progress */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28, justifyContent: "center" }}>
            {[1, 2].map(s => (
              <div key={s} style={{ width: 40, height: 6, borderRadius: 3, background: s <= step ? C.orange : C.border }} />
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 style={{ fontFamily: C.FD, fontSize: 36, color: C.navy, marginBottom: 6 }}>CREATE ACCOUNT</h2>
              <p style={{ color: C.gray, fontSize: 15, marginBottom: 28 }}>Fill in your details to get started.</p>
              <ErrBox msg={err} />

              <Field label="Full Name" value={form.name} onChange={f("name")} placeholder="Your full name" required />
              <Field label="Username" value={form.username} onChange={f("username")} placeholder="Choose a username" />
              <Field label="Email Address" type="email" value={form.email} onChange={f("email")} placeholder="your@email.com" required />
              <Field label="Phone Number" value={form.phone} onChange={f("phone")} placeholder="+27 71 234 5678" />

              {/* Password */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", color: C.navy, fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
                  Password <span style={{ color: C.orange }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} value={form.password} onChange={e => f("password")(e.target.value)} placeholder="Min. 6 characters" style={{
                    width: "100%", padding: "11px 46px 11px 14px", border: `2px solid ${C.border}`,
                    borderRadius: 8, fontSize: 15, color: C.navy, outline: "none", fontFamily: C.FB, boxSizing: "border-box"
                  }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.gray, display: "flex" }}>
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", color: C.navy, fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
                  Confirm Password <span style={{ color: C.orange }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => f("confirmPassword")(e.target.value)} placeholder="Repeat password" style={{
                    width: "100%", padding: "11px 46px 11px 14px", border: `2px solid ${C.border}`,
                    borderRadius: 8, fontSize: 15, color: C.navy, outline: "none", fontFamily: C.FB, boxSizing: "border-box"
                  }} />
                  <button onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.gray, display: "flex" }}>
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button onClick={handleRegister} disabled={loading} style={{
                background: C.orange, color: "white", border: "none", padding: "13px",
                borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: C.FB, width: "100%", marginBottom: 18, opacity: loading ? 0.7 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}>
                <Mail size={16} /> {loading ? "Sending Code..." : "Create Account & Verify Email"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ width: 60, height: 60, background: "rgba(240,125,0,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Mail size={28} color={C.orange} />
                </div>
                <h2 style={{ fontFamily: C.FD, fontSize: 36, color: C.navy, marginBottom: 6 }}>VERIFY EMAIL</h2>
                <p style={{ color: C.gray, fontSize: 15 }}>
                  We sent a 6-digit code to <strong>{pendingEmail}</strong>
                </p>
              </div>
              <ErrBox msg={err} />

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", color: C.navy, fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
                  Verification Code <span style={{ color: C.orange }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                  placeholder="000000"
                  maxLength={6}
                  style={{
                    width: "100%", padding: "14px", border: `2px solid ${C.border}`,
                    borderRadius: 10, fontSize: 24, letterSpacing: 12, textAlign: "center",
                    color: C.navy, outline: "none", fontFamily: C.FB, fontWeight: 700
                  }} 
                />
              </div>

              <button onClick={handleVerify} disabled={loading} style={{
                background: C.orange, color: "white", border: "none", padding: "13px",
                borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                fontFamily: C.FB, width: "100%", marginBottom: 18, opacity: loading ? 0.7 : 1
              }}>{loading ? "Verifying..." : "Verify & Complete Registration"}</button>

              <div style={{ textAlign: "center", marginBottom: 16 }}>
                {resendTimer > 0 ? (
                  <span style={{ color: C.gray, fontSize: 13 }}>Resend code in {resendTimer}s</span>
                ) : (
                  <button onClick={handleResend} disabled={loading} style={{ background: "none", border: "none", color: C.orange, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>
                    Resend Code
                  </button>
                )}
              </div>

              <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: C.gray, fontSize: 13, cursor: "pointer", fontFamily: C.FB, display: "flex", alignItems: "center", gap: 6, margin: "0 auto" }}>
                <ArrowLeft size={14} /> Back to registration
              </button>
            </>
          )}

          <div style={{ textAlign: "center", color: C.gray, fontSize: 14, marginTop: 18, borderTop: `1px solid ${C.border}`, paddingTop: 18 }}>
            Already have an account?{" "}<button onClick={() => navigate('/login')} style={{ background: "none", border: "none", color: C.orange, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
