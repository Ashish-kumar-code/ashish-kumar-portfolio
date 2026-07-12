import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { X, Mail, CheckCircle, FileText, Send } from 'lucide-react'

export default function ResumeModal() {
  const { isResumeOpen, resumeType, closeResumeModal, accent } = useMode()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setErrorMsg('')

    try {
      const response = await fetch('/api/request-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name || 'Anonymous Recruiter',
          email: email,
          company_name: company || 'Student / Personal',
          resume_type: resumeType
        })
      })

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`)
      }

      setLoading(false)
      setSubmitted(true)

      // Reset state after success view
      setTimeout(() => {
        setSubmitted(false)
        setName('')
        setEmail('')
        setCompany('')
        closeResumeModal()
      }, 4500)

    } catch (err) {
      console.error('Failed to log resume request:', err)
      setErrorMsg('Failed to submit request. Please try again.')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isResumeOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0C]/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#111214] border border-[#1E2024] rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2024] bg-[#0E0E10]">
              <div className="flex items-center gap-2">
                <FileText size={14} style={{ color: accent }} />
                <span className="font-mono text-xs text-[#A1A1AA]">
                  {resumeType === 'fullstack' ? 'get_fullstack_cv.exe' : 'get_analyst_cv.exe'}
                </span>
              </div>
              <button
                onClick={closeResumeModal}
                className="text-[#A1A1AA] hover:text-white p-1.5 rounded hover:bg-[#1E2024] transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {submitted ? (
                // Success State View
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center space-y-3.5"
                >
                  <CheckCircle size={44} className="text-emerald-400" />
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      Request Pending Approval
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed max-w-[280px] mx-auto">
                      Your request has been registered. An approval link has been sent to Ashish. Once approved, the resume will be sent directly to your inbox.
                    </p>
                  </div>
                </motion.div>
              ) : (
                // Form Entry View
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-white text-base">
                      Request Resume Download
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1.5 leading-relaxed">
                      Enter your work email below to unlock immediate access to my targeted {resumeType === 'fullstack' ? 'Full Stack Developer' : 'Data Analyst'} resume.
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {/* Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Your Name"
                        className="bg-[#0B0B0C] border border-[#1E2024] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A1A1AA]/30 outline-none focus:border-[#4F8CFF] transition"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase">Work Email *</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@gmail.com"
                          className="w-full bg-[#0B0B0C] border border-[#1E2024] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#A1A1AA]/30 outline-none focus:border-[#4F8CFF] transition"
                        />
                        <Mail size={12} className="absolute left-3 top-3.5 text-[#A1A1AA]/50" />
                      </div>
                    </div>

                    {/* Company input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-[#A1A1AA] uppercase">Company</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Infosys, Innobyte"
                        className="bg-[#0B0B0C] border border-[#1E2024] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#A1A1AA]/30 outline-none focus:border-[#4F8CFF] transition"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-[11px] font-mono text-red-400 mt-2 text-center bg-red-400/5 border border-red-500/10 rounded-lg py-2">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold bg-white text-[#0B0B0C] hover:bg-white/95 transition active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-[#0B0B0C] animate-spin" />
                    ) : (
                      <>
                        <Send size={12} />
                        Unlock & Download
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
