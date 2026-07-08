function Button({ children }) {
  return (
    <button
      style={{
        padding: "14px 28px",
        borderRadius: "10px",
        background: "var(--primary)",
        color: "#fff",
      }}
    >
      {children}
    </button>
  );
}

export default Button;