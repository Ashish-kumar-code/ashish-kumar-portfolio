import { useMode } from '../context/ModeContext'
import { education } from '../data/content'
import { GraduationCap, BookOpen } from 'lucide-react'

export default function Education() {
  const { accent, accentDim } = useMode()

  return (
    <section id="education" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">Qualifications</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-1">
            Academic Background
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* B.Tech Education Card */}
          <div className="bg-[#111214] border border-[#1E2024] p-6 rounded-xl hover:border-[#2E323A] transition flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: accent }} />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#1E2024] bg-[#0B0B0C]"
                  style={{ color: accent }}
                >
                  <GraduationCap size={20} />
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Higher Education
                </h3>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">
                  {education.degree}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
                  {education.school}
                </p>
                <div 
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono border rounded-full px-2.5 py-0.5"
                  style={{ 
                    borderColor: accentDim, 
                    color: accent,
                    backgroundColor: 'rgba(79, 140, 255, 0.02)'
                  }}
                >
                  {education.meta}
                </div>
              </div>
            </div>

            <div className="border-t border-[#1E2024] pt-4 mt-4 text-xs text-[#A1A1AA] leading-relaxed">
              Focused on core software engineering principles, normalized database structures, applied neural network triage, and scalable backend services.
            </div>
          </div>

          {/* Schooling Education Card */}
          <div className="bg-[#111214] border border-[#1E2024] p-6 rounded-xl hover:border-[#2E323A] transition flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: accent }} />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#1E2024] bg-[#0B0B0C]"
                  style={{ color: accent }}
                >
                  <BookOpen size={18} style={{ color: accent }} />
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Intermediate Schooling
                </h3>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-1">
                  {education.schoolingDegree}
                </h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">
                  {education.schoolingSchool}
                </p>
                <div 
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono border rounded-full px-2.5 py-0.5"
                  style={{ 
                    borderColor: accentDim, 
                    color: accent,
                    backgroundColor: 'rgba(79, 140, 255, 0.02)'
                  }}
                >
                  {education.schoolingMeta}
                </div>
              </div>
            </div>

            <div className="border-t border-[#1E2024] pt-4 mt-4 text-xs text-[#A1A1AA] leading-relaxed">
              Curriculum focused on Mathematics, Physics, Chemistry, and fundamentals of Computer Science.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
