import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { experience } from '../data/content'
import { CheckCircle2, Calendar, Link2, Play } from 'lucide-react'

export default function Experience() {
  const { accent, accentDim } = useMode()

  return (
    <section id="experience" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            Work Experience
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            Chronological log of my internship training and software engineering practice.
          </p>
        </div>

        {/* Timeline Layout matching reference structure */}
        <div className="relative border-l border-[#1E2024] ml-3 pl-8 md:pl-10 space-y-12 py-2">
          {experience.map((item, index) => (
            <motion.div
              key={item.org}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div 
                className="absolute left-[-39px] md:left-[-47px] top-1.5 w-5 h-5 rounded-full bg-[#0B0B0C] border-2 border-[#1E2024] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ borderColor: accent }}
              />

              {/* Card Container */}
              <div className="bg-[#111214] border border-[#1E2024] rounded-xl p-6 hover:border-[#2E323A] transition duration-300 max-w-3xl hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      {item.role} at @{item.org}
                    </h3>
                    <div className="text-xs font-mono text-[#A1A1AA] mt-1">
                      System Engineering Intern track
                    </div>
                  </div>
                  <div 
                    className="inline-flex items-center gap-1 text-[10.5px] font-mono border rounded-full px-2.5 py-0.5 w-fit"
                    style={{ 
                      borderColor: accentDim, 
                      color: accent,
                      backgroundColor: 'rgba(79, 140, 255, 0.02)'
                    }}
                  >
                    <Calendar size={11} />
                    {item.date}
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-3 mb-6">
                  {item.bullets.map((bullet, idx) => {
                    const parts = bullet.split(':')
                    const highlight = parts[0]
                    const body = parts[1] || ''
                    return (
                      <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                        <span>
                          <strong className="text-white font-medium">{highlight}</strong>
                          {body}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {/* Direct Action Link */}
                <div className="border-t border-[#1E2024]/50 pt-4 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href={item.github || "https://github.com/Ashish-kumar-code"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold transition hover:underline"
                    style={{ color: accent }}
                  >
                    <Link2 size={13} />
                    View Repo
                  </a>
                  {item.work && (
                    <a
                      href={item.work}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold transition hover:underline text-[#A1A1AA] hover:text-white"
                    >
                      <Play size={11} className="text-[#4F8CFF] fill-[#4F8CFF]" />
                      View Work
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
