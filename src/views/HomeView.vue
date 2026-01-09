<template>
  <div>
    <Banner :slides="bannerSlides" />
    <h1 class="sr-only">Loja Progressiva Fashion</h1>

    <section class="py-12 mb-4">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Produtos em Destaque</h2>
        <p class="text-gray-500">Confira os queridinhos da Progressiva Fashion</p>
      </div>

      <Carousel
        v-if="showCarousel"
        :items="featuredProducts"
        :item-width="266"
        :visible-items="visibleItems"
        :interval="5000"
      >
        <template #item="{ item }">
          <ProductCard :product="item" @toggle-wishlist="toggleWishlist" />
        </template>
      </Carousel>

      <div v-else-if="loading" class="text-center py-12">
        <Spinner size="lg" color="pink" />
      </div>

      <div v-else-if="error" class="text-center py-12 text-red-500">
        <p>Erro ao carregar produtos: {{ error }}</p>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        <p>Nenhum produto em destaque no momento.</p>
      </div>
    </section>

    <Testimonials :items="testimonials" />

    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 space-y-16">
        <FeatureCard
          v-for="(item, index) in features"
          :key="item.titulo"
          :feature="item"
          :reverse="index % 2 !== 0"
        />
      </div>
    </section>

    <section class="bg-gray-50 py-16" id="faq">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Perguntas Frequentes</h2>
        <FAQAccordion :items="faqs" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useApi } from '@/composables/useApi'
import { useWishlistStore } from '@/stores/wishlist'
import homeContent from '@/data/homeContent.json'
import Banner from '@/components/Banner.vue'
import Testimonials from '@/components/Testimonials.vue'
import Carousel from '@/components/Carousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import FAQAccordion from '@/components/FAQAccordion.vue'
import Spinner from '@/components/Spinner.vue'

const { data: produtos, loading, error, get } = useApi('produtos')
const wishlist = useWishlistStore()

const bannerSlides = homeContent.bannerSlides || []
const testimonials = homeContent.testimonials || []
const features = homeContent.features || []
const faqs = homeContent.faqs || []

const visibleItems = ref(4)

const updateVisibleItems = () => {
  if (window.innerWidth < 640) visibleItems.value = 1
  else if (window.innerWidth < 768) visibleItems.value = 2
  else if (window.innerWidth < 1024) visibleItems.value = 3
  else visibleItems.value = 4
}

onMounted(() => {
  updateVisibleItems()
  window.addEventListener('resize', updateVisibleItems)
  get({ featured: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleItems)
})

const featuredProducts = computed(() => {
  return produtos.value?.filter((p) => p.featured) || []
})

const showCarousel = computed(() => {
  return !loading.value && !error.value && featuredProducts.value.length > 0
})

const toggleWishlist = (produto) => {
  wishlist.toggle(produto)
}
</script>
