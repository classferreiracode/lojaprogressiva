<template>
  <header class="sticky top-0 z-50 border-b border-white/30 bg-[#fffaf4]/88 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 text-sm text-[#5b4a52]">
      <p data-animate="header-item" class="hidden md:block">Curadoria premium para alisamento, tratamento, cronograma capilar e linhas Ybera com alta procura.</p>
      <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#782744] md:ml-auto">
        <span data-animate="header-item" class="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          Compra Segura
        </span>
        <span data-animate="header-item" class="hidden rounded-full bg-white/70 px-3 py-2 md:inline-flex">Entrega nacional</span>
        <span data-animate="header-item" class="hidden rounded-full bg-white/70 px-3 py-2 lg:inline-flex">Seleção profissional</span>
      </div>
    </div>

    <nav class="mx-auto max-w-7xl px-4 pb-4">
      <div class="glass-panel rounded-[2rem] px-4 py-4 md:px-6" ref="wishlistRef">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between gap-4">
            <RouterLink to="/" data-animate="header-item" class="flex items-center gap-3">
              <div class="rounded-2xl bg-white/80 p-2 shadow-sm">
                <img src="/logo-progressiva.png" alt="Logo Progressiva Fashion" class="h-14 w-auto">
              </div>
              <div class="hidden md:block">
                <p class="text-xs font-extrabold uppercase tracking-[0.32em] text-[#782744]">Progressiva Fashion</p>
                <p class="brand-heading text-2xl font-semibold text-[#1f1720]">Autoridade em tratamento capilar</p>
              </div>
            </RouterLink>

            <div class="flex items-center gap-2 md:hidden">
              <button
                class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#782744]/15 bg-white/80 text-[#782744]"
                @click="showDropdown = !showDropdown"
                aria-label="Abrir lista de desejos"
                :aria-expanded="showDropdown ? 'true' : 'false'"
                aria-controls="wishlist-panel"
              >
                <span class="relative">
                  <i class="fas fa-heart text-lg"></i>
                  <span
                    v-if="wishlist.items.length"
                    class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#b6406f] text-[10px] text-white"
                  >
                    {{ wishlist.items.length }}
                  </span>
                </span>
              </button>
              <button
                class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#782744]/15 bg-white/80 text-[#782744]"
                @click="menuAberto = !menuAberto"
                aria-label="Abrir menu"
                :aria-expanded="menuAberto ? 'true' : 'false'"
                aria-controls="mobile-menu"
              >
                <i class="fas fa-bars text-lg"></i>
              </button>
            </div>

            <div class="hidden items-center gap-3 md:flex">
              <RouterLink to="/loja" data-animate="header-item" class="primary-cta !px-5 !py-3">Comprar Agora</RouterLink>
              <button @click="showDropdown = !showDropdown" data-animate="header-item" class="secondary-cta relative !px-5 !py-3" :aria-expanded="showDropdown ? 'true' : 'false'" aria-controls="wishlist-panel">
                <i class="fas fa-heart text-base"></i>
                Favoritos
                <span
                  v-if="wishlist.items.length"
                  class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#b6406f] px-2 text-xs text-white"
                >
                  {{ wishlist.items.length }}
                </span>
              </button>
            </div>
          </div>

          <div class="hidden items-center justify-between gap-6 md:flex">
            <ul data-animate="header-item" class="flex items-center gap-8 text-sm font-semibold text-[#4f4047]">
              <li><RouterLink to="/" class="transition hover:text-[#b6406f]">Início</RouterLink></li>
              <li><RouterLink to="/loja" class="transition hover:text-[#b6406f]">Loja</RouterLink></li>
              <li><a href="/#faq" class="transition hover:text-[#b6406f]">Perguntas frequentes</a></li>
              <li><RouterLink to="/contato" class="transition hover:text-[#b6406f]">Contato</RouterLink></li>
            </ul>

            <div data-animate="header-item" class="w-full max-w-xl">
              <SearchComponent />
            </div>
          </div>

          <div v-if="menuAberto" id="mobile-menu" class="space-y-4 rounded-[1.75rem] border border-[#782744]/10 bg-white/80 p-4 md:hidden">
            <div class="space-y-2 text-sm font-semibold text-[#4f4047]">
              <RouterLink to="/" class="block rounded-2xl px-4 py-3 hover:bg-[#f7ede8]" @click="menuAberto = false">Início</RouterLink>
              <RouterLink to="/loja" class="block rounded-2xl px-4 py-3 hover:bg-[#f7ede8]" @click="menuAberto = false">Loja</RouterLink>
              <a href="/#faq" class="block rounded-2xl px-4 py-3 hover:bg-[#f7ede8]" @click="menuAberto = false">Perguntas frequentes</a>
              <RouterLink to="/contato" class="block rounded-2xl px-4 py-3 hover:bg-[#f7ede8]" @click="menuAberto = false">Contato</RouterLink>
            </div>
            <SearchComponent />
            <RouterLink to="/loja" class="primary-cta w-full" @click="menuAberto = false">Explorar coleção</RouterLink>
          </div>

          <div
            v-if="showDropdown"
            id="wishlist-panel"
            class="ml-auto w-full max-w-sm rounded-[1.75rem] border border-[#782744]/10 bg-white/95 p-4 shadow-[0_22px_50px_rgba(49,20,35,0.16)]"
          >
            <div class="mb-4 flex items-center justify-between">
              <div>
                <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#782744]">Wishlist</p>
                <h3 class="brand-heading text-2xl font-semibold text-[#1f1720]">Seleção favorita</h3>
              </div>
              <RouterLink to="/wishlist" class="text-sm font-semibold text-[#b6406f]">Ver todos</RouterLink>
            </div>

            <div v-if="wishlist.items.length" class="max-h-80 space-y-3 overflow-y-auto">
              <div
                v-for="(item, index) in wishlist.items"
                :key="index"
                class="flex items-center gap-3 rounded-3xl border border-[#782744]/10 bg-[#fff9f3] p-3"
              >
                <img :src="item.image" alt="imagem" class="h-14 w-14 rounded-2xl object-cover" />
                <div class="min-w-0 flex-1">
                  <p class="line-clamp-2 text-sm font-semibold text-[#1f1720]">{{ item.title }}</p>
                </div>
                <button @click="wishlist.toggle(item)" class="text-[#8b6b78] transition hover:text-red-500" aria-label="Remover item">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div v-else class="rounded-3xl border border-dashed border-[#782744]/20 bg-[#fff8f1] px-5 py-8 text-center text-sm text-[#6e5b64]">
              Sua seleção ainda está vazia. Salve os produtos para comparar depois.
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import SearchComponent from './SearchComponent.vue'

const wishlist = useWishlistStore()
const showDropdown = ref(false)
const menuAberto = ref(false)
const wishlistRef = ref(null)

const clickOutsideHandler = (event) => {
  if (wishlistRef.value && !wishlistRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideHandler)
})
</script>
