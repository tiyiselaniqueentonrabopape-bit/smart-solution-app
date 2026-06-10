import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { User, Shield, Star, Users, CheckCircle, Award } from 'lucide-react';

const C = {
  navy: "#0a1628", navyLight: "#1a2d58", orange: "#f07d00",
  offWhite: "#f0f4ff", cardBg: "#f8faff", border: "#e4eaf5",
  gray: "#6b7a99", FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    { I: Shield, t: "Safety First", d: "Strict safety protocols on every job, fully compliant with South African electrical codes and regulations." },
    { I: Star, t: "Excellence", d: "We hold ourselves to the highest standards of quality and precision in every installation and repair." },
    { I: Users, t: "Client Focus", d: "Your satisfaction drives everything we do. We listen, understand, and deliver beyond expectations." },
    { I: CheckCircle, t: "Integrity", d: "Honest pricing, transparent communication, and reliable service ,every single time." },
  ];

  const certs = ["Registered Electrical Contractor", "COC Certificate Issuing Authority", "Dept. of Labour Registered", "ECSA Compliant Workmanship", "Fully Insured & Bonded", "Safety Compliance Certified"];

  return (
    <div>
      <style>{`
        /* ========== ABOUT PAGE MOBILE FIXES ========== */
        @media (max-width: 768px) {
          .about-hero-title { font-size: 48px !important; }
          .about-hero-desc { font-size: 16px !important; max-width: 100% !important; }

          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-founder { padding: 32px 24px !important; }
          .about-founder h3 { font-size: 28px !important; }
          .about-founder-stats { grid-template-columns: 1fr !important; gap: 10px !important; }
          .about-founder-stats > div { padding: 12px !important; }
          .about-founder-stats .stat-num { font-size: 28px !important; }

          .about-text h2 { font-size: 36px !important; }
          .about-text p { font-size: 15px !important; }
          .about-certs { grid-template-columns: 1fr !important; }

          .mission-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .mission-card { padding: 32px 24px !important; }
          .mission-card h3 { font-size: 30px !important; }
          .mission-card p { font-size: 15px !important; }

          .values-grid { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .values-grid > div { padding: 24px 16px !important; }
          .values-grid h3 { font-size: 14px !important; }
          .values-grid p { font-size: 13px !important; }

          .cta-title { font-size: 36px !important; }
          .cta-desc { font-size: 15px !important; }
          .cta-btn { width: 100% !important; font-size: 16px !important; padding: 16px !important; }
        }
      `}</style>

      <section style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, padding: "100px 24px 72px", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>About Us</div>
          <h1 className="about-hero-title" style={{ fontFamily: C.FD, fontSize: 72, color: "white", marginBottom: 18 }}>OUR STORY</h1>
          <p className="about-hero-desc" style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>Powering South Africa's homes and businesses with expert electrical solutions since 2024.</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
            <path d="M0 20 Q720 40 1440 0 L1440 40 L0 40 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section style={{ padding: "88px 24px", background: "white" }}>
        <div className="about-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
          {/* Founder card */}
          <div className="about-founder" style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, borderRadius: 24, padding: "52px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -28, right: -28, width: 130, height: 130, background: "rgba(240,125,0,0.1)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -35, left: -20, width: 170, height: 170, background: "rgba(240,125,0,0.06)", borderRadius: "50%" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 70, height: 70, background: C.orange, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
                <User size={36} color="white" />
              </div>
              <h3 style={{ fontFamily: C.FD, fontSize: 34, color: "white", marginBottom: 4 }}>TUMELO PENNY RABOPAPE</h3>
              <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 22 }}>Founder & Master Electrician</div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.85, marginBottom: 30 }}>
                With over 10 years in the electrical contracting industry, Tumelo founded Smart Solution with a vision to deliver professional, reliable, and affordable electrical services. His dedication to safety, quality, and client satisfaction has built a company that South Africans trust and recommend.
              </p>
              <div className="about-founder-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[["10+", "Years"], ["150+", "Solved Electrical Problems"], ["200+", "Happy Clients"]].map(([n, l], i) => (
                  <div key={i} style={{ textAlign: "center", padding: "14px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 12 }}>
                    <div className="stat-num" style={{ fontFamily: C.FD, fontSize: 32, color: C.orange }}>{n}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text">
            <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Who We Are</div>
            <h2 style={{ fontFamily: C.FD, fontSize: 50, color: C.navy, marginBottom: 22, lineHeight: 0.95 }}>POWERING YOUR WORLD WITH EXPERTISE</h2>
            <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.88, marginBottom: 20 }}>Smart Solution Electrical Trading & Projects (PTY LTD) is a South African electrical contracting company delivering comprehensive services to residential, commercial, and industrial clients.</p>
            <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.88, marginBottom: 32 }}>Our certified electricians combine decades of experience with modern technology and an unwavering commitment to safety ,ensuring every job is done right, on time, and within budget.</p>
            <div className="about-certs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {certs.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 22, height: 22, background: "rgba(240,125,0,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckCircle size={12} color={C.orange} /></div>
                  <span style={{ color: C.navy, fontWeight: 600, fontSize: 13 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "88px 24px", background: C.offWhite }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader title="MISSION & VISION" />
          <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { dark: false, I: Star, t: "OUR MISSION", d: "To deliver safe, reliable, and innovative electrical solutions that empower our clients. We are committed to professionalism, superior workmanship, and relationships built on trust and transparency." },
              { dark: true, I: Award, t: "OUR VISION", d: "To be the most trusted and innovative electrical contractor in South Africa ,setting the gold standard for safety, excellence, and client satisfaction in every project we undertake." },
            ].map((m, i) => (
              <div key={i} className="mission-card" style={{ background: m.dark ? C.navy : "white", borderRadius: 20, padding: "48px", borderLeft: `6px solid ${C.orange}`, boxShadow: m.dark ? "0 4px 24px rgba(10,22,40,0.2)" : "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 52, height: 52, background: `rgba(240,125,0,${m.dark ? 0.2 : 0.1})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <m.I size={26} color={C.orange} />
                </div>
                <h3 style={{ fontFamily: C.FD, fontSize: 36, color: m.dark ? "white" : C.navy, marginBottom: 16 }}>{m.t}</h3>
                <p style={{ color: m.dark ? "rgba(255,255,255,0.65)" : C.gray, fontSize: 16, lineHeight: 1.88 }}>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "88px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader tag="Core Values" title="WHAT DRIVES US" />
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ textAlign: "center", padding: "38px 22px", background: C.cardBg, borderRadius: 18, border: `1px solid ${C.border}` }}>
                <div style={{ width: 62, height: 62, background: "rgba(240,125,0,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}><v.I size={30} color={C.orange} /></div>
                <h3 style={{ color: C.navy, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{v.t}</h3>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.75 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: `linear-gradient(135deg,${C.navy},${C.navyLight})` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2 className="cta-title" style={{ fontFamily: C.FD, fontSize: 52, color: "white", marginBottom: 14 }}>LET'S BUILD SOMETHING GREAT</h2>
          <p className="cta-desc" style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, marginBottom: 34 }}>Contact us today to discuss your electrical problems then we'll provide a solution.</p>
          <button className="cta-btn" onClick={() => navigate('/contact')} style={{ background: C.orange, color: "white", border: "none", padding: "13px 38px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: C.FB }}>Contact Us Today</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;