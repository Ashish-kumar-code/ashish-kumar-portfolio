import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ModeProvider } from '../context/ModeContext'
import AnalyticsDashboard from './AnalyticsDashboard'
import React from 'react'

describe('AnalyticsDashboard Component', () => {
  it('renders title and allows switching tabs', async () => {
    render(
      <ModeProvider>
        <AnalyticsDashboard />
      </ModeProvider>
    )

    expect(screen.getByText('Data Analytics Dashboard')).toBeDefined()

    // Default tab is "Monthly Aggregates (SVG)"
    expect(screen.getByText('Visualizing Category Expenditures • Hover on bars to inspect parameters')).toBeDefined()

    // Switch to Correlation Heatmap
    const heatmapTabButton = screen.getByText('Correlation Heatmap')
    await act(async () => {
      fireEvent.click(heatmapTabButton)
    })
    expect(screen.getByText('Pearson Correlation Matrix • Medical Insurance Features')).toBeDefined()

    // Switch to SQL Query Console
    const sqlTabButton = screen.getByText('SQL Query Console')
    await act(async () => {
      fireEvent.click(sqlTabButton)
    })
    expect(screen.getByText('SQLite Sandbox Console')).toBeDefined()
  })

  it('runs mock SQL query', async () => {
    vi.useFakeTimers()
    render(
      <ModeProvider>
        <AnalyticsDashboard />
      </ModeProvider>
    )

    const sqlTabButton = screen.getByText('SQL Query Console')
    await act(async () => {
      fireEvent.click(sqlTabButton)
    })

    const runButton = screen.getByText('Run Query')
    expect(runButton).toBeDefined()

    await act(async () => {
      fireEvent.click(runButton)
    })

    expect(screen.getByText('Fetching rows...')).toBeDefined()

    await act(async () => {
      vi.advanceTimersByTime(600)
    })

    expect(screen.queryByText('Fetching rows...')).toBeNull()
    expect(screen.getByText('QueryResult Table (4 rows)')).toBeDefined()

    vi.useRealTimers()
  })
})
