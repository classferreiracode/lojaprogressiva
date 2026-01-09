<template>
  <section class="py-12 max-w-7xl mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-2xl font-bold">Minha wishlist</h1>
      <p v-if="items.length" class="text-gray-500">
        {{ items.length }} produto{{ items.length > 1 ? 's' : '' }} salvo{{ items.length > 1 ? 's' : '' }}
      </p>
    </div>

    <div v-if="items.length === 0" class="text-center py-16">
      <p class="text-gray-500 mb-4">Sua wishlist ainda está vazia.</p>
      <router-link to="/loja" class="inline-flex items-center bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition">
        Ver produtos
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="item in items"
        :key="item.id || item.slug"
        :product="item"
        @toggle-wishlist="toggleWishlist"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import ProductCard from '@/components/ProductCard.vue'

const wishlist = useWishlistStore()
const items = computed(() => wishlist.items)

const toggleWishlist = (produto) => {
  wishlist.toggle(produto)
}
</script>
