export default function Badge({ children }) {
  return (
    <span 
      style={{
        padding: "6px 14px",
        borderRadius: "50px",
        background: "var(--surface-2)",
        color: "var(--primary)",
        fontSize: "14px",
        fontWeight: "600",
        display: "inline-block"
      }}
    >
      {children}
    </span>
  );
}