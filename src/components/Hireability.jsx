import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { hireabilityCards } from '../data/content'
import { Server, BarChart3, BrainCircuit, ShieldAlert } from 'lucide-react'

const iconsMap = {
  'Full Stack Development': Server,
  'Data Analytics': BarChart3,
  'AI Projects': BrainCircuit,
  'Real Project Experience': ShieldAlert,
}

export default function Hireability() {
  const { mode, accent, accentDim } = useMode()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } },
  }

  return (
    <section id="why-hire-me" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            Why Hire Me
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            A look at my core competencies and how I bridge the gap between building applications and analyzing user data.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {hireabilityCards.map((card) => {
            const Icon = iconsMap[card.title] || Server
            // Determine if the card is highlighted based on selected filters
            const isDimmed = mode !== 'all' && card.type !== 'all' && card.type !== mode
            const isHighlighted = mode !== 'all' && card.type === mode

            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className={`glow-card bg-[#111214] border border-[#1E2024] rounded-xl p-5.5 flex flex-col gap-3.5 transition-all duration-300 ${
                  isDimmed ? 'opacity-30 blur-[0.5px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
                style={{ 
                  borderColor: isHighlighted ? accent : 'var(--color-border)',
                  boxShadow: isHighlighted ? `0 4px 20px ${accentDim}` : 'none'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#1E2024] bg-[#0B0B0C]"
                    style={{ color: isHighlighted ? accent : '#A1A1AA' }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-white">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono border px-1.5 py-0.5 rounded transition-all duration-300"
                      style={{ 
                        borderColor: isHighlighted ? accentDim : 'var(--color-border)', 
                        color: isHighlighted ? accent : 'var(--color-text-dim)',
                        backgroundColor: isHighlighted ? 'rgba(79, 140, 255, 0.03)' : 'transparent'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
