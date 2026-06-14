// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { projectConfig } from './config/projectConfig'
import './styles/globals.css'

// Import Components
import { AnimatedBackground } from './components/AnimatedBackground'
import { ParticleCursor } from './components/ParticleCursor'
import { TechMarquee } from './components/TechMarquee'
import { ScrollReveal } from './components/ScrollReveal'
import { GlowingCard } from './components/GlowingCard'

// Icons
const GitHubIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedInIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const InstagramIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
const SunIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const MoonIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
const ArrowIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>

// Category badge colors
const badgeColors = {
  ci: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  iac: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  container: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
  cloud: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  monitoring: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  network: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
  security: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  source: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
}

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])
  return scrolled
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Navbar() {
  const scrolled = useScrolled()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const isDark = theme === 'dark'
  
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Architect', href: '#author' }
  ]

  const githubUrl = projectConfig.social?.find(s => s.platform === 'github')?.href || '#'
  const linkedinUrl = projectConfig.social?.find(s => s.platform === 'linkedin')?.href || '#'
  const instagramUrl = projectConfig.social?.find(s => s.platform === 'instagram')?.href || '#'

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled 
        ? (isDark 
            ? 'bg-[#08060f]/95 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl' 
            : 'bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl'
          )
        : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span style={{ fontFamily: 'Syne, sans-serif' }} className={`font-bold text-base tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CI/CD Showcase
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[8px] tracking-wider text-purple-400">
                PROJECT DEMO
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ label, href }) => (
              <a key={href} href={href} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 mr-2">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'text-slate-400 hover:text-white hover:bg-purple-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                <GitHubIcon />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'text-slate-400 hover:text-white hover:bg-purple-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                <LinkedInIcon />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'text-slate-400 hover:text-white hover:bg-purple-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                <InstagramIcon />
              </a>
            </div>
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'text-slate-400 hover:text-white hover:bg-purple-600/20' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setOpen(!open)} className={`md:hidden p-2 rounded-lg ${isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className={`md:hidden pb-4 ${isDark ? 'border-t border-purple-500/20' : 'border-t border-slate-200'}`}>
            {links.map(({ label, href }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className={`block px-3 py-2 text-sm rounded-lg ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                {label}
              </a>
            ))}
            <div className="flex gap-3 pt-3 mt-1 border-t border-purple-500/20">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>GitHub</a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>LinkedIn</a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Instagram</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Section({ id, children, className = '' }) {
  const { ref, visible } = useReveal()
  return (
    <section id={id} ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </section>
  )
}

function Eyebrow({ label }) {
  return <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[10px] tracking-[0.2em] uppercase text-purple-400 mb-2">{label}</p>
}

function Page() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const currentYear = new Date().getFullYear()

  const bg = isDark ? 'bg-[#08060f]' : 'bg-slate-50'
  const bg2 = isDark ? 'bg-[#0f0c1a]' : 'bg-white'
  const border = isDark ? 'border-[#2a1f4e]' : 'border-slate-200'
  const text = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-600'
  const subtle = isDark ? 'text-slate-600' : 'text-slate-400'

  const { meta, techStack, social } = projectConfig
  const githubUrl = social?.find(s => s.platform === 'github')?.href || '#'
  const linkedinUrl = social?.find(s => s.platform === 'linkedin')?.href || '#'
  const instagramUrl = social?.find(s => s.platform === 'instagram')?.href || '#'

  // Sample tech features for GlowingCards
  const techFeatures = [
    { title: 'Jenkins CI/CD', description: 'Automated pipeline orchestration with Blue-Green deployments' },
    { title: 'Terraform IaC', description: 'Infrastructure as Code for consistent AWS provisioning' },
    { title: 'Docker Containers', description: 'Immutable container images stored in ECR' },
    { title: 'ECS Fargate', description: 'Serverless container orchestration with auto-scaling' },
  ]

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* Animated Background - Floating particles */}
      <AnimatedBackground />
      
      {/* Particle Cursor - Mouse trail effect */}
      <ParticleCursor />
      
      {/* Grid pattern background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid" />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 65%)' }} />

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6">

        {/* HERO SECTION - Project Overview */}
        <div id="home" className="pt-32 pb-16 text-center">
          <div style={{ fontFamily: 'JetBrains Mono, monospace' }} className="inline-flex items-center gap-2 border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-[11px] tracking-[0.12em] uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Production-Grade CI/CD Platform V1
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif' }} className={`font-extrabold text-[clamp(38px,7vw,68px)] leading-[1.02] tracking-tight mb-5 ${text}`}>
            CI/CD Platform<br />
            <span className="gradient-text">Showcase & Demo</span>
          </h1>

          <p className={`text-base md:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed ${muted}`}>
            Designed and implemented a production-grade cloud-native CI/CD platform using <strong className="text-purple-400">Jenkins, Terraform, Docker, Amazon ECS Fargate, ECR, ALB, CloudFront, CloudWatch, and SNS</strong>, incorporating Infrastructure as Code (IaC), CI/CD automation, Blue-Green deployments, zero-downtime releases, automated rollback, container orchestration, secure cloud-native networking, high availability architecture, auto scaling, centralized observability, real-time monitoring, and automated incident alerting for scalable and reliable application delivery on AWS.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all hover:-translate-y-0.5 shadow-[0_0_24px_rgba(124,58,237,.3)]">
              <GitHubIcon /> View Repository <ArrowIcon />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${isDark ? 'border-[#3d2d6e] text-violet-300 hover:bg-purple-600/10' : 'border-purple-300 text-purple-700 hover:bg-purple-50'}`}>
              <LinkedInIcon /> Connect on LinkedIn
            </a>
          </div>

          <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className={`text-[10px] tracking-[0.18em] uppercase mb-3 ${subtle}`}>Technology Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack?.slice(0, 16).map(tech => (
              <span key={tech.name} style={{ fontFamily: 'JetBrains Mono, monospace' }}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-transform hover:scale-105 ${badgeColors[tech.category] || badgeColors.cloud}`}>
                {tech.name}
              </span>
            ))}
          </div>

          {/* Tech Marquee - Scrolling technology bar */}
          <div className="mt-12">
            <TechMarquee />
          </div>
        </div>

        <div className={`h-px bg-gradient-to-r from-transparent via-[#2a1f4e] to-transparent my-2`} />

{/* TECH SHOWCASE SECTION - Clean & Centered */}
<ScrollReveal>
  <div className="py-14 text-center">
    <Eyebrow label="Core Technologies" />
    <h2 className={`font-extrabold text-2xl md:text-3xl tracking-tight leading-tight mb-3 ${text}`}>
      Built with Modern Cloud-Native Tools
    </h2>
    <p className={`text-sm mb-10 font-light ${muted} max-w-xl mx-auto`}>
      Each component carefully selected for production-grade reliability and performance.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
      {techFeatures.map((feature, idx) => (
        <GlowingCard key={idx} glowColor="purple">
          <div className="p-4 text-center">
            <h3 className={`font-semibold text-sm mb-2 ${text}`}>{feature.title}</h3>
            <p className={`text-xs ${muted}`}>{feature.description}</p>
          </div>
        </GlowingCard>
      ))}
    </div>
  </div>
</ScrollReveal>

<div className={`h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-2`} />

{/* TECH SHOWCASE SECTION - Clean & Centered */}
<ScrollReveal>
  <div className="py-14">
    <div className="text-center max-w-4xl mx-auto">
      <Eyebrow label="Core Technologies" />
      <h2 className={`font-extrabold text-2xl md:text-3xl tracking-tight leading-tight mb-3 ${text}`}>
        Built with Modern Cloud-Native Tools
      </h2>
      <p className={`text-sm mb-10 font-light ${muted} max-w-xl mx-auto`}>
        Each component carefully selected for production-grade reliability and performance.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
      {techFeatures.map((feature, idx) => (
        <GlowingCard key={idx} glowColor="purple">
          <div className="p-4 text-center">
            <h3 className={`font-semibold text-sm mb-2 ${text}`}>{feature.title}</h3>
            <p className={`text-xs ${muted}`}>{feature.description}</p>
          </div>
        </GlowingCard>
      ))}
    </div>
  </div>
</ScrollReveal>

<div className={`h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent my-2`} />

{/* AUTHOR SECTION - Perfectly Centered */}
<Section id="author" className="py-14">
  <div className="text-center max-w-3xl mx-auto">
    <Eyebrow label="Project Creator" />
    
    <div className={`rounded-2xl p-8 border ${bg2} ${border}`}>
      {/* Avatar - Centered */}
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white border-2 border-purple-600/40 mx-auto"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', fontFamily: 'Syne, sans-serif' }}>
          {meta.author?.split(' ').map(n => n[0]).join('') || 'AR'}
        </div>
      </div>
      
      {/* Name - Centered */}
      <p style={{ fontFamily: 'Syne, sans-serif' }} className={`font-extrabold text-2xl tracking-tight mb-1 ${text}`}>
        {meta.author || 'Ayush Rao Chaudhary'}
      </p>
      
      {/* Title - Centered */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-[12px] text-purple-400 mb-4">
        Cloud & DevOps Engineer
      </p>
      
      {/* Description - Centered */}
      <p className={`text-sm font-light leading-relaxed mb-5 ${muted} max-w-lg mx-auto`}>
        Designed and implemented this end-to-end production-grade CI/CD platform using Terraform, Jenkins, Docker, 
        ECS Fargate with Blue-Green strategy, CloudFront CDN, CloudWatch observability, and SNS alerting.
      </p>
      
      {/* Social Links - Centered */}
      <div className="flex gap-3 justify-center">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-[13px] transition-all ${isDark ? `border-[#3d2d6e] ${muted} hover:text-white hover:border-purple-600 hover:bg-purple-600/10` : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-400 hover:bg-purple-50'}`}>
          <GitHubIcon /> GitHub
        </a>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-[13px] transition-all ${isDark ? `border-[#3d2d6e] ${muted} hover:text-white hover:border-purple-600 hover:bg-purple-600/10` : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-400 hover:bg-purple-50'}`}>
          <LinkedInIcon /> LinkedIn
        </a>
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-[13px] transition-all ${isDark ? `border-[#3d2d6e] ${muted} hover:text-white hover:border-purple-600 hover:bg-purple-600/10` : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-400 hover:bg-purple-50'}`}>
          <InstagramIcon /> Instagram
        </a>
      </div>
    </div>
  </div>
</Section>

      </main>

      {/* FOOTER */}
      <footer className={`relative z-10 border-t ${border} mt-4`}>
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-600 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5"><path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="white" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }} className={`text-[11px] ${subtle}`}>CI/CD Platform Showcase — {meta.year || currentYear}</span>
          </div>
          <div className="flex gap-4">
            <a href="#home" className={`text-[11px] transition-colors ${subtle} hover:text-purple-400`}>Home</a>
            <a href="#author" className={`text-[11px] transition-colors ${subtle} hover:text-purple-400`}>Architect</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function App() {
  return <ThemeProvider><Page /></ThemeProvider>
}