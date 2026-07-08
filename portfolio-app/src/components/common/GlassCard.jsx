export default function GlassCard({ children }) {
  return (
    <div 
      style={{
        background: "rgba(30, 41, 59, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "var(--radius)",
        padding: "2rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "var(--shadow)"
      }}
    >
      {children}
    </div>
  );
}