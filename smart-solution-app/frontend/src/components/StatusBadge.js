const StatusBadge = ({ status }) => {
  const map = {
    pending: { bg: "#fef3c7", c: "#d97706", lbl: "Pending" },
    "in-progress": { bg: "#dbeafe", c: "#2563eb", lbl: "In Progress" },
    resolved: { bg: "#d1fae5", c: "#059669", lbl: "Resolved" }
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      background: s.bg, color: s.c, padding: "3px 12px",
      borderRadius: 20, fontSize: 12, fontWeight: 700
    }}>{s.lbl}</span>
  );
};

export default StatusBadge;
