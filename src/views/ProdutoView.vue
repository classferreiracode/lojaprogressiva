
<script setup>
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { onMounted } from 'vue'

const route = useRoute()
const { data: produto, loading, error, get } = useApi(`produtos/${route.params.slug}`)

onMounted(() => {
  get()
})
</script>

<template>
  <section class="py-12" v-if="produto">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
      <img :src="produto.image" class="w-full md:w-1/2 rounded shadow-lg object-cover h-80" />
      <div class="flex-1">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ produto.title }}</h1>
        <p class="text-gray-600 text-lg mb-4">{{ produto.description }}</p>
        <div class="mt-2">
          <div v-if="produto.price_sale && produto.price_sale < produto.price_regular">
            <span class="text-gray-400 line-through text-sm">R$ {{ produto.price_regular }}</span>
            <span class="text-pink-600 font-bold text-lg ml-2">R$ {{ produto.price_sale }}</span>
          </div>
          <div v-else>
            <span class="text-pink-600 font-bold text-lg">R$ {{ produto.price_regular }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
