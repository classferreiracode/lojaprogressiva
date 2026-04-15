<template>
  <div ref="bannerRef" class="relative overflow-hidden hero-gradient">
    <div class="slideshow-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        ref="slideRefs"
        class="mySlides fade"
        v-show="index === activeSlide"
      >
        <a :href="slide.link">
          <img :src="slide.img" class="rounded-lg shadow-xl w-full" :alt="slide.text" loading="lazy" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import homeContent from '@/data/homeContent.json'
import { animateFloat, gsap, prefersReducedMotion } from '@/utils/animations'

const props = defineProps({
  slides: {
    type: Array,
    default: () => []
  },
  intervalMs: {
    type: Number,
    default: 6000
  }
})

const fallbackSlides = homeContent.bannerSlides || []
const slides = computed(() => (props.slides.length ? props.slides : fallbackSlides))

const activeSlide = ref(0)
const bannerRef = ref(null)
const slideRefs = ref([])
let intervalId = null
let ctx = null

const animateActiveSlide = async () => {
  if (prefersReducedMotion()) return

  await nextTick()
  const activeElement = slideRefs.value?.[activeSlide.value]
  if (!activeElement) return

  gsap.fromTo(
    activeElement,
    { autoAlpha: 0, scale: 1.04 },
    { autoAlpha: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
  )
}

const startRotation = () => {
  if (slides.value.length <= 1) return
  intervalId = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.value.length
  }, props.intervalMs)
}

onMounted(() => {
  ctx = gsap.context(() => {
    animateFloat('.slideshow-container', { y: -6, duration: 3.2 })
  }, bannerRef.value)
  startRotation()
  animateActiveSlide()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  ctx?.revert()
})

watch(activeSlide, () => {
  animateActiveSlide()
})
</script>

<style scoped>
.hero-gradient {
  background:
    radial-gradient(circle at top left, rgba(212, 173, 99, 0.18), transparent 30%),
    radial-gradient(circle at 85% 15%, rgba(182, 64, 111, 0.16), transparent 24%),
    linear-gradient(135deg, #fffaf4 0%, #f6ede6 100%);
}
.fade {
  animation: fadeIn 1.5s;
}
@keyframes fadeIn {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
</style>
