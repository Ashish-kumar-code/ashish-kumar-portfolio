import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { skillsGrouped } from '../data/content'
import { Check } from 'lucide-react'

export default function Skills() {
  const { mode, accent, accentDim } = useMode()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const cardVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } },
  }

  return (
    <section id="skills" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            Technical Arsenal
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            A comprehensive overview of my tooling and frameworks. Choose specialization views above to spotlight specific areas of expertise.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
        >
          {skillsGrouped.map((group) => {
            const isHighlighted = mode !== 'all' && (group.type === mode || group.type === 'all')
            const isDimmed = mode !== 'all' && group.type !== 'all' && group.type !== mode

            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                className={`bg-[#111214] border border-[#1E2024] rounded-xl p-5 transition-all duration-300 ${
                  isDimmed ? 'opacity-40 blur-[0.3px] scale-[0.98]' : 'opacity-100 scale-100'
                } hover:border-[#2E323A]`}
                style={{
                  borderColor: isHighlighted ? accent : 'var(--color-border)',
                  boxShadow: isHighlighted ? `0 4px 20px ${accentDim}` : 'none'
                }}
              >
                <h3 
                  className="font-display font-bold text-xs uppercase tracking-wider mb-4 transition-colors duration-300"
                  style={{ color: isHighlighted ? accent : '#A1A1AA' }}
                >
                  {group.category}
                </h3>
                
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-xs sm:text-sm text-[#E8E9ED] font-medium">
                      <div 
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#1E2024] bg-[#0B0B0C]"
                        style={{ borderColor: isHighlighted ? accentDim : 'var(--color-border)' }}
                      >
                        <Check size={9} style={{ color: isHighlighted ? accent : '#A1A1AA' }} />
                      </div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
