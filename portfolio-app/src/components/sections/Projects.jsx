import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

function Projects() {
  return (
    <section id="projects" className="section">
      <Container>
        <SectionTitle title="Projects" subtitle="What I've Built" />
        {/* Project cards will go here */}
      </Container>
    </section>
  );
}

export default Projects;