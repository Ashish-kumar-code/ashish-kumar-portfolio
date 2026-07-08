import Container from "../common/Container";

function Footer() {
  return (
    <footer
      style={{
        padding: "40px 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Container>
        <p>© 2026 Ashish Kumar. Built with React & Vite.</p>
      </Container>
    </footer>
  );
}

export default Footer;
