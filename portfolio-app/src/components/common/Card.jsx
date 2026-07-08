function Card({ children }) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: "16px",
        padding: "2rem",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}

export default Card;