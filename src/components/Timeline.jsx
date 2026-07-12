import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { timeline } from '../data/content'
import { Calendar, GraduationCap, Laptop, Sparkles, Database } from 'lucide-react'

const iconMap = {
  '2022': GraduationCap,
  '2025': Laptop,
  '2025-26': Sparkles,
  'Built': Database,
  'Currently': Calendar,
}

export default function Timeline() {
  const { accent, accentDim } = useMode()

  return (
    <section id="timeline" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            My Journey
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            Chronological roadmap of my academic milestones, hands-on internships, and projects.
          </p>
        </div>

        <div className="relative border-l border-[#1E2024] ml-4 md:ml-6 pl-8 md:pl-10 space-y-10 py-2">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.year] || Sparkles
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Timeline Bullet Node */}
                <div 
                  className="absolute left-[-42px] md:left-[-52px] top-1.5 w-7 h-7 rounded-full bg-[#111214] border border-[#1E2024] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.boxShadow = `0 0 8px ${accent}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={12} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
                </div>

                {/* Content Block */}
                <div className="bg-[#111214] border border-[#1E2024] rounded-xl p-5 hover:border-[#2E323A] transition-all duration-300 max-w-2xl relative overflow-hidden group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  {/* Subtle color highlight bar */}
                  <div 
                    className="absolute top-0 left-0 w-1 h-full opacity-50 group-hover:opacity-100 transition-opacity" 
                    style={{ backgroundColor: accent }}
                  />
                  
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <span 
                      className="font-mono text-xs px-2 py-0.5 rounded border font-semibold"
                      style={{ 
                        borderColor: accentDim, 
                        color: accent,
                        backgroundColor: 'rgba(79, 140, 255, 0.02)'
                      }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-display font-bold text-[#E8E9ED] text-sm md:text-base">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs md:text-sm text-[#A1A1AA] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
