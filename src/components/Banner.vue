<template>
  <div class="relative overflow-hidden hero-gradient">
    <div class="slideshow-container">
      <div
        v-for="(slide, index) in slides"
        :key="index"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import homeContent from '@/data/homeContent.json'

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
let intervalId = null

const startRotation = () => {
  if (slides.value.length <= 1) return
  intervalId = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.value.length
  }, props.intervalMs)
}

onMounted(() => {
  startRotation()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.fade {
  animation: fadeIn 1.5s;
}
@keyframes fadeIn {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
</style>
