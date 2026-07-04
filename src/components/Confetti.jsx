import { useMemo } from 'react'

export default function Confetti() {
  const particles = useMemo(() => {
    const colors = ['#FF6B9D', '#C084FC', '#60A5FA', '#FFD700', '#34D399', '#FB923C', '#F472B6']
    return Array.from({ length: 60 }, (_, i) => {
      const shapes = ['square', 'circle', 'rect']
      return {
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 3,
        size: Math.random() * 8 + 4,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
      }
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        >
          {p.shape === 'circle' ? (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
            />
          ) : p.shape === 'rect' ? (
            <div
              style={{
                width: p.size,
                height: p.size * 2,
                backgroundColor: p.color,
                borderRadius: '2px',
              }}
            />
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: '2px',
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
