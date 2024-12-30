export const scaleUpVarient = {
  hidden: { scale: 0.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
}

export const leftToRightVarient = {
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

export const rightToLeftVarient = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
}

export const bottomToTopParentVarient = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      staggerChildren: 0.25,
    },
  },
}

export const bottomToTopVarient = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}

export const topToBottomVarient = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}
