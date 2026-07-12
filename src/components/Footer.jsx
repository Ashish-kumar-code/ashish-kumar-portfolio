import { useMode } from '../context/ModeContext'
import { profile } from '../data/content'
import { Mail, MapPin } from 'lucide-react'
import { Github, Linkedin } from './SocialIcons'

export default function Footer() {
  const { accent, accentDim } = useMode()

  return (
    <footer id="contact" className="py-16 bg-[#0E0E10] border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
          {/* Left Column: Heading and Info */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md mb-6">
              I am active on email and LinkedIn. If you are looking for a job-ready developer who can build full-stack architectures and analyze system data or Data analytics roles, reach out!
            </p>

            <div className="space-y-3.5 text-xs sm:text-sm font-mono text-[#A1A1AA]">
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: accent }} />
                <a href={`mailto:${profile.email}`} className="hover:text-white transition">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: accent }} />
                <span>📍 India &bull; Open to Remote and Onsite</span>
              </div>
            </div>

            {/* Availability tags */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {['Full-time Roles', 'SDE-1 / Analyst', 'Freelance'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono border rounded-full px-3 py-1 font-semibold"
                  style={{
                    borderColor: accentDim,
                    color: accent,
                    backgroundColor: 'rgba(79, 140, 255, 0.01)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Contact Card */}
          <div className="bg-[#111214] border border-[#1E2024] p-6 rounded-xl hover:border-[#2E323A] transition flex flex-col justify-between h-full min-h-[220px]">
            <div>
              <h3 className="font-display font-bold text-sm text-white mb-2">
                Get In Touch
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-5">
                Have an opportunity or want to discuss a project? Drop me an email, and let's start a conversation.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold bg-white text-[#0B0B0C] hover:bg-white/95 cursor-pointer transition active:scale-[0.98]"
              >
                <Mail size={14} />
                Send Email Message
              </a>
            </div>

            <div className="flex gap-4 justify-center mt-6 border-t border-[#1E2024] pt-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="border-t border-[#1E2024] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#A1A1AA]">
          <div>
            Built with React &bull; Tailwind &bull; Framer Motion
          </div>
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
