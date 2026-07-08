import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function About() {
  return (
    <section id="about" className="section">
      <Container>
        <SectionTitle title="About Me" subtitle="Who I Am" />
        {/* We will add the actual about content and cards here later */}
      </Container>
    </section>
  );
}

export default About;