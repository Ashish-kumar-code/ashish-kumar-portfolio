import { useState } from 'react'
import { useMode } from '../context/ModeContext'
import { analyticsData } from '../data/content'
import { BarChart3, Play, CheckCircle } from 'lucide-react'

export default function AnalyticsDashboard() {
  const { accent, mode } = useMode()
  const [activeTab, setActiveTab] = useState('chart') // 'chart' | 'heatmap' | 'sql'
  const [hoveredBar, setHoveredBar] = useState(null)
  const [hoveredCell, setHoveredCell] = useState(null)
  
  // SQL Simulator state
  const [sqlQuery, setSqlQuery] = useState(`SELECT category, SUM(amount) AS total 
FROM transactions 
GROUP BY category 
ORDER BY total DESC;`)
  const [sqlResult, setSqlResult] = useState([
    { category: 'Rent', total: '$1,500' },
    { category: 'Food', total: '$560' },
    { category: 'Utilities', total: '$355' },
    { category: 'Others', total: '$820' },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const runMockQuery = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      if (sqlQuery.toUpperCase().includes('INDEX')) {
        setSqlResult([
          { status: 'Index Created Successfully', response_time: '0.002s (was 0.054s)' },
          { index_name: 'idx_transactions_user_date', columns: 'user_id, date' }
        ])
      } else if (sqlQuery.toUpperCase().includes('AVG') || sqlQuery.toUpperCase().includes('MEAN')) {
        setSqlResult([
          { average_transaction: '$142.30', count: '1,042 rows' }
        ])
      } else {
        setSqlResult([
          { category: 'Rent', total: '$1,500' },
          { category: 'Food', total: '$560' },
          { category: 'Utilities', total: '$355' },
          { category: 'Others', total: '$820' },
        ])
      }
    }, 600)
  }

  const isDimmed = mode === 'dev'

  return (
    <section 
      id="analytics" 
      className={`py-16 border-t border-[#1E2024] transition-opacity duration-500 ${
        isDimmed ? 'opacity-35 blur-[0.4px]' : 'opacity-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <BarChart3 size={24} style={{ color: accent }} />
            Data Analytics Dashboard
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            Interactive analytical charts and SQL console demonstrating hands-on exploratory data analysis (EDA) and pipeline construction.
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analyticsData.kpis.map((kpi, idx) => (
            <div key={idx} className="bg-[#111214] border border-[#1E2024] p-4.5 rounded-xl hover:border-[#2E323A] transition">
              <div className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wide">{kpi.title}</div>
              <div className="text-lg md:text-xl font-bold text-white mt-1.5 font-display">{kpi.value}</div>
              <div className="text-[10px] text-[#A1A1AA] mt-1">{kpi.desc}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Shell */}
        <div className="bg-[#111214] border border-[#1E2024] rounded-xl overflow-hidden shadow-xl">
          {/* Header Controls */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E2024] bg-[#0E0E10] flex-wrap gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#A1A1AA]">dataset_engine: active</span>
            </div>
            
            <div className="flex bg-[#0B0B0C] border border-[#1E2024] rounded-lg p-[3px] gap-0.5">
              <button
                onClick={() => setActiveTab('chart')}
                className={`text-[10px] font-mono px-3 py-1 rounded transition ${
                  activeTab === 'chart' ? 'bg-[#1E2024] text-white' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Monthly Aggregates (SVG)
              </button>
              <button
                onClick={() => setActiveTab('heatmap')}
                className={`text-[10px] font-mono px-3 py-1 rounded transition ${
                  activeTab === 'heatmap' ? 'bg-[#1E2024] text-white' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Correlation Heatmap
              </button>
              <button
                onClick={() => setActiveTab('sql')}
                className={`text-[10px] font-mono px-3 py-1 rounded transition ${
                  activeTab === 'sql' ? 'bg-[#1E2024] text-white' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                SQL Query Console
              </button>
            </div>
          </div>

          {/* Interactive Screen Panel */}
          <div className="p-6 min-h-[300px] flex items-center justify-center bg-[#111214]">
            {activeTab === 'chart' && (
              <div className="w-full flex flex-col items-center">
                <div className="text-[11px] font-mono text-[#A1A1AA] mb-4">
                  Visualizing Category Expenditures &bull; Hover on bars to inspect parameters
                </div>
                
                {/* SVG Bar Chart */}
                <div className="relative w-full max-w-xl h-44 flex items-end justify-between border-b border-l border-[#1E2024] px-4 pb-1">
                  {analyticsData.edaCharts.monthlySpend.map((d, i) => {
                    const total = d.food + d.rent + d.utilities + d.others
                    const pct = (total / 1000) * 100 // max total around 1000
                    return (
                      <div 
                        key={i} 
                        className="flex-1 flex flex-col items-center group relative cursor-pointer mx-2"
                        onMouseEnter={() => setHoveredBar(d)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Bar */}
                        <div 
                          className="w-8 sm:w-12 rounded-t transition-all duration-300"
                          style={{ 
                            height: `${pct}px`, 
                            background: `linear-gradient(to top, ${accent}, rgba(79, 140, 255, 0.4))` 
                          }}
                        />
                        <span className="text-[9px] font-mono text-[#A1A1AA] mt-1.5">{d.month}</span>
                      </div>
                    )
                  })}

                  {/* Hover Tooltip inside SVG Area */}
                  {hoveredBar && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#0B0B0C] border border-[#1E2024] p-3 rounded-lg text-[9.5px] font-mono shadow-xl z-20 text-[#A1A1AA] min-w-[130px]">
                      <div className="text-white font-bold mb-1 border-b border-[#1E2024] pb-1">{hoveredBar.month} Breakdown</div>
                      <div className="flex justify-between mt-1"><span>Rent:</span><span className="text-white">${hoveredBar.rent}</span></div>
                      <div className="flex justify-between"><span>Food:</span><span className="text-white">${hoveredBar.food}</span></div>
                      <div className="flex justify-between"><span>Utilities:</span><span className="text-white">${hoveredBar.utilities}</span></div>
                      <div className="flex justify-between"><span>Others:</span><span className="text-white">${hoveredBar.others}</span></div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'heatmap' && (
              <div className="w-full flex flex-col items-center">
                <div className="text-[11px] font-mono text-[#A1A1AA] mb-6">
                  Pearson Correlation Matrix &bull; Medical Insurance Features
                </div>

                <div className="grid grid-cols-4 gap-1.5 w-full max-w-sm font-mono text-[9px] text-center">
                  {/* Heatmap header cells */}
                  <div className="h-6 flex items-center justify-center text-[#A1A1AA]">Features</div>
                  <div className="h-6 flex items-center justify-center text-white">Age</div>
                  <div className="h-6 flex items-center justify-center text-white">Premium</div>
                  <div className="h-6 flex items-center justify-center text-white">BMI</div>

                  {/* Matrix row 1 */}
                  <div className="h-10 flex items-center justify-start text-white pl-2">Age</div>
                  <div className="h-10 flex items-center justify-center bg-[#FF9F43]/80 text-[#0B0B0C] font-bold">1.00</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/60 text-[#0B0B0C] font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('Age-Premium: 0.85')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.85</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/40 text-white font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('Age-BMI: 0.62')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.62</div>

                  {/* Matrix row 2 */}
                  <div className="h-10 flex items-center justify-start text-white pl-2">Premium</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/60 text-[#0B0B0C] font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('Age-Premium: 0.85')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.85</div>
                  <div className="h-10 flex items-center justify-center bg-[#FF9F43]/80 text-[#0B0B0C] font-bold">1.00</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/50 text-[#0B0B0C] font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('BMI-Premium: 0.74')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.74</div>

                  {/* Matrix row 3 */}
                  <div className="h-10 flex items-center justify-start text-white pl-2">BMI</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/40 text-white font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('Age-BMI: 0.62')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.62</div>
                  <div 
                    className="h-10 flex items-center justify-center bg-[#FF9F43]/50 text-[#0B0B0C] font-bold cursor-pointer hover:scale-95 transition"
                    onMouseEnter={() => setHoveredCell('BMI-Premium: 0.74')}
                    onMouseLeave={() => setHoveredCell(null)}
                  >0.74</div>
                  <div className="h-10 flex items-center justify-center bg-[#FF9F43]/80 text-[#0B0B0C] font-bold">1.00</div>
                </div>

                {hoveredCell && (
                  <div className="mt-4 text-xs font-mono text-white flex items-center gap-1.5 bg-[#0B0B0C] border border-[#1E2024] px-3 py-1.5 rounded-full">
                    <CheckCircle size={12} className="text-emerald-400" />
                    {hoveredCell}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sql' && (
              <div className="w-full grid md:grid-cols-2 gap-4 items-stretch font-mono text-xs">
                {/* Query Input */}
                <div className="flex flex-col border border-[#1E2024] rounded-lg overflow-hidden bg-[#0B0B0C]">
                  <div className="bg-[#0E0E10] px-3 py-2 border-b border-[#1E2024] text-[9.5px] text-[#A1A1AA] flex justify-between items-center">
                    <span>SQLite Sandbox Console</span>
                    <span className="text-white hover:underline cursor-pointer" onClick={() => setSqlQuery(`CREATE INDEX idx_transactions_user_date \nON transactions(user_id, date);`)}>Index Query</span>
                  </div>
                  <textarea
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="flex-1 p-3 bg-transparent text-[#D4D4D4] outline-none resize-none min-h-[110px]"
                  />
                  <div className="p-2 bg-[#0E0E10] border-t border-[#1E2024] flex justify-end">
                    <button
                      onClick={runMockQuery}
                      disabled={isRunning}
                      className="flex items-center gap-1 bg-[#1E2024] border border-[#2E323A] text-white hover:bg-[#2E323A] transition px-3 py-1.5 rounded-md font-semibold text-[10px]"
                    >
                      <Play size={10} className="fill-current text-white" />
                      {isRunning ? 'Running...' : 'Run Query'}
                    </button>
                  </div>
                </div>

                {/* Query Output Result Table */}
                <div className="border border-[#1E2024] rounded-lg overflow-hidden flex flex-col bg-[#0B0B0C]">
                  <div className="bg-[#0E0E10] px-3 py-2 border-b border-[#1E2024] text-[9.5px] text-[#A1A1AA]">
                    QueryResult Table ({sqlResult.length} rows)
                  </div>
                  <div className="flex-1 p-3 overflow-auto">
                    {isRunning ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-[#A1A1AA] text-[10px]">
                        <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-current animate-spin" />
                        Fetching rows...
                      </div>
                    ) : (
                      <table className="w-full text-left text-[10px] text-[#A1A1AA] border-collapse">
                        <thead>
                          <tr className="border-b border-[#1E2024]">
                            {Object.keys(sqlResult[0] || {}).map((k) => (
                              <th key={k} className="pb-1.5 font-bold uppercase tracking-wider text-white pr-2">
                                {k}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sqlResult.map((row, idx) => (
                            <tr key={idx} className="border-b border-[#1E2024]/50 last:border-b-0">
                              {Object.values(row).map((val, colIdx) => (
                                <td key={colIdx} className="py-2 pr-2 font-mono text-white truncate max-w-[120px]">
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
