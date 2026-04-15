<script setup>
import ProductGrid from '@/components/ProductGrid.vue'
import { useApi } from '@/composables/useApi'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { animateIntro, gsap } from '@/utils/animations'

const { data: produtos, loading, error, get } = useApi('produtos')
const searchQuery = ref('')
const selectedHighlight = ref('')

const filteredProducts = ref([])
const pageRef = ref(null)
let ctx = null

const highlightFilters = [
  { label: 'Progressiva', terms: ['progressiva', 'alisamento', 'liso'] },
  { label: 'Cronograma', terms: ['cronograma', 'hidrat', 'reconstr', 'nutri'] },
  { label: 'Fashion Gold', terms: ['fashion gold'] },
  { label: 'Matização', terms: ['matiz', 'loiro'] }
]

onMounted(() => {
  get()
  ctx = gsap.context(() => {
    animateIntro('[data-animate="shop-hero"]', { stagger: 0.14 })
  }, pageRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

watch([produtos, searchQuery, selectedHighlight], () => {
  if (!produtos.value) return
  
  const query = searchQuery.value.trim().toLowerCase()
  const activeFilter = highlightFilters.find((item) => item.label === selectedHighlight.value)

  filteredProducts.value = produtos.value.filter((p) => {
    const title = p.title?.toLowerCase() || ''
    const description = p.description?.toLowerCase() || ''
    const matchesQuery = !query || title.includes(query) || description.includes(query)
    const matchesHighlight = !activeFilter || activeFilter.terms.some((term) => title.includes(term) || description.includes(term))

    return matchesQuery && matchesHighlight
  })
}, { immediate: true, deep: true })

const toggleHighlight = (label) => {
  selectedHighlight.value = selectedHighlight.value === label ? '' : label
}
</script>

<template>
  <div ref="pageRef" class="px-4 pb-14 pt-8 md:px-6">
    <section class="mx-auto max-w-7xl" aria-labelledby="shop-title">
      <div class="glass-panel mb-8 rounded-[2.25rem] p-8">
        <span data-animate="shop-hero" class="eyebrow">Catálogo completo</span>
        <div class="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div data-animate="shop-hero">
            <h1 id="shop-title" class="brand-heading text-5xl font-semibold text-[#1f1720]">Todos os produtos</h1>
            <p class="mt-3 max-w-2xl text-base leading-7 text-[#6e5b64]">
              Encontre progressivas, cronogramas, hidratação, reconstrução, matização e linhas de manutenção em uma seleção mais clara para comparar e comprar.
            </p>
          </div>
        </div>

        <div data-animate="shop-hero" class="mt-6 flex flex-wrap gap-3">
          <button
            v-for="filter in highlightFilters"
            :key="filter.label"
            @click="toggleHighlight(filter.label)"
            class="status-chip transition"
            :class="selectedHighlight === filter.label ? '!bg-[#782744] !text-white before:!bg-white' : ''"
            :aria-pressed="selectedHighlight === filter.label ? 'true' : 'false'"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
      
      <div v-if="loading" class="flex justify-center py-12">
        <Spinner size="lg" color="pink" />
      </div>
      
      <div v-else-if="error" class="rounded-[1.75rem] border border-red-200 bg-white/80 py-12 text-center text-red-500">
        <p>Erro ao carregar produtos: {{ error }}</p>
        <button @click="get" class="primary-cta mt-4">
          Tentar novamente
        </button>
      </div>
      
      <template v-else>
        <p v-if="filteredProducts.length === 0" class="rounded-[1.75rem] bg-white/80 py-8 text-center text-[#6e5b64]">
          Nenhum produto encontrado para "{{ searchQuery || selectedHighlight }}".
        </p>
        <div v-else class="space-y-5">
          <div class="rounded-[1.5rem] border border-[#782744]/10 bg-white/70 px-5 py-4 text-sm leading-6 text-[#6e5b64]">
            Use os filtros para ir direto à linha, à etapa do tratamento ou à necessidade do seu cabelo.
          </div>
          <ProductGrid :produtos="filteredProducts" :por-pagina="8" />
        </div>
      </template>
    </section>
  </div>
</template>
