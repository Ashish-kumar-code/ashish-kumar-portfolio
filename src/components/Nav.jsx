import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const { accent } = useMode()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#analytics', label: 'Analytics' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0C]/80 backdrop-blur-md border-b border-[#1E2024] relative">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-bold text-lg tracking-tight text-white hover:opacity-90 transition">
          ASHISH
          <span 
            className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 animate-pulse-dot" 
            style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} 
          />
          <span className="text-xs font-mono font-normal text-[#A1A1AA] ml-2 hidden sm:inline-block">
            portfolio.v1
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-6 text-sm text-[#A1A1AA] font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="hover:text-white transition animated-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg border border-[#1E2024] bg-[#0E0E10] text-[#A1A1AA] hover:text-white hover:bg-[#111214] transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-[#1E2024] bg-[#0B0B0C]/95 backdrop-blur-md overflow-hidden absolute top-[100%] left-0 w-full z-40"
          >
            <div className="flex flex-col gap-4 p-6 font-medium text-sm text-[#A1A1AA]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white py-1 transition border-b border-[#1E2024]/30 last:border-b-0 pb-2 last:pb-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
