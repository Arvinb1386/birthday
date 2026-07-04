import { useMemo } from 'react'

export default function Balloons() {
  const balloons = useMemo(() => {
    const colors = ['#FF6B9D', '#C084FC', '#60A5FA', '#FFD700', '#34D399', '#FB923C', '#F472B6', '#A78BFA']
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      size: Math.random() * 20 + 50,
      swayDuration: Math.random() * 3 + 2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-0"
          style={{
            left: `${b.x}%`,
            animation: `float-up ${b.duration}s linear ${b.delay}s infinite, sway ${b.swayDuration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <svg width={b.size} height={b.size * 1.4} viewBox="0 0 60 84">
            <defs>
              <radialGradient id={`bg-${b.id}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor={b.color} />
              </radialGradient>
            </defs>
            <ellipse cx="30" cy="32" rx="26" ry="30" fill={`url(#bg-${b.id})`} />
            <polygon points="30,62 26,68 34,68" fill={b.color} />
            <line x1="30" y1="68" x2="30" y2="84" stroke={b.color} strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  )
}
