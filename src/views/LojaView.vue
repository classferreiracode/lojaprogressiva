<script setup>
import ProductGrid from '@/components/ProductGrid.vue'
import { useApi } from '@/composables/useApi'
import { ref, onMounted, watch } from 'vue'
import Spinner from '@/components/Spinner.vue'
import SearchComponent from '@/components/SearchComponent.vue'

const { data: produtos, loading, error, get } = useApi('produtos')
const searchQuery = ref('')

const filteredProducts = ref([])

onMounted(() => {
  get()
})

watch([produtos, searchQuery], () => {
  if (!produtos.value) return
  
  if (!searchQuery.value.trim()) {
    filteredProducts.value = produtos.value
    return
  }
  
  const query = searchQuery.value.toLowerCase()
  filteredProducts.value = produtos.value.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  )
}, { immediate: true, deep: true })
</script>

<template>
  <div>
    <section class="py-12 max-w-7xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold">Todos os produtos</h1>
        <!-- <div class="w-full md:w-1/3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full py-2 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
        </div> -->
      </div>
      
      <div v-if="loading" class="flex justify-center py-12">
        <Spinner size="lg" color="pink" />
      </div>
      
      <div v-else-if="error" class="text-center py-12 text-red-500">
        <p>Erro ao carregar produtos: {{ error }}</p>
        <button @click="get" class="mt-4 bg-pink-500 text-white px-4 py-2 rounded">
          Tentar novamente
        </button>
      </div>
      
      <template v-else>
        <p v-if="filteredProducts.length === 0" class="text-center py-8 text-gray-500">
          Nenhum produto encontrado para "{{ searchQuery }}"
        </p>
        <ProductGrid v-else :produtos="filteredProducts" />
      </template>
    </section>
  </div>
</template>