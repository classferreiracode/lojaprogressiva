<template>
  <div ref="faqRef">
    <div v-for="(faq, index) in items" :key="index"
         class="mb-4 border border-gray-200 rounded-lg bg-white shadow-sm"
         data-animate="faq-item">
      <button @click="toggle(index)"
              class="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-pink-600 transition">
        {{ faq.pergunta }}
        <i :class="[activeIndex === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down']"
            class="text-gray-400"></i>
      </button>
      <transition name="fade">
        <div v-show="activeIndex === index" class="px-4 pb-4 text-gray-600 text-sm leading-relaxed overflow-hidden">
          {{ faq.resposta }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { animateReveal, gsap } from '@/utils/animations'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const activeIndex = ref(null)
const faqRef = ref(null)
let ctx = null

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

onMounted(() => {
  ctx = gsap.context(() => {
    animateReveal('[data-animate="faq-item"]', { stagger: 0.08 })
  }, faqRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
