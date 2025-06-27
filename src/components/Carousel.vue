<template>
  <div class="overflow-hidden max-w-7xl mx-auto px-4"
       @mouseenter="pause = true"
       @mouseleave="pause = false">
    <div ref="track" class="flex transition-transform duration-500 ease-in-out"
         :style="{ transform: `translateX(-${offset}px)` }">
      <slot v-for="(item, index) in items" 
            :key="item.id || index" 
            name="item" 
            :item="item" />
    </div>
    
    <div class="flex justify-center mt-4 space-x-2">
      <button 
        v-for="(_, i) in totalPages" 
        :key="i"
        @click="goToPage(i)"
        :class="[
          'w-3 h-3 rounded-full',
          currentPage === i ? 'bg-pink-600' : 'bg-gray-300'
        ]"
        :aria-label="`Ir para slide ${i + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemWidth: {
    type: Number,
    default: 266
  },
  visibleItems: {
    type: Number,
    default: 4
  },
  interval: {
    type: Number,
    default: 5000
  }
})

const offset = ref(0)
const pause = ref(false)
const currentPage = ref(0)
let intervalId = null

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.visibleItems)
})

const maxOffset = computed(() => {
  return Math.max(0, props.items.length * props.itemWidth - 
    props.visibleItems * props.itemWidth)
})

const startCarousel = () => {
  intervalId = setInterval(() => {
    if (!pause.value) {
      nextSlide()
    }
  }, props.interval)
}

const nextSlide = () => {
  currentPage.value = (currentPage.value + 1) % totalPages.value
  offset.value = currentPage.value * props.visibleItems * props.itemWidth
}

const goToPage = (page) => {
  currentPage.value = page
  offset.value = page * props.visibleItems * props.itemWidth
}

onMounted(() => {
  startCarousel()
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

watch(() => props.items, () => {
  offset.value = 0
  currentPage.value = 0
  clearInterval(intervalId)
  startCarousel()
}, { deep: true })
</script>