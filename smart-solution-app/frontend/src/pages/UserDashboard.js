import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../hooks/useMessages';
import Field from '../components/Field';
import ErrBox from '../components/ErrBox';
import StatusBadge from '../components/StatusBadge';
import { CheckCircle, MessageSquare, FileText } from 'lucide-react';

const C = {
  navy: "#0a1628", navyLight: "#1a2d58", orange: "#f07d00",
  offWhite: "#f0f4ff", cardBg: "#f8faff", border: "#e4eaf5",
  gray: "#6b7a99", success: "#059669",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const SERVICES = [
  "House Wiring", "Fault Finding", "Motor Connections",
  "Panel Design & Wiring", "PLC Wiring", "Maintenance",
  "Electronics", "Solar & Inverter"
];

const UserDashboard = () => {
  const { user } = useAuth();
  const { messages, fetchMyMessages, submitRequest } = useMessages();
  const [tab, setTab] = useState("requests");
  const [form, setForm] = useState({ phone: "", service: "", message: "" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchMyMessages();
  }, [user, fetchMyMessages]);

  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const counts = {
    total: messages.length,
    pending: messages.filter(m => m.status === "pending").length,
    prog: messages.filter(m => m.status === "in-progress").length,
    done: messages.filter(m => m.status === "resolved").length
  };

  const submit = async () => {
    if (!form.phone || !form.service || !form.message) { setErr("Please fill in all fields."); return; }
    setErr(""); setLoading(true);
    const result = await submitRequest({ ...form, userId: user?._id, name: user?.name, email: user?.email });
    setLoading(false);
    if (result.success) {
      setForm({ phone: "", service: "", message: "" });
      setDone(true);
      setTimeout(() => { setDone(false); setTab("requests"); }, 2000);
    } else {
      setErr(result.message);
    }
  };

  return (
    <div style={{ minHeight: "90vh", background: C.offWhite, padding: "36px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, borderRadius: 20, padding: "34px 40px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6 }}>User Dashboard</div>
            <h1 style={{ fontFamily: C.FD, fontSize: 40, color: "white" }}>WELCOME, {user?.name?.split(" ")[0]?.toUpperCase()}</h1>
          </div>
          <button onClick={() => setTab("new")} style={{ background: C.orange, color: "white", border: "none", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: C.FB }}>+ New Request</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 24 }}>
          {[["Total", counts.total, C.navy], ["Pending", counts.pending, "#d97706"], ["In Progress", counts.prog, "#2563eb"], ["Resolved", counts.done, C.success]].map(([l, v, col], i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "22px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", borderTop: `4px solid ${col}` }}>
              <div style={{ fontFamily: C.FD, fontSize: 42, color: col, lineHeight: 1 }}>{v}</div>
              <div style={{ color: C.gray, fontSize: 12, fontWeight: 600, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Panel */}
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ borderBottom: `1px solid ${C.border}`, display: "flex" }}>
            {[{ id: "requests", lbl: "My Requests", I: FileText }, { id: "new", lbl: "New Request", I: MessageSquare }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, padding: "17px", background: tab === t.id ? "white" : C.cardBg,
                border: "none", borderBottom: tab === t.id ? `3px solid ${C.orange}` : "3px solid transparent",
                color: tab === t.id ? C.navy : C.gray, fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: C.FB, display: "flex", alignItems: "center", justifyContent: "center", gap: 7
              }}>
                <t.I size={15} /> {t.lbl}
              </button>
            ))}
          </div>

          <div style={{ padding: "30px 32px" }}>
            {tab === "requests" && (
              messages.length === 0 ? (
                <div style={{ textAlign: "center", padding: "56px 20px" }}>
                  <MessageSquare size={44} color={C.border} style={{ marginBottom: 14 }} />
                  <h3 style={{ color: C.navy, fontWeight: 700, fontSize: 17, marginBottom: 7 }}>No requests yet</h3>
                  <p style={{ color: C.gray, marginBottom: 22 }}>You haven't submitted any service requests.</p>
                  <button onClick={() => setTab("new")} style={{ background: C.orange, color: "white", border: "none", padding: "10px 22px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: C.FB, fontSize: 14 }}>Submit First Request</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {messages.map(m => (
                    <div key={m._id} style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 24px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <div style={{ color: C.navy, fontWeight: 700, fontSize: 15 }}>{m.service}</div>
                          <div style={{ color: C.gray, fontSize: 12, marginTop: 2 }}>Submitted: {new Date(m.createdAt).toLocaleDateString()}</div>
                        </div>
                        <StatusBadge status={m.status} />
                      </div>
                      <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.65 }}>{m.message}</p>
                      {m.adminNote && (
                        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginTop: 12 }}>
                          <div style={{ color: "#2563eb", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>ADMIN NOTE</div>
                          <div style={{ color: "#1e40af", fontSize: 13 }}>{m.adminNote}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}

            {tab === "new" && (
              done ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <CheckCircle size={50} color={C.success} style={{ marginBottom: 14 }} />
                  <h3 style={{ fontFamily: C.FD, fontSize: 30, color: C.navy, marginBottom: 7 }}>REQUEST SUBMITTED!</h3>
                  <p style={{ color: C.gray }}>Redirecting to your requests...</p>
                </div>
              ) : (
                <div style={{ maxWidth: 520 }}>
                  <h3 style={{ fontFamily: C.FD, fontSize: 28, color: C.navy, marginBottom: 22 }}>SUBMIT A SERVICE REQUEST</h3>
                  <ErrBox msg={err} />
                  <Field label="Phone Number" value={form.phone} onChange={f("phone")} placeholder="+27 XX XXX XXXX" required />
                  <Field label="Service Required" value={form.service} onChange={f("service")} options={SERVICES} required />
                  <Field label="Project Description" type="textarea" value={form.message} onChange={f("message")} placeholder="Describe your electrical project or issue in detail..." required />
                  <button onClick={submit} disabled={loading} style={{
                    background: C.orange, color: "white", border: "none", padding: "13px 32px",
                    borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: C.FB, opacity: loading ? 0.7 : 1
                  }}>{loading ? "Submitting..." : "Submit Request"}</button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
