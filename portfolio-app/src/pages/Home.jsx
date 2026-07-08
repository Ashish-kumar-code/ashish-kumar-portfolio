import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Projects from "../components/sections/Projects";
import Certifications from "../components/sections/Certifications";
import Timeline from "../components/sections/Timeline";
import Contact from "../components/sections/Contact";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Timeline />
      <Contact />
    </>
  );
}

export default Home;