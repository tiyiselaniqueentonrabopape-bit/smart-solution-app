const C = {
  navy: "#0a1628", orange: "#f07d00", gray: "#6b7a99", FD: "'Bebas Neue', cursive"
};

const SectionHeader = ({ tag, title, subtitle, light }) => (
  <div style={{ textAlign: "center", marginBottom: 56 }}>
    {tag && <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>}
    <h2 style={{ fontFamily: C.FD, fontSize: 52, color: light ? "white" : C.navy, lineHeight: 1, marginBottom: 16 }}>{title}</h2>
    <div style={{ width: 56, height: 4, background: C.orange, margin: "0 auto 16px", borderRadius: 2 }} />
    {subtitle && <p style={{ color: light ? "rgba(255,255,255,0.65)" : C.gray, fontSize: 16, maxWidth: 580, margin: "0 auto" }}>{subtitle}</p>}
  </div>
);

export default SectionHeader;
