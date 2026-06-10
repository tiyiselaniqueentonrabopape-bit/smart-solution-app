import { useNavigate } from 'react-router-dom';
import { Zap, Phone, Mail } from 'lucide-react';

const C = {
  navy: "#0a1628", orange: "#f07d00", gray: "#6b7a99", FB: "'Barlow', sans-serif", FD: "'Bebas Neue', cursive"
};

const SERVICES = [
  "House Wiring", "Fault Finding", "Motor Connections", "Panel Design & Wiring",
  "PLC Wiring", "Maintenance", "Electronics", "Solar & Inverter"
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "#060e1e", padding: "60px 24px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 44, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, background: C.orange, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={20} color="white" />
              </div>
              <div style={{ fontFamily: C.FD, fontSize: 17, color: "white" }}>SMART <span style={{ color: C.orange }}>SOLUTION</span></div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.8, marginBottom: 18 }}>
              Your Vision, Our Electrical Expertise. Professional electrical services across South Africa.
            </p>
            {[
              { I: Phone, v: "+27 79 333 4957", h: "tel:+27793334957" },
              { I: Phone, v: "+27 78 100 1947", h: "tel:+27781001947" },
              { I: Mail, v: "pennytumelo@gmail.com", h: "mailto:pennytumelo@gmail.com" }
            ].map((c, i) => (
              <a key={i} href={c.h} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none", marginBottom: 8 }}>
                <c.I size={13} color={C.orange} />{c.v}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Quick Links</h4>
            {[["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Contact", "/contact"], ["Login", "/login"], ["Register", "/register"]].map(([l, p]) => (
              <button key={p} onClick={() => navigate(p)} style={{
                display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                fontSize: 13, cursor: "pointer", marginBottom: 9, padding: 0, textAlign: "left", fontFamily: C.FB
              }}>› {l}</button>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Our Services</h4>
            {SERVICES.map((s, i) => (
              <button key={i} onClick={() => navigate('/services')} style={{
                display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                fontSize: 13, cursor: "pointer", marginBottom: 8, padding: 0, textAlign: "left", fontFamily: C.FB
              }}>› {s}</button>
            ))}
          </div>

          {/* Working Hours */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>Working Hours</h4>
            {[["Mon – Fri", "07:00 – 18:00"], ["Saturday", "08:00 – 15:00"], ["Sunday", "Emergency Only"], ["Emergency Line", "+27 79 333 4957"]].map(([d, h], i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 2 }}>{d}</div>
                <div style={{ color: i === 3 ? C.orange : "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>{h}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 12 }}>© 2026 Smart Solution Electrical Trading & Projects (PTY LTD). All rights reserved.</span>
          <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 12 }}>Founder: Tumelo Penny Rabopape</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
