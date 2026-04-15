<template>
  <div ref="pageRef" class="px-4 pb-16 pt-8 md:px-6 md:pt-10">
    <section class="mx-auto max-w-7xl space-y-8" aria-labelledby="wishlist-title">
      <div class="glass-panel rounded-[2.25rem] p-6 md:p-8">
        <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div data-animate="wishlist-hero">
            <span class="eyebrow">Favoritos estratégicos</span>
            <h1 id="wishlist-title" class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720] md:text-6xl">Seus favoritos para comparar e decidir melhor.</h1>
            <p class="mt-4 max-w-2xl text-base leading-8 text-[#6e5b64]">
              A wishlist agora funciona como uma etapa real da jornada de compra: salvar, comparar, revisar e voltar ao produto certo no momento da decisão.
            </p>
          </div>

          <div data-animate="wishlist-hero" class="grid gap-4 md:grid-cols-3">
            <article class="metric-card">
              <p class="text-3xl font-extrabold text-[#782744]">{{ items.length }}</p>
              <p class="mt-2 text-sm font-semibold text-[#1f1720]">Produto{{ items.length === 1 ? '' : 's' }} salvo{{ items.length === 1 ? '' : 's' }}</p>
              <p class="mt-1 text-sm text-[#6e5b64]">Revise os itens com maior interesse comercial.</p>
            </article>
            <article class="metric-card">
              <p class="text-3xl font-extrabold text-[#782744]">1 clique</p>
              <p class="mt-2 text-sm font-semibold text-[#1f1720]">Retorno rápido</p>
              <p class="mt-1 text-sm text-[#6e5b64]">Volte para os produtos sem reiniciar a busca.</p>
            </article>
            <article class="metric-card">
              <p class="text-3xl font-extrabold text-[#782744]">Mais foco</p>
              <p class="mt-2 text-sm font-semibold text-[#1f1720]">Decisão assistida</p>
              <p class="mt-1 text-sm text-[#6e5b64]">Compare tratamentos antes de finalizar a compra.</p>
            </article>
          </div>
        </div>
      </div>

      <section v-if="items.length === 0" class="luxury-card rounded-[2rem] p-8 text-center md:p-12">
        <span class="eyebrow">Lista de favoritos vazia</span>
        <h2 class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720]">Salve os produtos com maior potencial para sua rotina.</h2>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#6e5b64]">
          Ao favoritar um item, você cria uma seleção privada para comparar benefícios, voltar depois e montar uma compra mais consciente.
        </p>
        <RouterLink to="/loja" class="primary-cta mt-8">
          Explorar catálogo
          <i class="fas fa-arrow-right text-sm"></i>
        </RouterLink>
      </section>

      <template v-else>
        <div class="flex flex-col gap-4 rounded-[2rem] border border-[#782744]/10 bg-white/80 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#782744]">Seleção pronta para revisar</p>
            <h2 class="brand-heading mt-2 text-3xl font-semibold text-[#1f1720]">Favoritos com leitura premium</h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/loja" class="secondary-cta">Continuar comprando</RouterLink>
            <button @click="clearWishlist" class="secondary-cta !border-red-200 !text-red-600">
              Limpar favoritos
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <ProductCard
            v-for="item in items"
            :key="item.id || item.slug"
            :product="item"
            @toggle-wishlist="toggleWishlist"
          />
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import ProductCard from '@/components/ProductCard.vue'
import { animateIntro, animateReveal, gsap } from '@/utils/animations'

const wishlist = useWishlistStore()
const items = computed(() => wishlist.items)
const pageRef = ref(null)
let ctx = null

const toggleWishlist = (produto) => {
  wishlist.toggle(produto)
}

const clearWishlist = () => {
  wishlist.clear()
}

onMounted(() => {
  ctx = gsap.context(() => {
    animateIntro('[data-animate="wishlist-hero"]')
    animateReveal('[data-animate="wishlist-grid"]')
  }, pageRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
