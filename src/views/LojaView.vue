
<script setup>
import ProductGrid from '@/components/ProductGrid.vue'
import { useApi } from '@/composables/useApi'
import { onMounted } from 'vue'

const { data: produtos, loading, error, get } = useApi('produtos')

console.log(produtos)

onMounted(() => {
  get()
})
</script>

<template>
  <section class="py-12 max-w-7xl mx-auto px-4">
    <h1 class="text-2xl font-bold mb-6">Todos os produtos</h1>
    <ProductGrid :produtos="produtos || []" />
  </section>
</template>
