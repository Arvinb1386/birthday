import { useState, useEffect, useCallback } from 'react'

const poemLines = [
  { text: 'امروز...' },
  { text: 'مثل هر روز دیگه‌ای قشنگه' },
  { text: 'اما یه تفاوت داره...' },
  { text: 'یه سال دیگه از زندگیت گذشت' },
  { text: 'انگار توی یه چشم به هم زدن' },

  { text: 'ولی می‌دونی چیه؟', special: true },

  { text: 'امروز یه روز خاصه' },
  { text: 'یه روز که فقط به تو تعلق داره' },
  { text: 'برای همین...' },
  { text: 'بیا بهترین جشن ممکن رو بگیریم' },

  { text: 'و بذار یه ذره از خوشحالی‌هام رو باهات قسمت کنم...' },

  { text: 'من همه اینا رو آماده کردم' },
  { text: 'تا یه هدیه کوچیک برای روز تولدت باشه' },

  { text: 'ممنونم که توی زندگیم هستی' },
  { text: 'ممنونم بابت دوستیمون' },
  { text: 'و ممنونم بابت تمام لحظه‌های خوبی که ساختیم' },

  { text: 'از ته دل آرزو می‌کنم' },
  { text: 'بهترین اتفاق‌ها برات رقم بخوره' },
  { text: 'و زندگیت پر از آرامش و شادی باشه' },
  { text: 'و همه آرزوهات یکی یکی به حقیقت تبدیل بشن' },

  { text: 'یادت باشه...', special: true },

  { text: 'هیچ‌وقت از دنبال کردن رویاهات دست نکش' },
  { text: 'تو آزادی...' },
  { text: 'مثل پرنده‌ای که توی آسمون آبی پرواز می‌کنه' },

  { text: 'از اینجا به بعد...' },
  { text: 'فصل تازه‌ای از زندگیت شروع میشه' },
  { text: 'و داستان واقعی زندگیت تازه داره شکل می‌گیره' },

  { text: 'اما...', special: true },

  { text: 'نگران هیچ‌چیزی نباش' },

  { text: 'چون...', special: true },

  { text: 'خدا همیشه پشتته' },

  { text: 'و مطمئنم' },
  { text: 'امسال از سال قبل قشنگ‌تر میشه' },

  { text: 'امیدوارم' },
  { text: 'توی مسیر زندگیت، خوشبختی رو پیدا کنی' },

  { text: 'همیشه لبخندت رو حفظ کن' },

  { text: 'از تک‌تک لحظه‌های امروز لذت ببر' },
  { text: 'و با قشنگ‌ترین لبخندت پرش کن' },
  { text: 'تا به یکی از بهترین خاطره‌هات تبدیل بشه' },

  { text: 'و در آخر...' },

  { text: 'فقط می‌خوام یه بار دیگه بهت بگم' },

  { text: 'تولدت مبارک دوست عزیزم ❤️', final: true },
]

const LINE_VISIBLE = 2000
const FADE_MS = 500

function PoemLine({ text, special, final }) {
  const [state, setState] = useState('entering')

  useEffect(() => {
    const t1 = setTimeout(() => setState('visible'), 20)
    if (!final) {
      const t2 = setTimeout(() => setState('exiting'), LINE_VISIBLE)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    return () => clearTimeout(t1)
  }, [final])

  const style = {
    transition: `opacity ${FADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${FADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${FADE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    opacity: state === 'visible' ? 1 : 0,
    transform: state === 'visible'
      ? 'translateY(0) scale(1)'
      : state === 'entering'
        ? 'translateY(25px) scale(0.92)'
        : 'translateY(-25px) scale(0.95)',
    filter: state === 'visible' ? 'blur(0px)' : 'blur(6px)',
  }

  const cls = final
    ? 'text-3xl md:text-5xl font-black'
    : special
      ? 'text-xl md:text-2xl font-bold italic'
      : 'text-lg md:text-xl'

  const clr = final ? '#FFD700' : special ? '#FFD700' : 'rgba(255,255,255,0.9)'

  return (
    <p
      className={`text-center leading-relaxed ${cls}`}
      style={{
        ...style,
        color: clr,
        textShadow: final ? '0 0 30px rgba(255, 215, 0, 0.5)' : undefined,
      }}
    >
      {text}
    </p>
  )
}

export default function PoemText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showReplay, setShowReplay] = useState(false)

  const handleReplay = useCallback(() => {
    setFinished(false)
    setShowReplay(false)
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    if (currentIndex >= poemLines.length) return
    const line = poemLines[currentIndex]
    if (line.final) {
      const t1 = setTimeout(() => setFinished(true), 1500)
      const t2 = setTimeout(() => setShowReplay(true), 3500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }

    const timer = setTimeout(() => {
      setCurrentIndex((i) => i + 1)
    }, LINE_VISIBLE + FADE_MS)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const line = poemLines[currentIndex]
  if (!line) return null

  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 min-h-[80px] max-h-[50vh] overflow-y-auto">
      <PoemLine
        key={currentIndex}
        text={line.text}
        special={line.special}
        final={line.final}
      />
      {finished && (
        <p
          className="text-sm text-white/40 mt-6"
          style={{ animation: 'soft-fade-in 1.5s ease-out forwards' }}
        >
          از طرف آروین
        </p>
      )}
      {showReplay && (
        <button
          onClick={handleReplay}
          className="mt-8 text-xs text-white/30 hover:text-white/60 active:text-white/60 transition-colors duration-300 border border-white/10 hover:border-white/25 px-4 py-2 rounded-full"
          style={{ animation: 'soft-fade-in 1.5s ease-out forwards' }}
        >
          از اول ببین
        </button>
      )}
    </div>
  )
}
