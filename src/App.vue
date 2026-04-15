<script setup>
import Header from './components/HeaderComponent.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="page-shell">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#1f1720]">
      Pular para o conteúdo principal
    </a>
    <Header />
    <main id="main-content" class="section-shell pt-4 md:pt-6">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

