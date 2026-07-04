import { useState, useRef, useEffect, useCallback } from 'react'
import Stars from './components/Stars'
import Balloons from './components/Balloons'
import Confetti from './components/Confetti'
import BirthdayCake from './components/BirthdayCake'
import StepButton from './components/StepButton'
import PoemText from './components/PoemText'

export default function App() {
  const [step, setStep] = useState(0)
  const [lightsOn, setLightsOn] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [showDecorations, setShowDecorations] = useState(false)
  const [showCake, setShowCake] = useState(false)
  const [cakeVisible, setCakeVisible] = useState(false)
  const [candlesLit, setCandlesLit] = useState(true)
  const [showPoem, setShowPoem] = useState(false)
  const [cakeMoved, setCakeMoved] = useState(false)

  const birthdayAudioRef = useRef(null)
  const fadeIntervalRef = useRef(null)
  const [hasBirthday, setHasBirthday] = useState(false)

  useEffect(() => {
    const birthday = new Audio('/birthday-song.mp3')
    birthday.loop = false
    birthday.volume = 0
    birthdayAudioRef.current = birthday
    birthday.addEventListener('canplaythrough', () => setHasBirthday(true))
    birthday.load()
    return () => {
      birthday.pause()
      birthday.src = ''
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [])

  const nextStep = useCallback(() => {
    setStep((s) => s + 1)
  }, [])

  const handleLightsOn = useCallback(() => {
    setLightsOn(true)
    setTimeout(nextStep, 1500)
  }, [nextStep])

  const handleBalloons = useCallback(() => {
    setShowBalloons(true)
    setTimeout(nextStep, 1200)
  }, [nextStep])

  const handleDecorations = useCallback(() => {
    setShowDecorations(true)
    setTimeout(nextStep, 1500)
  }, [nextStep])

  const handleCake = useCallback(() => {
    setShowCake(true)
    setTimeout(nextStep, 1200)
  }, [nextStep])

  useEffect(() => {
    if (showCake) {
      const id = requestAnimationFrame(() => setCakeVisible(true))
      return () => cancelAnimationFrame(id)
    }
  }, [showCake])

  const handleBlow = useCallback(() => {
    setCandlesLit(false)

    if (birthdayAudioRef.current && hasBirthday) {
      birthdayAudioRef.current.volume = 0
      birthdayAudioRef.current.play().catch(() => {})
      fadeIntervalRef.current = setInterval(() => {
        if (!birthdayAudioRef.current) { clearInterval(fadeIntervalRef.current); return }
        if (birthdayAudioRef.current.volume < 0.6) {
          birthdayAudioRef.current.volume = Math.min(birthdayAudioRef.current.volume + 0.02, 0.6)
        } else {
          clearInterval(fadeIntervalRef.current)
        }
      }, 50)
    }

    setTimeout(() => {
      setCakeMoved(true)
      setTimeout(() => setShowPoem(true), 1200)
    }, 3000)
  }, [hasBirthday])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0"
        style={{
          background: lightsOn
            ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
            : '#000000',
          transition: 'background 3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Stars */}
      <div
        className="fixed inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: lightsOn ? 1 : 0 }}
      >
        <Stars />
      </div>

      {/* Balloons */}
      <div
        className="fixed inset-0 transition-opacity duration-[1500ms]"
        style={{ opacity: showBalloons ? 1 : 0 }}
      >
        {showBalloons && <Balloons />}
      </div>

      {/* Confetti */}
      <div
        className="fixed inset-0 transition-opacity duration-[1000ms]"
        style={{ opacity: showDecorations ? 1 : 0 }}
      >
        {showDecorations && <Confetti />}
      </div>

      {/* Content */}
      <main className="relative z-30 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12">
        {/* Title */}
        <div
          className="absolute top-8 left-0 right-0 text-center"
          style={{
            opacity: showDecorations ? 1 : 0,
            transform: showDecorations ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
            filter: showDecorations ? 'blur(0)' : 'blur(10px)',
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h1
            className="text-5xl md:text-7xl font-black text-shimmer"
            style={{
              textShadow: '0 0 40px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 107, 157, 0.3)',
            }}
          >
            تولدت مبارک!
          </h1>
        </div>

        {/* Cake */}
        {showCake && (
          <div
            style={{
              transform: cakeMoved
                ? 'translateY(-160px) scale(0.7)'
                : cakeVisible
                  ? 'translateY(0) scale(1)'
                  : 'translateY(50px) scale(0.92)',
              opacity: cakeVisible ? 1 : 0,
              transition: cakeMoved
                ? 'transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 2.5s ease'
                : 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <BirthdayCake candlesLit={candlesLit} />
          </div>
        )}

        {/* Poem */}
        <div
          className="w-full max-w-lg mx-auto"
          style={{
            opacity: showPoem ? 1 : 0,
            transform: showPoem ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            marginTop: cakeMoved ? '-120px' : '0',
          }}
        >
          {showPoem && <PoemText />}
        </div>
      </main>

      {/* Step buttons */}
      {step === 0 && <StepButton text="کلیک کن" onClick={handleLightsOn} delay={1500} />}
      {step === 1 && <StepButton text="کلیک کن" onClick={handleBalloons} delay={600} />}
      {step === 2 && <StepButton text="کلیک کن" onClick={handleDecorations} delay={600} />}
      {step === 3 && <StepButton text="کلیک کن" onClick={handleCake} delay={600} />}
      {step === 4 && candlesLit && (
        <StepButton text="شمع‌ها رو فوت کن! 🕯️" onClick={handleBlow} delay={800} bottom />
      )}
    </div>
  )
}
