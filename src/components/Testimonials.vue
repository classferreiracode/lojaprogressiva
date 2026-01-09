<template>
  <section class="w-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white py-16">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <div class="mb-6">
        <h2 class="text-3xl font-bold mb-2">O que nossas clientes dizem</h2>
      </div>

      <transition name="fade" mode="out-in">
        <div v-if="current" :key="current.nome" class="flex flex-col items-center space-y-4">
          <div class="flex text-yellow-300 text-lg">
            <i class="fas fa-star" v-for="n in 5" :key="n"></i>
          </div>
          <p class="italic text-lg max-w-xl">"{{ current.text }}"</p>
          <p class="font-bold mt-2">{{ current.nome }}</p>
        </div>
        <div v-else class="text-white/90">Sem depoimentos no momento.</div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  intervalMs: {
    type: Number,
    default: 5000
  }
})

const index = ref(0)
const current = ref(props.items[0] || null)
let intervalId = null

const startRotation = () => {
  if (props.items.length <= 1) return
  intervalId = setInterval(() => {
    index.value = (index.value + 1) % props.items.length
    current.value = props.items[index.value]
  }, props.intervalMs)
}

onMounted(() => {
  startRotation()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

watch(() => props.items, (items) => {
  clearInterval(intervalId)
  index.value = 0
  current.value = items[0] || null
  startRotation()
}, { deep: true })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
