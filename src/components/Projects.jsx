import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '../context/ModeContext'
import { projects } from '../data/content'
import { ChevronDown, ChevronUp, Layers, Play } from 'lucide-react'
import { Github } from './SocialIcons'

// Sub-component to render interactive custom system architecture diagrams in SVG format
function ArchitectureDiagram({ project }) {
  const { accent } = useMode()
  const arch = project.architecture

  if (!arch) return null

  // 1. Api-Flow (Doc-AI Healthcare)
  if (arch.type === 'api-flow') {
    return (
      <div className="w-full bg-[#0B0B0C] border border-[#1E2024] rounded-lg p-4 font-mono text-[10px] text-[#A1A1AA] overflow-x-auto my-3">
        <div className="text-[11px] font-bold text-white mb-3 flex items-center gap-1.5">
          <Layers size={12} style={{ color: accent }} />
          System Architecture Flow
        </div>
        <div className="min-w-[420px] flex items-center justify-between gap-2 py-2 px-1">
          {arch.nodes.map((node, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex-1 bg-[#111214] border border-[#1E2024] p-2 rounded text-center hover:border-[#2E323A] transition">
                <div className="font-bold text-white mb-0.5 text-[10px]">{node.label}</div>
                <div className="text-[8px] text-[#A1A1AA]">{node.desc}</div>
              </div>
              {i < arch.nodes.length - 1 && (
                <div className="w-6 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-[#4F8CFF]">&rarr;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 2. Db-Schema (Personal Finance Manager)
  if (arch.type === 'db-schema') {
    return (
      <div className="w-full bg-[#0B0B0C] border border-[#1E2024] rounded-lg p-4 font-mono text-[10px] text-[#A1A1AA] overflow-x-auto my-3">
        <div className="text-[11px] font-bold text-white mb-3 flex items-center gap-1.5">
          <Layers size={12} style={{ color: accent }} />
          SQLite Database Schema (3NF)
        </div>
        <div className="min-w-[460px] grid grid-cols-4 gap-2.5 py-1">
          {arch.nodes.map((node, i) => (
            <div key={i} className="bg-[#111214] border border-[#1E2024] rounded p-2 hover:border-[#2E323A] transition">
              <div className="font-bold text-white border-b border-[#1E2024] pb-1.5 mb-1.5 text-[9.5px] truncate">{node.label}</div>
              <div className="text-[8px] text-[#A1A1AA] leading-relaxed">
                {node.desc.split(', ').map((col, idx) => (
                  <div key={idx} className="truncate">
                    &bull; {col}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 3. AST Flow (Docstring Generator)
  if (arch.type === 'compiler-ast') {
    return (
      <div className="w-full bg-[#0B0B0C] border border-[#1E2024] rounded-lg p-4 font-mono text-[10px] text-[#A1A1AA] overflow-x-auto my-3">
        <div className="text-[11px] font-bold text-white mb-3 flex items-center gap-1.5">
          <Layers size={12} style={{ color: accent }} />
          AST Parsing & Compilation Pipeline
        </div>
        <div className="min-w-[420px] flex items-center justify-between gap-2 py-2 px-1">
          {arch.nodes.map((node, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex-1 bg-[#111214] border border-[#1E2024] p-2 rounded text-center hover:border-[#2E323A] transition">
                <div className="font-bold text-white mb-0.5 text-[10px]">{node.label}</div>
                <div className="text-[8px] text-[#A1A1AA]">{node.desc}</div>
              </div>
              {i < arch.nodes.length - 1 && (
                <div className="w-6 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-[#4F8CFF]">&rarr;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Fallback simple grid representation
  return (
    <div className="w-full bg-[#0B0B0C] border border-[#1E2024] rounded-lg p-4 font-mono text-[10px] text-[#A1A1AA] my-3">
      <div className="text-[11px] font-bold text-white mb-3 flex items-center gap-1.5">
        <Layers size={12} style={{ color: accent }} />
        Architecture Breakdown
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {arch.nodes.map((node, i) => (
          <div key={i} className="bg-[#111214] border border-[#1E2024] p-2 rounded">
            <div className="font-bold text-white mb-0.5">{node.label}</div>
            <div className="text-[9px] text-[#A1A1AA]">{node.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}



function ProjectRow({ project, index }) {
  const { accent, accentDim } = useMode()
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 1

  return (
    <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-stretch border-b border-[#1E2024] py-12 last:border-b-0">
      
      {/* Visual Mockup column (alternates order on desktop) */}
      <div className={`flex items-center justify-center ${isEven ? 'md:order-2' : ''}`}>
        <div className="w-full h-56 sm:h-64 bg-[#111214] border border-[#1E2024] rounded-xl p-3.5 flex items-center justify-center relative overflow-hidden group hover:border-[#2E323A] transition duration-300">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover rounded-lg border border-[#1E2024]"
          />
          {/* Subtle accent corner overlay */}
          <div 
            className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-10 transition duration-300 pointer-events-none" 
            style={{ 
              background: `linear-gradient(to bottom left, ${accent}, transparent)`,
              clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
            }}
          />
        </div>
      </div>

      {/* Description Content column */}
      <div className="flex flex-col justify-center space-y-4">
        <div>
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <span className="text-[10px] font-mono text-[#A1A1AA]">Project {index + 1}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E2024]" />
            <span 
              className="text-[10px] font-mono border rounded px-2 py-0.5 font-semibold"
              style={{ 
                borderColor: accentDim, 
                color: accent,
                backgroundColor: 'rgba(79, 140, 255, 0.02)'
              }}
            >
              {project.subtitle}
            </span>
          </div>
          
          <h3 className="font-display font-bold text-xl md:text-2xl text-white">
            {project.title}
          </h3>
        </div>

        {/* First bullet point as preview text */}
        <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
          {project.bullets[0]}
        </p>

        {/* Tech Stack Chip List */}
        <div className="flex flex-wrap gap-1.5 py-1">
          {project.stack.map((s) => (
            <span key={s} className="text-[10px] font-mono bg-[#0B0B0C] border border-[#1E2024] text-[#A1A1AA] px-2 py-1 rounded">
              {s}
            </span>
          ))}
        </div>

        {/* Action Link Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1E2024]/50">
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition font-medium"
            >
              <Github size={14} />
              GitHub Code
            </a>
            {project.liveDemo !== '#' && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition font-medium"
              >
                <Play size={12} />
                Live Demo
              </a>
            )}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition font-medium border border-[#1E2024] rounded-lg px-3 py-1.5 bg-[#0E0E10]"
          >
            {expanded ? (
              <>
                Hide Details
                <ChevronUp size={12} />
              </>
            ) : (
              <>
                Project Details
                <ChevronDown size={12} />
              </>
            )}
          </button>
        </div>

        {/* Expanded Case Study details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4 border-t border-[#1E2024] mt-2">
                <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                  <div>
                    <h4 className="text-[9px] font-mono text-[#A1A1AA] uppercase tracking-wide mb-0.5">
                      Role / Track
                    </h4>
                    <p className="text-white font-medium">{project.role}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] font-mono text-[#A1A1AA] uppercase tracking-wide mb-0.5">
                      Target Performance Metrics
                    </h4>
                    <p className="text-white font-medium" style={{ color: accent }}>
                      {project.metrics.left} &bull; {project.metrics.right}
                    </p>
                  </div>
                </div>

                {/* Bullets List (excluding first bullet which is already shown in preview) */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-mono text-[#A1A1AA] uppercase tracking-wide mb-1.5">
                    Engineering Breakdown & Results
                  </h4>
                  <ul className="space-y-3.5 pl-1">
                    {project.bullets.slice(1).map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        <span className="text-[#4F8CFF] font-bold mt-0.5">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Render Custom SVG Architecture Diagrams */}
                <ArchitectureDiagram project={project} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 border-t border-[#1E2024]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
            Featured Projects
          </h2>
          <p className="text-sm text-[#A1A1AA] max-w-lg">
            A showcase of my recent work demonstrating software engineering capability, relational schema design, and applied AI modules.
          </p>
        </div>

        <div className="flex flex-col">
          {projects.map((p, idx) => (
            <ProjectRow key={p.id} project={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
