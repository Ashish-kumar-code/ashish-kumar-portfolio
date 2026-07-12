/* eslint-disable react/only-export-components */
import { createContext, useContext, useState } from 'react'

const ModeContext = createContext(null)

export function ModeProvider({ children }) {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [resumeType, setResumeType] = useState('fullstack') // 'fullstack' | 'analyst'

  const openResumeModal = (type) => {
    setResumeType(type)
    setIsResumeOpen(true)
  }

  const closeResumeModal = () => {
    setIsResumeOpen(false)
  }

  // Lock the mode to unified 'all' view with static premium theme styling
  const mode = 'all'
  const isDev = false
  const isData = false
  const isAll = true
  const accent = 'var(--color-accent)'
  const accentDim = 'rgba(79, 140, 255, 0.15)'

  return (
    <ModeContext.Provider 
      value={{ 
        mode, isDev, isData, isAll, accent, accentDim,
        isResumeOpen, resumeType, openResumeModal, closeResumeModal
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within a ModeProvider')
  return ctx
}



