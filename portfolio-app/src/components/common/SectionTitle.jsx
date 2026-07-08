export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <p style={{ color: "var(--primary)" }}>{subtitle}</p>
      <h2>{title}</h2>
    </div>
  );
}