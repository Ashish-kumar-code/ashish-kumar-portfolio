import { motion } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { certifications } from '../data/content'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'

export default function Certifications() {
  const { accent, accentDim } = useMode()

  return (
    <section id="certifications" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">Credentials</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-1">
            Certifications & Bootcamps
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg mt-1.5">
            Professional qualifications and specialized bootcamps completed across deep learning, prompt engineering, and hackathon challenges.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((c, index) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#111214] border border-[#1E2024] p-5 rounded-xl hover:border-[#2E323A] transition duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div 
                className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition duration-300"
                style={{ backgroundColor: accent }}
              />

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-[#1E2024] bg-[#0B0B0C] group-hover:border-[#2E323A] transition"
                    style={{ color: accent }}
                  >
                    <Award size={18} />
                  </div>
                  <div 
                    className="text-[9.5px] font-mono border rounded-full px-2.5 py-0.5"
                    style={{ 
                      borderColor: accentDim, 
                      color: accent,
                      backgroundColor: 'rgba(79, 140, 255, 0.02)'
                    }}
                  >
                    {c.issuer}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm text-white group-hover:text-[#4F8CFF] transition duration-300">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 border-t border-[#1E2024]/60 pt-4 flex items-center justify-between">
                {c.link !== '#' ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono font-semibold flex items-center gap-1 hover:underline transition"
                    style={{ color: accent }}
                  >
                    Verify Credential
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-[#A1A1AA] flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    Completed
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
