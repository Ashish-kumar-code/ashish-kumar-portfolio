import { useMode } from '../context/ModeContext'
import { profile, aboutMe } from '../data/content'
import { Github, Linkedin } from './SocialIcons'
import { Mail, MapPin } from 'lucide-react'

export default function About() {
  const { accent, accentDim, openResumeModal } = useMode()

  return (
    <section id="about" className="py-16 border-t border-[#1E2024] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          {/* Left Side: Profile Frame Visual */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-[#1E2024] bg-[#111214] flex items-center justify-center p-2.5 group">
              {/* Inner glowing circle */}
              <div 
                className="absolute inset-2 rounded-full border border-dashed transition-all duration-700 group-hover:rotate-45"
                style={{ borderColor: accentDim }}
              />
              
              {/* Profile Avatar Image */}
              <div className="w-full h-full rounded-full border border-[#1E2024] relative z-10 overflow-hidden bg-[#0B0B0C] flex items-center justify-center">
                <img 
                  src="/avatar.jpg" 
                  alt="Ashish Kumar" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Subtle accent glow backplate */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full opacity-10 blur-md transition-all duration-300 group-hover:opacity-20 pointer-events-none"
                style={{ backgroundColor: accent }}
              />
            </div>
          </div>

          {/* Right Side: Bio and Contacts */}
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">About Myself</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                Hi! I am Ashish Kumar
              </h2>
              <div className="h-[2px] w-12 mt-3" style={{ backgroundColor: accent }} />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              {aboutMe.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Direct Contact Coordinates */}
            <div className="border-t border-[#1E2024] pt-5 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: accent }} />
                <span className="text-[#A1A1AA]">Contact me: </span>
                <a href={`mailto:${profile.email}`} className="text-white hover:underline transition">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: accent }} />
                <span className="text-[#A1A1AA]">Location: </span>
                <span className="text-white">Bengaluru, India (Open to Remote / Relocation)</span>
              </div>
            </div>

            {/* Resume actions and Social Media List */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3">
              <div className="flex gap-2">
                <button
                  onClick={() => openResumeModal('fullstack')}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-white text-[#0B0B0C] hover:bg-white/95 cursor-pointer transition active:scale-[0.98]"
                >
                  Full Stack CV
                </button>
                <button
                  onClick={() => openResumeModal('analyst')}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-[#1E2024] text-white hover:bg-white/5 cursor-pointer transition active:scale-[0.98]"
                >
                  Analytics CV
                </button>
              </div>

              {/* Social Media Link Icons */}
              <div className="flex items-center gap-3 ml-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[#1E2024] flex items-center justify-center text-[#A1A1AA] hover:text-white transition hover:bg-[#111214]"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-[#1E2024] flex items-center justify-center text-[#A1A1AA] hover:text-white transition hover:bg-[#111214]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
