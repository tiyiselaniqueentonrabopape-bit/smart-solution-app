import { MessageCircle } from 'lucide-react';

const C = {
  navy: "#0a1628",
  orange: "#f07d00",
  white: "#ffffff",
};

const WhatsAppButton = () => {
  const phone = "+27793334957";
  const message = "Hello SMARTSOLUTION ELECTRICAL TRADING PROJECTS. I would like more information about your services.";
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: 60,
        height: 60,
        background: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
      }}
    >
      {/* WhatsApp Icon using SVG (no external dependency needed) */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.88 12.15l-1.1 4 4.1-1.08A7.95 7.95 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68zM12 18.5a6.46 6.46 0 0 1-3.3-.91l-.24-.14-2.47.65.66-2.4-.16-.26a6.46 6.46 0 0 1 5.55-9.83 6.46 6.46 0 0 1 6.46 6.46 6.47 6.47 0 0 1-6.5 6.43zm3.55-4.85c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1s-.52.64-.64.77-.24.15-.44.05a5.58 5.58 0 0 1-1.64-1.02 6.2 6.2 0 0 1-1.14-1.4c-.12-.2 0-.3.09-.4.1-.1.2-.24.3-.36.1-.12.13-.2.2-.33.06-.13.03-.24-.02-.34s-.45-1.07-.62-1.47c-.16-.38-.32-.33-.45-.34l-.38-.01a.73.73 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.72 1.93.82 2.06c.1.13 1.4 2.13 3.4 2.99.47.2.84.32 1.13.42.48.15.91.13 1.25.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.85.12-.94-.05-.08-.18-.13-.38-.22z"
          fill="white"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;