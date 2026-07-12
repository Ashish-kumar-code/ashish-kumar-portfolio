import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { profile } from '../data/content'
import { MapPin, Briefcase, ChevronRight, Copy, Check } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'

export default function Hero() {
  const { accent, accentDim } = useMode()
  const [copied, setCopied] = useState(false)
  const [activeLine, setActiveLine] = useState(null)

  const devObjectCode = `const developer = {
  name: "Ashish Kumar",
  role: "Full Stack Developer",
  secondary: "Data Analyst",
  experience: [
    "AI Intern",
    "Web Developer"
  ],
  currentlyLearning: [
    "Java Full Stack",
    "Data Engineering"
  ]
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(devObjectCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  }

  return (
    <section className="relative pt-12 md:pt-24 pb-16 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-700 animate-glow"
        style={{ backgroundColor: accent }}
      />
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
        {/* Left Side: Details */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {/* Availability Pill */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 border rounded-full px-3 py-1.5 w-fit mb-6 text-[11px] font-mono transition-all duration-300"
            style={{ 
              borderColor: accentDim, 
              color: accent,
              boxShadow: `inset 0 0 12px ${accentDim}`,
              backgroundColor: 'rgba(105, 219, 250, 0.07)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ backgroundColor: accent }} />
            Open to Full-Time Opportunities
          </motion.div>

          {/* Name & Title */}
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            {profile.name}
          </motion.h1>

          <motion.h2 
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white/90 mb-3 flex items-center gap-2"
          >
            Full Stack Developer <span className="text-[#A1A1AA]">&bull;</span> Data Analyst
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-lg mb-7"
          >
            Building AI-powered web applications, data-driven dashboards, and scalable backend systems.
          </motion.p>

          {/* Geography / Meta */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-[#A1A1AA] mb-8 items-center"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} style={{ color: accent }} />
              {profile.location}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#1E2024]" />
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} style={{ color: accent }} />
              B.Tech CSE Graduate (2026)
            </span>
          </motion.div>

          {/* Social and Resume Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3.5 mb-8"
          >


            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-11 h-10 rounded-lg border border-[#1E2024] hover:bg-[#111214] text-[#A1A1AA] hover:text-white transition"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-11 h-10 rounded-lg border border-[#1E2024] hover:bg-[#111214] text-[#A1A1AA] hover:text-white transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#projects"
                className="flex items-center justify-center gap-1.5 px-4 h-10 rounded-lg border border-[#1E2024] hover:bg-[#111214] text-xs font-semibold text-[#A1A1AA] hover:text-white transition"
              >
                Projects
                <ChevronRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Proof Points */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-[#1E2024] pt-6 grid grid-cols-2 gap-4 max-w-lg"
          >
            <div>
              <div className="text-xl font-bold font-display text-white">4+</div>
              <div className="text-[11px] font-sans text-[#A1A1AA] mt-0.5">Production-Style Projects</div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-white">3</div>
              <div className="text-[11px] font-sans text-[#A1A1AA] mt-0.5">Internship Experiences</div>
            </div>
            <div className="col-span-2 text-xs font-mono text-[#A1A1AA] flex items-center gap-1 bg-[#111214]/60 border border-[#1E2024] p-2 rounded-md">
              <span style={{ color: accent }}>&gt;</span> Python &bull; React &bull; Flask &bull; SQL &bull; Java
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Code Window */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', damping: 25, delay: 0.3 }}
          className="w-full"
        >
          <div className="bg-[#111214] border border-[#1E2024] rounded-xl overflow-hidden shadow-2xl relative">
            {/* Top IDE Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2024] bg-[#0E0E10]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                <span className="ml-2 font-mono text-[11px] text-[#A1A1AA]">profile.js</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-[#A1A1AA] hover:text-white transition p-1.5 rounded hover:bg-[#1E2024] active:scale-[0.98]"
                title="Copy Code"
              >
                {copied ? <Check size={14} className="text-[#27C93F]" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed text-[#D4D4D4] overflow-x-auto">
              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 1 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(1)}
                onMouseLeave={() => setActiveLine(null)}
              >
                <span className="text-[#569CD6]">const</span> <span className="text-[#9CDCFE]">developer</span> = &#123;
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 2 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(2)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;<span className="text-[#9CDCFE]">name</span>: <span className="text-[#CE9178]">"Ashish Kumar"</span>,
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 3 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(3)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;<span className="text-[#9CDCFE]">open for</span>: <span className="text-[#CE9178]">"Full Stack Developer & Data Analyst"</span>,
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 4 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(4)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;<span className="text-[#9CDCFE]">experience</span>: [
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 5 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(5)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#CE9178]">"AI Intern"</span>,
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 6 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(6)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#CE9178]">"Web Developer"</span>
              </div>

               <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 7 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(7)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#CE9178]">"Frontend Developer"</span>
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 8 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(8)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;],
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 9 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(9)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;<span className="text-[#9CDCFE]">currently Learning</span>: [
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 10 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(10)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#CE9178]">"Java Full Stack"</span>,
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 11 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(11)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#CE9178]">"Data Engineering"</span>
              </div>

              <div 
                className={`transition-all duration-300 py-0.5 px-2 rounded -mx-2 cursor-pointer ${activeLine === 12 ? 'bg-white/5' : ''}`}
                onMouseEnter={() => setActiveLine(12)}
                onMouseLeave={() => setActiveLine(null)}
              >
                &nbsp;&nbsp;]
              </div>

              <div>&#125;</div>
            </div>
            
            {/* Terminal Status Bar */}
            <div className="px-4 py-2 border-t border-[#1E2024] bg-[#0E0E10] flex justify-between items-center text-[10px] font-mono text-[#A1A1AA]">
              <span>UTF-8</span>
              <span>JavaScript</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
