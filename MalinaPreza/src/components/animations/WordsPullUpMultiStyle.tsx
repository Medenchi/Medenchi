import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Segment {
  text: string
  className?: string
}

interface Props {
  segments: Segment[]
  containerClassName?: string
  delay?: number
}

export default function WordsPullUpMultiStyle({
  segments,
  containerClassName = '',
  delay = 0,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const allWords: { word: string; className: string }[] = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((word) => {
      allWords.push({ word, className: seg.className || '' })
    })
  })

  return (
    <span
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {allWords.map((item, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em]">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
