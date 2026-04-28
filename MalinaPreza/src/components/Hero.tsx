import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import WordsPullUp from './animations/WordsPullUp'

const NAV_ITEMS = [
  { label: 'О проекте', href: '#about' },
  { label: 'Возможности', href: '#features' },
  { label: 'Как это работает', href: '#how' },
  { label: 'Примеры', href: '#examples' },
  { label: 'Войти', href: '/login' },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        
        {/* Фоновое видео */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Шум поверх видео */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay" />

        {/* Градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Навбар */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#E1E0CC')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        'rgba(225, 224, 204, 0.8)')
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Контент внизу */}
        <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end p-6 md:p-10">
          
          {/* Заголовок — 8 колонок */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.07em]"
              style={{
                fontSize: 'clamp(80px, 20vw, 320px)',
                color: '#E1E0CC',
              }}
            >
              <WordsPullUp
                text="MalinaPreza"
                showAsterisk={false}
              />
            </h1>
          </div>

          {/* Описание + кнопка — 4 колонки */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 pb-2 lg:pb-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
            >
              MalinaPreza — бесплатный сервис для школьников. 
              Создавай красивые, информативные презентации 
              с помощью ИИ за считанные минуты. 
              Никаких скучных шаблонов.
            </motion.p>

            <motion.a
              href="/register"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
              className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-primary rounded-full pl-5 pr-1 py-1 w-fit"
            >
              <span className="text-black font-medium text-sm sm:text-base">
                Начать бесплатно
              </span>
              <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 text-primary" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
