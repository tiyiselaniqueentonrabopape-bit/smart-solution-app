import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import ErrBox from '../components/ErrBox';
import { CheckCircle, MessageSquare, Phone, Mail, User, MapPin } from 'lucide-react';

const C = {
  navy: "#0a1628", navyLight: "#1a2d58", orange: "#f07d00",
  offWhite: "#f0f4ff", cardBg: "#f8faff", border: "#e4eaf5",
  gray: "#6b7a99", grayLight: "#94a3b8", success: "#059669",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const SERVICES = [
  "House Wiring", "Fault Finding", "Motor Connections",
  "Panel Design & Wiring", "PLC Wiring", "Maintenance",
  "Electronics", "Solar & Inverter"
];

const ContactPage = () => {
  const { user } = useAuth();
  const { submitRequest } = useMessages();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    service: "",
    message: ""
  });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!form.phone || !form.service || !form.message) {
      setErr("Please fill in all required fields."); return;
    }
    if (!user && (!form.name || !form.email)) {
      setErr("Please enter your name and email."); return;
    }
    setErr(""); setLoading(true);
    const result = await submitRequest({
      ...form,
      userId: user?._id || null
    });
    setLoading(false);
    if (result.success) setDone(true);
    else setErr(result.message);
  };

  if (done) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.offWhite, padding: "40px 24px" }}>
      <div style={{ background: "white", borderRadius: 24, padding: "64px 48px", textAlign: "center", maxWidth: 500, boxShadow: "0 8px 48px rgba(0,0,0,0.08)", width: "100%" }}>
        <div style={{ width: 80, height: 80, background: "rgba(5,150,105,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <CheckCircle size={40} color={C.success} />
        </div>
        <h2 style={{ fontFamily: C.FD, fontSize: 40, color: C.navy, marginBottom: 12 }}>REQUEST SENT!</h2>
        <p style={{ color: C.gray, fontSize: 16, lineHeight: 1.78, marginBottom: 32 }}>Thank you for contacting Smart Solution Electrical. Our team will be in touch within 2–4 business hours.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }} style={{ background: C.orange, color: "white", border: "none", padding: "12px 26px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>Send Another</button>
          <button onClick={() => navigate('/')} style={{ background: "transparent", color: C.navy, border: `2px solid ${C.border}`, padding: "12px 26px", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>Back to Home</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <style>{`
        /* ========== CONTACT PAGE MOBILE FIXES ========== */
        @media (max-width: 768px) {
          .contact-hero-title { font-size: 48px !important; }
          .contact-hero-desc { font-size: 16px !important; max-width: 100% !important; }

          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

          .contact-info h2 { font-size: 32px !important; }
          .contact-info p { font-size: 15px !important; }
          .contact-info-item { gap: 12px !important; }
          .contact-info-item > div:first-child { width: 40px !important; height: 40px !important; }
          .contact-info-item a, .contact-info-item span { font-size: 16px !important; }

          .service-areas { padding: 20px !important; }
          .service-areas span { font-size: 11px !important; padding: "3px 10px" !important; }

          .contact-form { padding: 28px 20px !important; }
          .contact-form h2 { font-size: 30px !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .contact-form button { font-size: 16px !important; padding: 16px !important; }
        }
      `}</style>

      <section style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, padding: "100px 24px 72px", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Contact</div>
          <h1 className="contact-hero-title" style={{ fontFamily: C.FD, fontSize: 72, color: "white", marginBottom: 18 }}>GET IN TOUCH</h1>
          <p className="contact-hero-desc" style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>Request a free quote or ask us anything about your electrical project.</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" style={{ width: "100%", display: "block" }} preserveAspectRatio="none"><path d="M0 20 Q360 0 720 20 Q1080 40 1440 10 L1440 40 L0 40 Z" fill={C.offWhite} /></svg>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: C.offWhite }}>
        <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 52 }}>
          {/* Info */}
          <div className="contact-info">
            <h2 style={{ fontFamily: C.FD, fontSize: 40, color: C.navy, marginBottom: 8 }}>CONTACT INFORMATION</h2>
            <div style={{ width: 48, height: 4, background: C.orange, borderRadius: 2, marginBottom: 26 }} />
            <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.82, marginBottom: 34 }}>Available Mon–Fri 7am–6pm, Sat 8am–3pm, and 24/7 for electrical emergencies.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {[
                { I: Phone, lbl: "Phone 1", val: "+27 79 333 4957", href: "tel:+27793334957" },
                { I: Phone, lbl: "Phone 2", val: "+27 78 100 1947", href: "tel:+27781001947" },
                { I: Mail, lbl: "Email", val: "pennytumelo@gmail.com", href: "mailto:pennytumelo@gmail.com" },
                { I: User, lbl: "Founder", val: "Tumelo Penny Rabopape", href: null },
                { I: MapPin, lbl: "Coverage", val: "Gauteng & Nationwide", href: null },
              ].map((c, i) => (
                <div key={i} className="contact-info-item" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(240,125,0,0.1)", border: "1px solid rgba(240,125,0,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><c.I size={19} color={C.orange} /></div>
                  <div>
                    <div style={{ color: C.grayLight, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{c.lbl}</div>
                    {c.href ? <a href={c.href} style={{ color: C.navy, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{c.val}</a> : <span style={{ color: C.navy, fontSize: 15, fontWeight: 600 }}>{c.val}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="service-areas" style={{ background: C.navy, borderRadius: 16, padding: "26px" }}>
              <h4 style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Service Areas</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Johannesburg", "Pretoria", "Ekurhuleni", "Tshwane", "Centurion", "Midrand", "Sandton", "Soweto", "Nationwide"].map((a, i) => (
                  <span key={i} style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form" style={{ background: "white", borderRadius: 24, padding: "44px", boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>
            <h2 style={{ fontFamily: C.FD, fontSize: 36, color: C.navy, marginBottom: 8 }}>SEND US A MESSAGE</h2>
            <div style={{ width: 48, height: 4, background: C.orange, borderRadius: 2, marginBottom: 28 }} />
            <ErrBox msg={err} />
            {!user && (
              <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Full Name" value={form.name} onChange={f("name")} placeholder="Your full name" required />
                <Field label="Email Address" type="email" value={form.email} onChange={f("email")} placeholder="your@email.com" required />
              </div>
            )}
            <Field label="Phone Number" value={form.phone} onChange={f("phone")} placeholder="+27 XX XXX XXXX" required />
            <Field label="Service Required" value={form.service} onChange={f("service")} options={SERVICES} required />
            <Field label="Message / Project Details" type="textarea" value={form.message} onChange={f("message")} placeholder="Describe your electrical project or issue in detail..." required />
            <button onClick={submit} disabled={loading} style={{
              background: C.orange, color: "white", border: "none", padding: "14px",
              borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: C.FB, width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1
            }}>
              <MessageSquare size={17} /> {loading ? "Sending..." : "Send Request"}
            </button>
            <p style={{ color: C.grayLight, fontSize: 12, textAlign: "center", marginTop: 14 }}>We respond within 2–4 business hours. For emergencies, call us directly.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;