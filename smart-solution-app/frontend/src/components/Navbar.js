import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Zap, Menu, X, User, Shield, LogOut, Home, Info, Wrench, Mail
} from 'lucide-react';

const C = {
  navy: "#0a1628", navyMid: "#132044", orange: "#f07d00", orangeLight: "#ff9a2e",
  white: "#ffffff", gray: "#6b7a99", FB: "'Barlow', sans-serif", FD: "'Bebas Neue', cursive"
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mOpen, setMOpen] = useState(false);

  const links = [
    { l: "Home", p: "/", I: Home },
    { l: "About", p: "/about", I: Info },
    { l: "Services", p: "/services", I: Wrench },
    { l: "Contact", p: "/contact", I: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: C.navy, position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 4px 28px rgba(0,0,0,0.45)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 42, height: 42, background: `linear-gradient(135deg,${C.orange},${C.orangeLight})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={22} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: C.FD, fontSize: 19, color: "white", letterSpacing: 1, lineHeight: 1 }}>SMART <span style={{ color: C.orange }}>SOLUTION</span></div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5 }}>ELECTRICAL TRADING & PROJECTS</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4 }}>
          {links.map(lk => (
            <button key={lk.p} onClick={() => navigate(lk.p)} style={{
              background: isActive(lk.p) ? "rgba(240,125,0,0.15)" : "transparent",
              color: isActive(lk.p) ? C.orange : "rgba(255,255,255,0.8)",
              border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: C.FB, display: "flex", alignItems: "center", gap: 6
            }}>
              <lk.I size={14} /> {lk.l}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <button onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")} style={{
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10, color: "white"
              }}>
                <div style={{
                  width: 36, height: 36, background: user.role === "admin" ? C.orange : C.navyMid,
                  border: `2px solid ${C.orange}`, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {user.role === "admin" ? <Shield size={17} color="white" /> : <User size={17} color={C.orange} />}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: C.FB }}>{user.name?.split(" ")[0]}</div>
                  <div style={{ fontSize: 10, color: C.orange, textTransform: "uppercase", letterSpacing: 1 }}>{user.role}</div>
                </div>
              </button>
              <button onClick={logout} style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", padding: "7px 14px", borderRadius: 8, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: C.FB
              }}>
                <LogOut size={13} /> Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.22)",
                color: "white", padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: C.FB
              }}>Login</button>
              <button onClick={() => navigate('/register')} style={{
                background: C.orange, border: "none", color: "white",
                padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                fontSize: 14, fontWeight: 700, fontFamily: C.FB
              }}>Sign Up</button>
            </>
          )}
          <button onClick={() => setMOpen(!mOpen)} style={{
            background: "transparent", border: "none", color: "white",
            cursor: "pointer", padding: 4, display: "flex"
          }}>
            {mOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mOpen && (
        <div style={{ background: C.navyMid, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "8px 0" }}>
          {links.map(lk => (
            <button key={lk.p} onClick={() => { navigate(lk.p); setMOpen(false); }} style={{
              display: "block", width: "100%", background: "transparent", border: "none",
              borderLeft: isActive(lk.p) ? `3px solid ${C.orange}` : "3px solid transparent",
              color: isActive(lk.p) ? C.orange : "rgba(255,255,255,0.85)",
              padding: "12px 24px", textAlign: "left", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: C.FB
            }}>
              {lk.l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
