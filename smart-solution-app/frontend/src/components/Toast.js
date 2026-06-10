import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'ok', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'err' ? '#7f1d1d' : '#064e3b';

  return (
    <div style={{
      position: "fixed", top: 80, right: 20, zIndex: 9999,
      background: bg, color: "white", padding: "13px 20px",
      borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
      display: "flex", alignItems: "center", gap: 10, maxWidth: 360,
      animation: "slideDown 0.3s ease"
    }}>
      {type === 'err' ? <AlertCircle size={17} /> : <CheckCircle size={17} />}
      <span style={{ fontSize: 14, fontWeight: 600 }}>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "white", cursor: "pointer", marginLeft: 8 }}>
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
