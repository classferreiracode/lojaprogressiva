
<template>
  <div class="relative overflow-hidden hero-gradient">
    <div class="slideshow-container">
      <div class="mySlides fade" v-for="(slide, index) in slides" :key="index" v-show="index === activeSlide">
          <a :href="slide.link">
            <img :src="slide.img" class="rounded-lg shadow-xl w-full" :alt="slide.text" />
          </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const slides = ref([
  {
      text: 'Conheça a linha completa da Progressiva Fashion!',
      link: '#',
      img: 'https://lojaybera.fbitsstatic.net/img/b/265fb37b-0eb5-463f-ac40-51fe85298b59.jpg'
  },
  {
      text: 'Cuide do seu cabelo com qualidade de salão.',
      link: '#',
      img: 'https://lojaybera.fbitsstatic.net/img/b/590f24f3-69eb-4829-b79c-9e17f50f7558.jpg'
  }
])

const activeSlide = ref(0)
onMounted(() => {
  setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slides.value.length
  }, 6000)
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
