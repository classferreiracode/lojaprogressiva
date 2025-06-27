<template>
  <div :class="[
    'flex flex-col md:flex-row items-center gap-8',
    reverse ? 'md:flex-row-reverse' : ''
  ]">
    <div class="w-full md:w-1/2">
      <img 
        :src="feature.img" 
        :alt="feature.titulo" 
        class="w-full shadow-md object-cover rounded-lg"
        loading="lazy"
      />
    </div>
    
    <div class="w-full md:w-1/2">
      <h3 class="text-2xl font-bold text-pink-600 mb-4">{{ feature.titulo }}</h3>
      <p class="text-gray-700 text-base leading-relaxed">{{ feature.desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['titulo', 'desc', 'img'].every(prop => prop in value)
    }
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
div {
  transition: transform 0.3s ease;
}
div:hover {
  transform: translateY(-5px);
}
</style>