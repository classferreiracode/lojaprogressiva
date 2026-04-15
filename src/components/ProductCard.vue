<template>
  <article class="luxury-card group relative flex h-full min-w-[272px] flex-col overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1">
    <div class="relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.title"
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />

      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1f1720]/35 to-transparent"></div>

      <div class="absolute left-4 top-4 flex items-center gap-2">
        <span class="rounded-full bg-white/88 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#782744]">
          Curadoria premium
        </span>
        <span v-if="hasDiscount" class="rounded-full bg-[#782744] px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white">
          -{{ discountPercentage }}%
        </span>
      </div>

      <div class="absolute right-4 top-4">
        <button
          @click.stop="$emit('toggle-wishlist', product)"
          :class="[
            'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/88 shadow-sm transition',
            isInWishlist ? 'text-red-500' : 'text-[#b6406f]'
          ]"
          aria-label="Adicionar à lista de desejos"
        >
          <i :class="['fa-heart', isInWishlist ? 'fas' : 'far']" class="text-base"></i>
        </button>
      </div>
    </div>

    <router-link :to="`/produto/${product.slug}`" class="flex flex-1 flex-col p-5">
      <div class="mb-4 min-h-[12.5rem]">
        <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#6f5962]">Tratamento profissional</p>
        <h3 class="mt-2 min-h-[6.2rem] line-clamp-3 text-xl font-bold leading-tight text-[#1f1720]" :title="product.title">
          {{ product.title }}
        </h3>
        <p class="mt-3 min-h-[5.4rem] line-clamp-3 text-sm leading-6 text-[#5b4a52]">
          {{ product.description }}
        </p>
      </div>

      <div class="mt-auto flex items-end justify-between gap-4">
        <div>
          <div v-if="hasDiscount" class="flex min-h-[2.2rem] flex-wrap items-center gap-2">
            <span class="text-sm text-[#9d8a93] line-through">
              {{ formatarPreco(product.price_regular) }}
            </span>
            <span class="text-2xl font-extrabold text-[#b6406f]">
              {{ formatarPreco(product.price_sale) }}
            </span>
          </div>

          <div v-else class="flex min-h-[2.2rem] items-center">
            <span class="text-2xl font-extrabold text-[#b6406f]">
              {{ formatarPreco(product.price_sale) }}
            </span>
          </div>

          <p class="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f5962]">Compra protegida</p>
        </div>

        <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f6d5df] text-[#782744] transition group-hover:bg-[#782744] group-hover:text-white">
          <i class="fas fa-arrow-right text-sm"></i>
        </span>
      </div>
    </router-link>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { calcularDesconto, formatarPreco } from '@/utils/helpers'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-wishlist'])

const wishlist = useWishlistStore()
const isInWishlist = computed(() => wishlist.isInWishlist(props.product))

const hasDiscount = computed(() => {
  return props.product.price_regular && 
         props.product.price_sale < props.product.price_regular
})

const discountPercentage = computed(() => {
  return calcularDesconto(props.product.price_regular, props.product.price_sale)
})
</script>
