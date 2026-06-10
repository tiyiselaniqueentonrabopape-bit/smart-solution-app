import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import {
  Zap, Home, Wrench, Search, Cpu, Settings, Activity, Sun,
  Award, Clock, CheckCircle, Shield, Star, ArrowRight, Phone, Mail, ChevronRight
} from 'lucide-react';

const C = {
  navy: "#0a1628", navyMid: "#132044", navyLight: "#1a2d58",
  orange: "#f07d00", orangeLight: "#ff9a2e",
  white: "#ffffff", offWhite: "#f0f4ff",
  cardBg: "#f8faff", border: "#e4eaf5",
  gray: "#6b7a99", grayLight: "#94a3b8",
  success: "#059669", FB: "'Barlow', sans-serif", FD: "'Bebas Neue', cursive"
};

const SERVICES = [
  { id: 1, Icon: Home, title: "House Wiring", short: "Residential electrical installations" },
  { id: 2, Icon: Search, title: "Fault Finding", short: "Diagnosis & troubleshooting" },
  { id: 3, Icon: Cpu, title: "Motor Connections", short: "Single & three-phase motor wiring" },
  { id: 4, Icon: Settings, title: "Panel Design & Wiring", short: "Electrical panel engineering" },
  { id: 5, Icon: Activity, title: "PLC Wiring", short: "PLC installations" },
  { id: 6, Icon: Wrench, title: "Maintenance", short: "Routine service & repairs" },
  { id: 7, Icon: Zap, title: "Electronics", short: "Geysers, stoves & appliances" },
  { id: 8, Icon: Sun, title: "Solar & Inverter", short: "Solar power & battery installations" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const feats = [
    { I: Award, t: "Certified Professionals", d: "All electricians hold valid South African certification, fully compliant with national standards." },
    { I: Clock, t: "24/7 Emergency Service", d: "Electrical emergencies happen anytime. Our team is on standby around the clock." },
    { I: CheckCircle, t: "Quality Guaranteed", d: "Every job comes with our workmanship guarantee ,we won't leave until you're satisfied." },
    { I: Shield, t: "Fully Insured", d: "Complete peace of mind with comprehensive insurance coverage on all work performed." },
  ];

  const testimonials = [
    { name: "Mpho Khumalo", role: "Homeowner, Limpopo", text: "Smart Solution rewired my entire house. Professional, neat, on time, and affordable. Absolutely recommend them!", rating: 5 },
    { name: "Bongani Dube", role: "Factory Manager, Ekurhuleni", text: "Flawless PLC installation. Great technical know-how and excellent after-service support.", rating: 5 },
    { name: "Thandi Mokoena", role: "Business Owner, Pretoria", text: "The solar installation has cut our electricity bill by over 60%. Tumelo and her team are exceptional!", rating: 5 },
  ];

  return (
    <div>
      <style>{`
        /* ========== MOBILE RESPONSIVE FIXES ========== */
        @media (max-width: 768px) {
          /* Hero section */
          .hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-visual { display: none !important; }
          .hero-title { font-size: 42px !important; line-height: 1.05 !important; }

          /* Hero text bigger */
          .hero-desc { font-size: 16px !important; line-height: 1.7 !important; max-width: 100% !important; }

          /* Buttons full width */
          .hero-btn { width: 100% !important; font-size: 16px !important; padding: 16px !important; justify-content: center !important; }

          /* Contact links bigger */
          .contact-link { font-size: 15px !important; }

          /* Stats cards */
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .stats-grid > div { padding: 24px 12px !important; }
          .stat-value { font-size: 38px !important; }
          .stat-label { font-size: 11px !important; }

          /* Services cards */
          .svc-card { padding: 22px 18px !important; }
          .svc-card h3 { font-size: 16px !important; }
          .svc-card p { font-size: 14px !important; }

          /* Why Us section */
          .why-us-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .why-title { font-size: 36px !important; }
          .why-desc { font-size: 15px !important; }
          .feat-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .feat-card h3 { font-size: 15px !important; }
          .feat-card p { font-size: 13px !important; }

          /* Testimonials */
          .testi-text { font-size: 15px !important; }

          /* CTA section */
          .cta-title { font-size: 32px !important; }
          .cta-desc { font-size: 16px !important; }
          .cta-btn { width: 100% !important; font-size: 16px !important; padding: 16px !important; }

          /* General text */
          p { font-size: 15px !important; line-height: 1.7 !important; }
          h2 { font-size: 32px !important; }
          h3 { font-size: 18px !important; }

          /* Section padding */
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg,${C.navy} 0%,${C.navyLight} 100%)`, minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(240,125,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,125,0,0.04) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle,rgba(240,125,0,0.13) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,125,0,0.1)", border: "1px solid rgba(240,125,0,0.25)", borderRadius: 24, padding: "6px 16px", marginBottom: 28 }}>
                <Zap size={12} color={C.orange} /><span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" }}>Professional Electrical Services</span>
              </div>
              <h1 className="hero-title" style={{ fontFamily: C.FD, fontSize: 80, color: "white", lineHeight: 0.93, marginBottom: 24 }}>
                YOUR VISION,<br /><span style={{ color: C.orange }}>OUR ELECTRICAL</span><br />EXPERTISE
              </h1>
              <p className="hero-desc" style={{ color: "rgba(255,255,255,0.62)", fontSize: 17, lineHeight: 1.78, maxWidth: 480, marginBottom: 40 }}>
                South Africa's trusted electrical contractor. From residential wiring and solar systems to industrial PLC automation — we power your world with precision and professionalism.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
                <button className="hero-btn" onClick={() => navigate('/contact')} style={{ background: C.orange, color: "white", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, display: "flex", alignItems: "center", gap: 8 }}>
                  Get Free Quote <ArrowRight size={17} />
                </button>
                <button className="hero-btn" onClick={() => navigate('/services')} style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.22)", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: C.FB }}>
                  Our Services
                </button>
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[{ I: Phone, v: "+27 79 333 4957", h: "tel:+27793334957" }, { I: Mail, v: "pennytumelo@gmail.com", h: "mailto:pennytumelo@gmail.com" }].map((c, i) => (
                  <a key={i} href={c.h} className="contact-link" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: "rgba(240,125,0,0.12)", border: "1px solid rgba(240,125,0,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><c.I size={14} color={C.orange} /></div>{c.v}
                  </a>
                ))}
              </div>
            </div>
            {/* Decorative Visual */}
            <div className="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: 380, height: 380 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(240,125,0,0.18)" }} />
                <div style={{ position: "absolute", inset: 38, borderRadius: "50%", border: "2px solid rgba(240,125,0,0.08)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 190, height: 190, background: `radial-gradient(circle at 38% 38%,${C.orange},#b85f00)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 90px rgba(240,125,0,0.55),0 0 160px rgba(240,125,0,0.18)` }}>
                    <Zap size={76} color="white" />
                  </div>
                </div>
                {[{ I: Sun, top: -8, left: 148, lbl: "Solar" }, { I: Cpu, top: 148, left: -18, lbl: "PLC" }, { I: Home, top: 304, left: 148, lbl: "Wiring" }, { I: Wrench, top: 148, left: 314, lbl: "Maint." }].map((o, i) => (
                  <div key={i} style={{ position: "absolute", top: o.top, left: o.left, background: C.navyMid, border: `2px solid rgba(240,125,0,0.35)`, borderRadius: 13, padding: "11px 15px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <o.I size={21} color={C.orange} /><span style={{ color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{o.lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 55" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
            <path d="M0 35 Q360 5 720 28 Q1080 50 1440 15 L1440 55 L0 55 Z" fill={C.offWhite} />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: C.offWhite, padding: "60px 24px" }}>
        <div className="stats-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
          {[["10+", "Years Experience"], ["150+", "Solved electrical Problems"], ["200+", "Happy Clients"], ["100%", "Quality Guarantee"]].map(([v, l], i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: "32px 20px", textAlign: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", borderBottom: `4px solid ${C.orange}` }}>
              <div className="stat-value" style={{ fontFamily: C.FD, fontSize: 56, color: C.orange, lineHeight: 1 }}>{v}</div>
              <div className="stat-label" style={{ color: C.navy, fontWeight: 700, fontSize: 13, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: "88px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader tag="What We Do" title="OUR SERVICES" subtitle="Comprehensive electrical solutions for residential, commercial, and industrial clients across South Africa." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 22, marginBottom: 44 }}>
            {SERVICES.map(s => (
              <div key={s.id} onClick={() => navigate('/services')} className="svc-card" style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "26px 22px", cursor: "pointer", transition: "all 0.3s", borderTop: `4px solid ${C.orange}` }}>
                <div style={{ width: 50, height: 50, background: "rgba(240,125,0,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <s.Icon size={25} color={C.orange} />
                </div>
                <h3 style={{ color: C.navy, fontWeight: 700, fontSize: 15, marginBottom: 7 }}>{s.title}</h3>
                <p style={{ color: C.gray, fontSize: 13, lineHeight: 1.65 }}>{s.short}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => navigate('/services')} style={{ background: C.orange, color: "white", border: "none", padding: "13px 34px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, display: "inline-flex", alignItems: "center", gap: 8 }}>
              View All Services <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "88px 24px", background: `linear-gradient(135deg,${C.navy},${C.navyLight})` }}>
        <div className="why-us-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Why Choose Us</div>
            <h2 className="why-title" style={{ fontFamily: C.FD, fontSize: 54, color: "white", lineHeight: 0.95, marginBottom: 22 }}>THE SMART SOLUTION DIFFERENCE</h2>
            <p className="why-desc" style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.85, marginBottom: 34 }}>
              Led by founder Tumelo Penny Rabopape, Smart Solution brings over a decade of electrical expertise, precision craftsmanship, and an unwavering commitment to safety.
            </p>
            <button onClick={() => navigate('/about')} style={{ background: "transparent", color: "white", border: `2px solid ${C.orange}`, padding: "12px 26px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: C.FB, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Learn About Us <ArrowRight size={16} />
            </button>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {feats.map((f, i) => (
              <div key={i} className="feat-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 20px" }}>
                <div style={{ width: 46, height: 46, background: "rgba(240,125,0,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <f.I size={22} color={C.orange} />
                </div>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{f.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.65 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "88px 24px", background: C.offWhite }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader tag="Client Reviews" title="WHAT OUR CLIENTS SAY" subtitle="Don't just take our word for it — here's what our satisfied clients have to say." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={15} color={C.orange} fill={C.orange} />)}
                </div>
                <p className="testi-text" style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, fontStyle: "italic", marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{ color: C.navy, fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: C.orange, fontSize: 12, fontWeight: 600, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ background: `linear-gradient(135deg,${C.orange},${C.orangeLight})`, borderRadius: 24, padding: "68px 48px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 24px 80px rgba(240,125,0,0.3)" }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, background: "rgba(255,255,255,0.08)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -50, left: -50, width: 220, height: 220, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Zap size={50} color="white" style={{ marginBottom: 18 }} />
              <h2 className="cta-title" style={{ fontFamily: C.FD, fontSize: 54, color: "white", marginBottom: 14 }}>READY TO POWER YOUR PROJECT?</h2>
              <p className="cta-desc" style={{ color: "rgba(255,255,255,0.9)", fontSize: 18, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>Get a free consultation and quote from our expert team. Fast response guaranteed.</p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="cta-btn" onClick={() => navigate('/contact')} style={{ background: "white", color: C.orange, border: "none", padding: "13px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: C.FB }}>Request a Quote</button>
                <a className="cta-btn" href="tel:+27793334957" style={{ background: "transparent", color: "white", border: "2px solid white", padding: "13px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}><Phone size={15} /> Call Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;