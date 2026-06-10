import { useNavigate } from 'react-router-dom';
import {
  Zap, Home, Wrench, Search, Cpu, Settings, Activity, Sun,
  Check, ArrowRight, Phone
} from 'lucide-react';

const C = {
  navy: "#0a1628", navyLight: "#1a2d58", orange: "#f07d00", orangeLight: "#ff9a2e",
  gray: "#6b7a99", cardBg: "#f8faff", border: "#e4eaf5",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const SERVICES = [
  { id: 1, Icon: Home, title: "House Wiring", desc: "Complete residential wiring for new builds and renovations — safe, code-compliant, and backed by our workmanship guarantee.", benefits: ["New builds & renovations", "Safe & code-compliant", "Certified electricians", "Workmanship warranty"] },
  { id: 2, Icon: Search, title: "Fault Finding", desc: "Expert fault diagnosis using advanced equipment to pinpoint and resolve electrical issues quickly and efficiently.", benefits: ["Advanced diagnostic tools", "Fast turnaround", "Root cause analysis", "Preventive advice"] },
  { id: 3, Icon: Cpu, title: "Motor Connections", desc: "Professional motor connection services for industrial and commercial environments, all phase configurations handled.", benefits: ["Single & three-phase", "Industrial grade", "Efficiency optimized", "Full load testing"] },
  { id: 4, Icon: Settings, title: "Panel Design & Wiring", desc: "Custom electrical panel design and installation tailored to residential, commercial, and industrial requirements.", benefits: ["Custom design", "Load balancing", "Safety breakers", "As-built documentation"] },
  { id: 5, Icon: Activity, title: "PLC Wiring", desc: "Specialized PLC wiring and configuration for industrial automation systems and manufacturing environments.", benefits: ["Industrial automation", "Custom PLC config", "System integration", "Technical support"] },
  { id: 6, Icon: Wrench, title: "Maintenance", desc: "Comprehensive maintenance programmes to keep your electrical systems at peak performance and prevent costly failures.", benefits: ["Scheduled maintenance", "Emergency response", "System upgrades", "Compliance checks"] },
  { id: 7, Icon: Zap, title: "Electronics", desc: "Professional installation and servicing of home electronics — geysers, stoves, and all domestic appliances.", benefits: ["Geyser installation", "Stove wiring", "Appliance repair", "Safety checks"] },
  { id: 8, Icon: Sun, title: "Solar & Inverter", desc: "Complete solar energy solutions — panels, inverter configuration, and battery storage for homes and businesses.", benefits: ["Solar panels", "Inverter setup", "Battery storage", "Grid tie-in"] },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, padding: "100px 24px 72px", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Services</div>
          <h1 style={{ fontFamily: C.FD, fontSize: 72, color: "white", marginBottom: 18 }}>WHAT WE OFFER</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>Eight core electrical service categories, each delivered with precision, safety, and professionalism.</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" style={{ width: "100%", display: "block" }} preserveAspectRatio="none"><path d="M0 0 Q720 40 1440 0 L1440 40 L0 40 Z" fill="white" /></svg>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 26 }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
              <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, padding: "30px 28px", display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 54, height: 54, background: C.orange, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.Icon size={27} color="white" />
                </div>
                <div>
                  <div style={{ color: "rgba(240,125,0,0.7)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Service 0{s.id}</div>
                  <h3 style={{ fontFamily: C.FD, fontSize: 24, color: "white" }}>{s.title.toUpperCase()}</h3>
                </div>
              </div>
              <div style={{ padding: "26px 28px" }}>
                <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.78, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                  {s.benefits.map((b, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 20, height: 20, background: "rgba(240,125,0,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={11} color={C.orange} /></div>
                      <span style={{ color: C.navy, fontWeight: 600, fontSize: 13 }}>{b}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('/contact')} style={{ background: C.orange, color: "white", border: "none", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Request Service <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: `linear-gradient(135deg,${C.orange},${C.orangeLight})` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: C.FD, fontSize: 52, color: "white", marginBottom: 14 }}>NEED A CUSTOM SOLUTION?</h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 17, marginBottom: 32 }}>Contact us for a tailored electrical solution designed around your specific requirements.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate('/contact')} style={{ background: "white", color: C.orange, border: "none", padding: "13px 34px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: C.FB }}>Get a Free Quote</button>
            <a href="tel:+27793334957" style={{ background: "transparent", color: "white", border: "2px solid white", padding: "13px 34px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}><Phone size={15} /> +27 79 333 4957</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
