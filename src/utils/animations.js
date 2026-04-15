import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hasWindow = typeof window !== 'undefined'

export const prefersReducedMotion = () => {
  if (!hasWindow || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const animateIntro = (targets, options = {}) => {
  if (prefersReducedMotion()) return null

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 42 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      ...options
    }
  )
}

export const animateReveal = (targets, options = {}) => {
  if (prefersReducedMotion()) return []

  return gsap.utils.toArray(targets).map((target, index) => gsap.fromTo(
    target,
    { autoAlpha: 0, y: 48 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: index * 0.04,
      scrollTrigger: {
        trigger: target,
        start: 'top 82%',
        once: true
      },
      ...options
    }
  ))
}

export const animateStaggerChildren = (container, selector, options = {}) => {
  if (prefersReducedMotion() || !container) return null

  const items = container.querySelectorAll(selector)
  if (!items.length) return null

  return gsap.fromTo(
    items,
    { autoAlpha: 0, y: 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: 'top 78%',
        once: true
      },
      ...options
    }
  )
}

export const animateFloat = (target, options = {}) => {
  if (prefersReducedMotion() || !target) return null

  return gsap.to(target, {
    y: -10,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    ...options
  })
}

export { gsap }
