import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import WordsPullUpMultiStyle from './animations/WordsPullUpMultiStyle'

function AnimatedLetter({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: any
}) {
  const charProgress = index / total
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  )
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

const bodyText =
  'MalinaPreza от школьника, для школьников. ' +
  'Наш ИИ находит актуальную информацию, структурирует её и оформляет ' +
  'в красивые слайды. без шаблонных ИИ през. Полностью бесплатно для всех школьников мира. ' +
  'Просто введи тему — и получи готовую презентацию за минуты.'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = bodyText.split('')

  return (
    <section id="about" className="bg-black py-20 px-4 md:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-3xl p-8 md:p-16 text-center">
          
          {/* Лейбл */}
          <p className="text-primary text-[10px] sm:text-xs mb-6 tracking-widest uppercase">
            Для школьников
          </p>

          {/* Заголовок */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Презентации,',
                  className: 'font-normal text-primary',
                },
                {
                  text: 'которые удивляют.',
                  className: 'font-serif italic text-primary',
                },
                {
                  text: 'Созданные ИИ за минуты.',
                  className: 'font-normal text-primary',
                },
              ]}
            />
          </h2>

          {/* Анимированный текст */}
          <p
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto"
            style={{ color: '#DEDBC8', lineHeight: 1.7 }}
          >
            {chars.map((char, i) => (
              <AnimatedLetter
                key={i}
                char={char}
                index={i}
                total={chars.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
