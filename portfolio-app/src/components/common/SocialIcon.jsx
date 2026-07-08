export default function SocialIcon({ icon: Icon, link }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: "var(--surface-2)",
        color: "var(--text)",
        transition: "var(--transition)",
        textDecoration: "none"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "var(--primary)";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "var(--surface-2)";
        e.currentTarget.style.color = "var(--text)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <Icon size={22} />
    </a>
  );
}