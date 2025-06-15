
<template>
  <div class="relative overflow-hidden hero-gradient">
    <div class="slideshow-container">
      <div class="mySlides fade" v-for="(slide, index) in slides" :key="index" v-show="index === activeSlide">
        <div class="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{{ slide.title }}</h1>
            <p class="text-lg text-gray-600 mb-6">{{ slide.text }}</p>
            <button class="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              {{ slide.button }}
            </button>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img :src="slide.img" class="rounded-lg shadow-xl w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const slides = ref([
  {
    title: 'Transforme seus fios com estilo',
    text: 'Conheça a linha completa da Progressiva Fashion!',
    button: 'Ver Produtos',
    img: 'https://lojaybera.fbitsstatic.net/img/b/265fb37b-0eb5-463f-ac40-51fe85298b59.jpg'
  },
  {
    title: 'Produtos Profissionais em Casa',
    text: 'Cuide do seu cabelo com qualidade de salão.',
    button: 'Comprar Agora',
    img: 'https://lojaybera.fbitsstatic.net/img/b/590f24f3-69eb-4829-b79c-9e17f50f7558.jpg'
  }
])

const activeSlide = ref(0)
onMounted(() => {
  setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.value.length
  }, 5000)
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
