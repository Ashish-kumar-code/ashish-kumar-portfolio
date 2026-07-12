import { useState, useEffect } from 'react'
import { useMode } from '../context/ModeContext'
import { GitPullRequest, Info, Terminal } from 'lucide-react'

export default function GithubActivity() {
  const { accent } = useMode()
  
  // States for live Github data
  const [profileStats, setProfileStats] = useState({
    repos: 14,
    followers: 1,
    following: 1,
    yearsActive: 4,
  })
  
  const [languages, setLanguages] = useState([
    { name: 'Python', percentage: 45, color: 'bg-sky-400' },
    { name: 'JavaScript', percentage: 30, color: 'bg-yellow-400' },
    { name: 'Java', percentage: 15, color: 'bg-red-400' },
    { name: 'HTML/CSS', percentage: 10, color: 'bg-indigo-400' }
  ])

  const [recentEvents, setRecentEvents] = useState([
    { type: 'PushEvent', repo: 'DOC-AI-Healthcare-Diagnosis-System', msg: 'Implement stateless JWT authorization & CNN preprocessor', date: 'Recent' },
    { type: 'PushEvent', repo: 'docstring-generator', msg: 'Create AST node visitor function definitions visitor', date: 'Recent' },
    { type: 'PushEvent', repo: 'AI-Powered-Personal-Finance-Platform', msg: 'Index transactions schema compound search', date: 'Recent' }
  ])

  useEffect(() => {
    async function fetchGithubData() {
      try {
        // 1. Fetch User Stats
        const userRes = await fetch('https://api.github.com/users/Ashish-kumar-code')
        if (userRes.ok) {
          const userData = await userRes.json()
          const createdYear = new Date(userData.created_at).getFullYear()
          const currentYear = new Date().getFullYear()
          
          setProfileStats({
            repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            yearsActive: Math.max(1, currentYear - createdYear + 1)
          })
        }

        // 2. Fetch Repos to Calculate Language Distribution
        const reposRes = await fetch('https://api.github.com/users/Ashish-kumar-code/repos?per_page=100')
        if (reposRes.ok) {
          const reposData = await reposRes.json()
          const langCounts = {}
          let totalWithLang = 0

          reposData.forEach(repo => {
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
              totalWithLang++
            }
          })

          if (totalWithLang > 0) {
            const sortedLangs = Object.keys(langCounts)
              .map(lang => {
                const pct = Math.round((langCounts[lang] / totalWithLang) * 100)
                let color = 'bg-sky-400'
                if (lang === 'JavaScript' || lang === 'TypeScript') color = 'bg-yellow-400'
                else if (lang === 'Java') color = 'bg-red-400'
                else if (lang === 'HTML' || lang === 'CSS') color = 'bg-indigo-400'
                else if (lang === 'SQL') color = 'bg-emerald-400'
                
                return {
                  name: lang,
                  percentage: pct,
                  color: color
                }
              })
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 4) // Show top 4 dominant languages

            if (sortedLangs.length > 0) {
              setLanguages(sortedLangs)
            }
          }
        }

        // 3. Fetch Recent Public Events (Commits Feed)
        const eventsRes = await fetch('https://api.github.com/users/Ashish-kumar-code/events')
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json()
          const commits = []

          for (let i = 0; i < eventsData.length && commits.length < 3; i++) {
            const event = eventsData[i]
            const repoCleanName = event.repo.name.replace('Ashish-kumar-code/', '')
            
            if (event.type === 'PushEvent' && event.payload.commits && event.payload.commits.length > 0) {
              commits.push({
                type: 'PushEvent',
                repo: repoCleanName,
                msg: event.payload.commits[0].message,
                date: new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              })
            } else if (event.type === 'CreateEvent') {
              commits.push({
                type: 'CreateEvent',
                repo: repoCleanName,
                msg: `Created repository ${repoCleanName}`,
                date: new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              })
            }
          }

          if (commits.length > 0) {
            setRecentEvents(commits)
          }
        }
      } catch (err) {
        console.warn('GitHub API rate limit exceeded or network error, falling back to static defaults:', err)
      }
    }

    fetchGithubData()
  }, [])

  return (
    <section id="github-highlights" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]">Open Source Profile</span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-1 flex items-center gap-2">
            GitHub Live Highlights
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg mt-1.5">
            A live, database-driven feed of my active coding contributions, calculated language distributions, and commit streams fetched directly from GitHub.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-6 items-stretch">
          {/* Left Column: Live Contribution Calendar */}
          <div className="bg-[#111214] border border-[#1E2024] p-6 rounded-xl flex flex-col justify-between hover:border-[#2E323A] transition duration-300">
            <div>
              <div className="text-xs font-mono text-[#A1A1AA] mb-5 flex items-center gap-1.5">
                <GitPullRequest size={12} style={{ color: accent }} />
                Real-Time Contribution Grid (Last 12 Months)
              </div>

              {/* Dynamic SVG Chart from ghchart API */}
              <div className="w-full overflow-x-auto pb-4 pt-1 select-none invert opacity-90 brightness-95 contrast-125 dark:invert-0">
                <img
                  src="https://ghchart.rshah.org/4F8CFF/Ashish-kumar-code"
                  alt="Ashish Kumar GitHub Contributions Calendar"
                  className="min-w-[620px] max-h-[95px] object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Live profile indicators */}
            <div className="flex gap-6 text-[10.5px] font-mono text-[#A1A1AA] border-t border-[#1E2024]/60 pt-4 mt-6 flex-wrap">
              <span>Public Repos: <strong className="text-white">{profileStats.repos}</strong></span>
              <span>Followers: <strong className="text-white">{profileStats.followers}</strong></span>
              <span>Following: <strong className="text-white">{profileStats.following}</strong></span>
              <span>Years Coding: <strong className="text-white">{profileStats.yearsActive} yrs</strong></span>
            </div>
          </div>

          {/* Right Column: Code Distribution & Recent Commits */}
          <div className="grid gap-6">
            
            {/* Top: Language Distribution */}
            <div className="bg-[#111214] border border-[#1E2024] p-5 rounded-xl hover:border-[#2E323A] transition duration-300">
              <div className="text-xs font-mono text-[#A1A1AA] mb-4 flex items-center gap-1.5">
                <Info size={12} style={{ color: accent }} />
                Dominant Language Distribution
              </div>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-[10px] font-mono mb-1 text-white">
                      <span>{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#0B0B0C] h-1.5 rounded overflow-hidden border border-[#1E2024]">
                      <div className={`h-full ${lang.color}`} style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Recent Activity Log */}
            <div className="bg-[#111214] border border-[#1E2024] p-5 rounded-xl hover:border-[#2E323A] transition duration-300 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-[#A1A1AA] mb-3.5 flex items-center gap-1.5">
                  <Terminal size={12} style={{ color: accent }} />
                  Recent Commit Messages
                </div>

                <div className="space-y-2.5">
                  {recentEvents.map((evt, idx) => (
                    <div key={idx} className="text-xs border-b border-[#1E2024]/40 last:border-b-0 pb-2 last:pb-0 flex flex-col gap-0.5 font-mono">
                      <div className="flex items-center justify-between text-[9px] text-[#A1A1AA]">
                        <span className="text-[#4F8CFF] font-semibold">{evt.repo}</span>
                        <span>{evt.date}</span>
                      </div>
                      <p className="text-[#A1A1AA] truncate text-[10px] mt-0.5" title={evt.msg}>
                        &gt; {evt.msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
