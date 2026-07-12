import { ModeProvider } from './context/ModeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Hireability from './components/Hireability'
import Education from './components/Education'
import Timeline from './components/Timeline'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Projects from './components/Projects'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import GithubActivity from './components/GithubActivity'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'

function App() {
  return (
    <ModeProvider>
      <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-[#4F8CFF] selection:text-[#0B0B0C] antialiased">
        <Nav />
        <ResumeModal />
        <main>
          <Hero />
          <About />
          <Hireability />
          <Education />
          <Timeline />
          <Experience />
          <Certifications />
          <Skills />
          <Projects />
          <AnalyticsDashboard />
          <GithubActivity />
        </main>
        <Footer />
      </div>
    </ModeProvider>
  )
}

export default App
