
<script setup>
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import Banner from '@/components/Banner.vue'

const wishlist = useWishlistStore()

const route = useRoute()
const { data: produto, loading, error, get } = useApi(`produtos/${route.params.slug}`)

onMounted(() => {
  get()
})
</script>

<template>
  <Banner />
  <section class="py-12" v-if="produto">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
      <img :src="produto.image" class="w-full md:w-1/2 rounded shadow-lg object-cover" />
      <div class="flex-1 gap-4 space-y-4">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ produto.title }}</h1>
        <div class="mt-2">
          <div v-if="produto.price_sale && produto.price_sale < produto.price_regular">
            <span class="text-gray-400 line-through text-lg">R$ {{ produto.price_regular }}</span>
            <span class="text-pink-600 font-bold text-3xl ml-2">R$ {{ produto.price_sale }}</span>
          </div>
          <div v-else>
            <span class="text-pink-600 font-bold text-3xl">R$ {{ produto.price_regular }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between mb-4">
          <a :href="produto.external_link" target="_blank" class="inline-block w-full bg-pink-600 text-white text-center px-6 py-3 rounded hover:bg-pink-700 transition">
            <i class="fas fa-shopping-cart mr-2"></i>
            Comprar agora
          </a>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 mt-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Descrição do Produto</h2>
      <p class="text-gray-600">{{ produto.description }}</p>
    </div>
  </section>
</template>
