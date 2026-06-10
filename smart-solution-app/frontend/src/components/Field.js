const C = {
  navy: "#0a1628", gray: "#6b7a99", border: "#e4eaf5", FB: "'Barlow', sans-serif"
};

const Field = ({ label, type = "text", value, onChange, placeholder, required, options, rows }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", color: C.navy, fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
      {label}{required && <span style={{ color: "#f07d00" }}> *</span>}
    </label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: "100%", padding: "11px 14px", border: `2px solid ${C.border}`,
        borderRadius: 8, fontSize: 15, color: value ? C.navy : C.gray,
        outline: "none", background: "white", fontFamily: C.FB
      }}>
        <option value="">Select a service...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows || 4} style={{
        width: "100%", padding: "11px 14px", border: `2px solid ${C.border}`,
        borderRadius: 8, fontSize: 15, color: C.navy, outline: "none",
        resize: "vertical", fontFamily: C.FB
      }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: "100%", padding: "11px 14px", border: `2px solid ${C.border}`,
        borderRadius: 8, fontSize: 15, color: C.navy, outline: "none",
        background: "white", fontFamily: C.FB
      }} />
    )}
  </div>
);

export default Field;
