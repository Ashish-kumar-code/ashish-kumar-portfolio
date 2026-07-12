import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ModeProvider, useMode } from './ModeContext'
import React from 'react'

function TestComponent() {
  const { isResumeOpen, resumeType, openResumeModal, closeResumeModal, mode } = useMode()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="resume-open">{isResumeOpen ? 'open' : 'closed'}</span>
      <span data-testid="resume-type">{resumeType}</span>
      <button onClick={() => openResumeModal('analyst')} data-testid="btn-open">Open Analyst</button>
      <button onClick={closeResumeModal} data-testid="btn-close">Close</button>
    </div>
  )
}

describe('ModeContext', () => {
  it('provides default values and updates state on function calls', () => {
    render(
      <ModeProvider>
        <TestComponent />
      </ModeProvider>
    )

    expect(screen.getByTestId('mode').textContent).toBe('all')
    expect(screen.getByTestId('resume-open').textContent).toBe('closed')
    expect(screen.getByTestId('resume-type').textContent).toBe('fullstack')

    act(() => {
      screen.getByTestId('btn-open').click()
    })

    expect(screen.getByTestId('resume-open').textContent).toBe('open')
    expect(screen.getByTestId('resume-type').textContent).toBe('analyst')

    act(() => {
      screen.getByTestId('btn-close').click()
    })

    expect(screen.getByTestId('resume-open').textContent).toBe('closed')
  })
})
