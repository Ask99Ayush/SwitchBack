import { ReactNode } from 'react'

interface GlowingCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowingCard({ children, className = '', glowColor = 'purple' }: GlowingCardProps) {
  const glowColors = {
    purple: 'group-hover:shadow-purple-500/30',
    blue: 'group-hover:shadow-blue-500/30',
    emerald: 'group-hover:shadow-emerald-500/30',
  }

  return (
    <div
      className={`group relative transition-all duration-500 hover:-translate-y-2 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r from-${glowColor}-600 to-${glowColor}-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
      <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden ${glowColors[glowColor as keyof typeof glowColors]}`}>
        {children}
      </div>
    </div>
  )
}