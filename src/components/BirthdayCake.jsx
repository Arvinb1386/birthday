export default function BirthdayCake({ candlesLit = true }) {
  return (
    <div className="flex justify-center my-6">
      <div className="relative" style={{ width: 200, height: 220 }}>
        {!candlesLit && (
          <>
            {[{ left: 81, top: 18 }, { left: 96, top: 13 }, { left: 111, top: 18 }].map((pos, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white pointer-events-none"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: 8,
                  height: 8,
                  opacity: 0,
                  animation: `smoke-rise 2.2s ease-out ${i * 0.25}s forwards`,
                }}
              />
            ))}
          </>
        )}
      <svg width="200" height="220" viewBox="0 0 200 220">
        {/* Cake base plate */}
        <ellipse cx="100" cy="210" rx="90" ry="8" fill="#8B7355" opacity="0.6" />

        {/* Bottom layer */}
        <rect x="25" y="150" width="150" height="50" rx="8" fill="#FF6B9D" />
        <rect x="25" y="150" width="150" height="12" rx="6" fill="#FF8FB4" />
        <circle cx="50" cy="175" r="4" fill="#FFD700" />
        <circle cx="80" cy="175" r="4" fill="#FFD700" />
        <circle cx="110" cy="175" r="4" fill="#FFD700" />
        <circle cx="140" cy="175" r="4" fill="#FFD700" />

        {/* Middle layer */}
        <rect x="45" y="105" width="110" height="50" rx="8" fill="#C084FC" />
        <rect x="45" y="105" width="110" height="12" rx="6" fill="#D4A5FF" />
        <circle cx="70" cy="130" r="4" fill="#FFD700" />
        <circle cx="100" cy="130" r="4" fill="#FFD700" />
        <circle cx="130" cy="130" r="4" fill="#FFD700" />

        {/* Top layer */}
        <rect x="65" y="65" width="70" height="45" rx="8" fill="#60A5FA" />
        <rect x="65" y="65" width="70" height="10" rx="6" fill="#93C5FD" />
        <circle cx="85" cy="88" r="3" fill="#FFD700" />
        <circle cx="115" cy="88" r="3" fill="#FFD700" />

        {/* Candles */}
        <rect x="82" y="40" width="5" height="28" rx="2" fill="#FFD700" />
        <rect x="97" y="35" width="5" height="33" rx="2" fill="#F472B6" />
        <rect x="112" y="40" width="5" height="28" rx="2" fill="#34D399" />

        {/* Flames - only when candles are lit */}
        {candlesLit && (
          <>
            <g style={{ animation: 'flicker 0.8s ease-in-out infinite' }}>
              <ellipse cx="84.5" cy="35" rx="5" ry="8" fill="#FFD700" />
              <ellipse cx="84.5" cy="34" rx="3" ry="5" fill="#FFF" opacity="0.7" />
            </g>
            <g style={{ animation: 'flicker 0.6s ease-in-out 0.2s infinite' }}>
              <ellipse cx="99.5" cy="30" rx="5" ry="8" fill="#FFD700" />
              <ellipse cx="99.5" cy="29" rx="3" ry="5" fill="#FFF" opacity="0.7" />
            </g>
            <g style={{ animation: 'flicker 0.7s ease-in-out 0.4s infinite' }}>
              <ellipse cx="114.5" cy="35" rx="5" ry="8" fill="#FFD700" />
              <ellipse cx="114.5" cy="34" rx="3" ry="5" fill="#FFF" opacity="0.7" />
            </g>
            {/* Glow around flames */}
            <circle cx="84.5" cy="33" r="12" fill="#FFD700" opacity="0.15" />
            <circle cx="99.5" cy="28" r="12" fill="#FFD700" opacity="0.15" />
            <circle cx="114.5" cy="33" r="12" fill="#FFD700" opacity="0.15" />
          </>
        )}

      </svg>
      </div>
    </div>
  )
}
