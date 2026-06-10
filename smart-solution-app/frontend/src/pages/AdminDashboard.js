import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { useUsers } from '../hooks/useUsers';
import StatusBadge from '../components/StatusBadge';
import {
  MessageSquare, Bell, Activity, CheckCircle, Users, Search,
  Trash2, User, FileText
} from 'lucide-react';

const C = {
  navy: "#0a1628", navyLight: "#1a2d58", orange: "#f07d00",
  offWhite: "#f0f4ff", cardBg: "#f8faff", border: "#e4eaf5",
  gray: "#6b7a99", grayLight: "#94a3b8", success: "#059669", error: "#dc2626",
  FD: "'Bebas Neue', cursive", FB: "'Barlow', sans-serif"
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const { messages, fetchAllMessages, updateStatus, deleteMessage, addNote } = useMessages();
  const { users, fetchUsers } = useUsers();

  const [tab, setTab] = useState("messages");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editNote, setEditNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    fetchAllMessages();
    fetchUsers();
  }, [fetchAllMessages, fetchUsers]);

  const filtered = messages.filter(m => {
    const mf = filter === "all" || m.status === filter;
    const ms = !search || (m.name + m.service + m.email).toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  const counts = {
    total: messages.length,
    pending: messages.filter(m => m.status === "pending").length,
    prog: messages.filter(m => m.status === "in-progress").length,
    done: messages.filter(m => m.status === "resolved").length,
  };

  const handleSaveNote = async (id) => {
    await addNote(id, noteText);
    setEditNote(null);
    setNoteText("");
  };

  return (
    <div style={{ minHeight: "90vh", background: C.offWhite, padding: "36px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyLight})`, borderRadius: 20, padding: "34px 40px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6 }}>Admin Dashboard</div>
            <h1 style={{ fontFamily: C.FD, fontSize: 40, color: "white" }}>CONTROL CENTER</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Logged in as</div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{user?.name}</div>
            </div>
            <div style={{ width: 44, height: 44, background: C.orange, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={22} color="white" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 24 }}>
          {[
            { l: "All Messages", v: counts.total, col: C.navy, I: MessageSquare, fi: "all" },
            { l: "Pending", v: counts.pending, col: "#d97706", I: Bell, fi: "pending" },
            { l: "In Progress", v: counts.prog, col: "#2563eb", I: Activity, fi: "in-progress" },
            { l: "Resolved", v: counts.done, col: C.success, I: CheckCircle, fi: "resolved" },
            { l: "Registered Users", v: users.length, col: "#7c3aed", I: Users, fi: null },
          ].map((s, i) => (
            <div key={i} onClick={() => { if (s.fi !== null) { setTab("messages"); setFilter(s.fi); } else { setTab("users"); } }} style={{
              background: "white", borderRadius: 14, padding: "22px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              borderTop: `4px solid ${s.col}`, cursor: "pointer"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontFamily: C.FD, fontSize: 44, color: s.col, lineHeight: 1 }}>{s.v}</div>
                <div style={{ width: 34, height: 34, background: `${s.col}15`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><s.I size={17} color={s.col} /></div>
              </div>
              <div style={{ color: C.gray, fontSize: 12, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ background: "white", borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          {/* Tabs */}
          <div style={{ borderBottom: `1px solid ${C.border}`, display: "flex" }}>
            {[{ id: "messages", lbl: "Messages & Requests", I: MessageSquare }, { id: "users", lbl: "Registered Users", I: Users }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "17px 28px", background: tab === t.id ? "white" : C.cardBg,
                border: "none", borderBottom: tab === t.id ? `3px solid ${C.orange}` : "3px solid transparent",
                color: tab === t.id ? C.navy : C.gray, fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: C.FB, display: "flex", alignItems: "center", gap: 7
              }}>
                <t.I size={15} /> {t.lbl}
              </button>
            ))}
          </div>

          {tab === "messages" && (
            <div style={{ padding: "24px 28px" }}>
              {/* Toolbar */}
              <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                  <Search size={15} color={C.gray} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }} />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email or service..." style={{
                    width: "100%", padding: "10px 14px 10px 38px", border: `2px solid ${C.border}`,
                    borderRadius: 10, fontSize: 14, color: C.navy, outline: "none", fontFamily: C.FB, boxSizing: "border-box"
                  }} />
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {["all", "pending", "in-progress", "resolved"].map(fi => (
                    <button key={fi} onClick={() => setFilter(fi)} style={{
                      padding: "8px 15px", borderRadius: 8, border: `2px solid ${filter === fi ? C.orange : C.border}`,
                      background: filter === fi ? "rgba(240,125,0,0.07)" : "white",
                      color: filter === fi ? C.orange : C.gray, fontWeight: 700, fontSize: 12,
                      cursor: "pointer", fontFamily: C.FB, textTransform: "capitalize"
                    }}>
                      {fi === "all" ? "All" : (fi === "in-progress" ? "In Progress" : fi.charAt(0).toUpperCase() + fi.slice(1))}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px", color: C.gray }}>
                  <MessageSquare size={38} color={C.border} style={{ marginBottom: 12 }} />
                  <p>No messages match your current filter.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {filtered.map(m => (
                    <div key={m._id} style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 24px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 38, height: 38, background: "rgba(240,125,0,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><User size={18} color={C.orange} /></div>
                          <div>
                            <div style={{ color: C.navy, fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                            <div style={{ color: C.gray, fontSize: 12 }}>{m.email} • {m.phone}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <StatusBadge status={m.status} />
                          <span style={{ color: C.grayLight, fontSize: 12 }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div style={{ background: C.cardBg, borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
                        <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{m.service}</div>
                        <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.65 }}>{m.message}</p>
                      </div>

                      {m.adminNote && (
                        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                          <span style={{ color: "#2563eb", fontSize: 11, fontWeight: 700 }}>ADMIN NOTE: </span>
                          <span style={{ color: "#1e40af", fontSize: 13 }}>{m.adminNote}</span>
                        </div>
                      )}

                      {/* Note editor */}
                      {editNote === m._id && (
                        <div style={{ marginBottom: 14 }}>
                          <textarea
                            value={noteText}
                            onChange={e => setNoteText(e.target.value)}
                            placeholder="Add admin note..."
                            rows={2}
                            style={{ width: "100%", padding: "10px 14px", border: `2px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: C.FB, resize: "vertical" }}
                          />
                          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                            <button onClick={() => handleSaveNote(m._id)} style={{ background: C.orange, color: "white", border: "none", padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: C.FB }}>Save Note</button>
                            <button onClick={() => { setEditNote(null); setNoteText(""); }} style={{ background: "transparent", color: C.gray, border: `1px solid ${C.border}`, padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: C.FB }}>Cancel</button>
                          </div>
                        </div>
                      )}

                      {/* Status controls */}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ color: C.gray, fontSize: 12, fontWeight: 700, marginRight: 4 }}>Status:</span>
                        {["pending", "in-progress", "resolved"].map(s => (
                          <button key={s} onClick={() => updateStatus(m._id, s)} style={{
                            padding: "5px 13px", borderRadius: 8,
                            border: `1px solid ${m.status === s ? C.orange : C.border}`,
                            background: m.status === s ? "rgba(240,125,0,0.1)" : "white",
                            color: m.status === s ? C.orange : C.gray, fontWeight: 700,
                            fontSize: 12, cursor: "pointer", fontFamily: C.FB
                          }}>
                            {s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                        <button onClick={() => { setEditNote(m._id); setNoteText(m.adminNote || ""); }} style={{ marginLeft: "auto", marginRight: 8, padding: "5px 13px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.cardBg, color: C.navy, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: C.FB }}>
                          <FileText size={12} style={{ display: "inline", marginRight: 4 }} /> Note
                        </button>
                        <button onClick={() => deleteMessage(m._id)} style={{
                          padding: "5px 13px", borderRadius: 8, border: "1px solid #fecaca",
                          background: "#fef2f2", color: C.error, fontWeight: 700,
                          fontSize: 12, cursor: "pointer", fontFamily: C.FB,
                          display: "flex", alignItems: "center", gap: 4
                        }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "users" && (
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h3 style={{ fontFamily: C.FD, fontSize: 28, color: C.navy }}>REGISTERED USERS</h3>
                <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "7px 16px", color: C.navy, fontWeight: 700, fontSize: 14 }}>{users.length} Users</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {users.map(u => {
                  const uc = messages.filter(m => m.userId === u._id).length;
                  return (
                    <div key={u._id} style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 46, height: 46, background: "rgba(240,125,0,0.1)", border: `2px solid rgba(240,125,0,0.2)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={22} color={C.orange} /></div>
                        <div>
                          <div style={{ color: C.navy, fontWeight: 700, fontSize: 15 }}>{u.name}</div>
                          <div style={{ color: C.gray, fontSize: 13 }}>{u.email}</div>
                          <div style={{ color: C.grayLight, fontSize: 11, marginTop: 2 }}>Joined: {new Date(u.joined).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ textAlign: "center", padding: "8px 18px", background: C.cardBg, borderRadius: 10, border: `1px solid ${C.border}` }}>
                          <div style={{ fontFamily: C.FD, fontSize: 26, color: C.orange }}>{uc}</div>
                          <div style={{ color: C.gray, fontSize: 11 }}>Requests</div>
                        </div>
                        <span style={{ background: "#d1fae5", color: C.success, padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Active</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
