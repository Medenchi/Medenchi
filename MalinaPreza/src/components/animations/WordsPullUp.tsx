import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  text: string
  className?: string
  showAsterisk?: boolean
  delay?: number
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  delay = 0,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} className="overflow-hidden inline-flex mr-[0.25em]">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: delay + i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block relative"
            >
              {word}
              {showAsterisk && isLast && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                  *
                </sup>
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
