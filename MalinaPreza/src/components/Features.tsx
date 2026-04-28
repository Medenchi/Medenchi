import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle'

const cards = [
  {
    type: 'video',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
    label: 'Твой холст для идей.',
  },
  {
    type: 'feature',
    number: '01',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    title: 'Умная структура.',
    items: [
      'ИИ сам строит план презентации',
      'Логичная подача материала',
      'Подходит для любого предмета',
      'Адаптация под возраст и класс',
    ],
  },
  {
    type: 'feature',
    number: '02',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    title: 'Актуальная инфа.',
    items: [
      'Поиск свежих данных из интернета',
      'Краткие и точные формулировки',
      'Источники проверены ИИ',
    ],
  },
  {
    type: 'feature',
    number: '03',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    title: 'Красивый дизайн.',
    items: [
      'Никаких скучных шаблонов',
      'Современный визуальный стиль',
      'Экспорт в PDF и PPTX',
    ],
  },
]

function FeatureCard({ card, index }: { card: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl overflow-hidden h-[400px] lg:h-full"
    >
      {card.type === 'video' ? (
        <div className="relative w-full h-full">
          <video
            src={card.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-[#E1E0CC] text-lg font-medium">{card.label}</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#212121] h-full p-6 flex flex-col justify-between">
          <div>
            <img
              src={card.icon}
              alt={card.title}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 object-cover"
            />
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-primary font-medium text-lg">
                {card.title}
              </h3>
              <span className="text-gray-600 text-sm">{card.number}</span>
            </div>
            <ul className="space-y-2">
              {card.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="flex items-center gap-1 text-primary text-sm mt-4 hover:gap-2 transition-all duration-200">
            Подробнее
            <ArrowRight
              className="w-4 h-4"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="min-h-screen bg-black py-20 px-4 md:px-6 relative">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <WordsPullUpMultiStyle
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal max-w-4xl mx-auto"
            segments={[
              {
                text: 'Не шаблонные презентации для каждого школьника.',
                className: 'text-primary',
              },
              {
                text: 'Бесплатно. Быстро. Красиво.',
                className: 'text-gray-500',
              },
            ]}
          />
        </div>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:h-[480px]">
          {cards.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
