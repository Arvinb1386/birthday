import { useState, useEffect } from 'react'

export default function StepButton({ text, onClick, delay = 1000, bottom = false }) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const handleClick = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(onClick, 700)
  }

  if (!visible) return null

  return (
    <div className={`fixed inset-0 z-50 flex justify-center pointer-events-none ${bottom ? 'items-end pb-14' : 'items-center'}`}>
      <button
        onClick={handleClick}
        className="pointer-events-auto group relative px-12 py-5 rounded-full font-bold text-xl text-white cursor-pointer border-2 border-white/20 outline-none overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,157,0.3), rgba(192,132,252,0.3))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(255, 107, 157, 0.3), 0 0 80px rgba(192, 132, 252, 0.15), inset 0 0 40px rgba(255,255,255,0.05)',
          animation: exiting
            ? 'button-exit 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'soft-fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards, button-breathe 3s ease-in-out 1.5s infinite',
        }}
      >
        {/* Glow ring */}
        <div
          className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #FF6B9D, #C084FC, #60A5FA, #FFD700)',
            backgroundSize: '300% 300%',
            animation: 'gradient-spin 4s ease infinite',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)',
          }}
        />

        <span className="relative z-10 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
          </svg>
          {text}
        </span>
      </button>
    </div>
  )
}
