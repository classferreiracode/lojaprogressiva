<template>
  <section ref="gridRef" class="py-6">
    <div class="mx-auto max-w-7xl">
      <div
        class="mb-8 flex flex-col gap-3 rounded-[2rem] border border-[#782744]/10 bg-white/80 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#782744]">Vitrine completa</p>
          <h2 class="brand-heading mt-2 text-3xl font-semibold text-[#1f1720]">Catalogo comercial</h2>
        </div>
        <div class="text-sm leading-6 text-[#6e5b64] md:text-right">
          <p>{{ props.produtos.length }} produtos disponiveis para compra.</p>
          <p v-if="totalPaginas > 1">Pagina {{ pagina }} de {{ totalPaginas }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="(produto, index) in paginated" :key="produto.id || produto.slug || index" data-animate="grid-card">
          <ProductCard :product="produto" @toggle-wishlist="toggleWishlist" />
        </div>
      </div>

      <div v-if="totalPaginas > 1" class="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button @click="irParaPagina(pagina - 1)" :disabled="pagina === 1"
          class="secondary-cta disabled:cursor-not-allowed disabled:opacity-40">
          Anterior
        </button>

        <button v-for="numero in paginasVisiveis" :key="numero" @click="irParaPagina(numero)"
          :class="numero === pagina ? 'primary-cta !px-5 !py-3' : 'secondary-cta !px-5 !py-3'">
          {{ numero }}
        </button>

        <button @click="irParaPagina(pagina + 1)" :disabled="pagina >= totalPaginas"
          class="primary-cta disabled:cursor-not-allowed disabled:opacity-40">
          Proximo
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useWishlistStore } from '@/stores/wishlist'
import { animateStaggerChildren, gsap } from '@/utils/animations'
const wishlist = useWishlistStore()
const gridRef = ref(null)
let ctx = null

const props = defineProps({
  produtos: Array,
  porPagina: {
    type: Number,
    default: 16
  }
})

const pagina = ref(1)

const totalPaginas = computed(() => Math.max(1, Math.ceil((props.produtos?.length || 0) / props.porPagina)))
const paginated = computed(() => {
  const start = (pagina.value - 1) * props.porPagina
  return props.produtos.slice(start, start + props.porPagina)
})

const paginasVisiveis = computed(() => {
  const total = totalPaginas.value
  const atual = pagina.value
  const inicio = Math.max(1, atual - 2)
  const fim = Math.min(total, inicio + 4)
  const primeiro = Math.max(1, fim - 4)

  return Array.from({ length: fim - primeiro + 1 }, (_, index) => primeiro + index)
})

function toggleWishlist(produto) {
  wishlist.toggle(produto)
}

function irParaPagina(numero) {
  if (numero < 1 || numero > totalPaginas.value) return
  pagina.value = numero
  gridRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  ctx = gsap.context(() => {
    animateStaggerChildren(gridRef.value, '[data-animate="grid-card"]')
  }, gridRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

watch(() => props.produtos, () => {
  pagina.value = 1
}, { deep: true })

watch(totalPaginas, (novoTotal) => {
  if (pagina.value > novoTotal) {
    pagina.value = novoTotal
  }
})
</script>
