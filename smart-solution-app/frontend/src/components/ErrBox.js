import { AlertCircle } from 'lucide-react';

const C = { error: "#dc2626" };

const ErrBox = ({ msg }) => msg ? (
  <div style={{
    background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10,
    padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "center", gap: 10
  }}>
    <AlertCircle size={17} color={C.error} />
    <span style={{ color: C.error, fontSize: 14 }}>{msg}</span>
  </div>
) : null;

export default ErrBox;
