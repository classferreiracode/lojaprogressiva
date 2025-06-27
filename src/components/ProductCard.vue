<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition relative min-w-[250px]">
    <img 
      :src="product.image" 
      :alt="product.title" 
      class="w-full h-48 object-cover rounded-t-lg" 
      loading="lazy"
    />
    
    <div class="absolute top-2 right-2">
      <button 
        @click.stop="$emit('toggle-wishlist', product)"
        :class="[
          'bg-white rounded-full p-2 shadow hover:bg-pink-100 transition',
          isInWishlist ? 'text-red-500' : 'text-pink-600'
        ]"
        aria-label="Adicionar à lista de desejos"
      >
        <i :class="['fa-heart', isInWishlist ? 'fas' : 'far']" class="text-lg"></i>
      </button>
    </div>
    
    <router-link :to="`/produto/${product.slug}`" class="text-pink-600 hover:underline block">
      <div class="p-4">
        <h3 class="font-semibold text-lg text-gray-800 mb-1 line-clamp-2" :title="product.title">
          {{ product.title }}
        </h3>
        
        <div v-if="hasDiscount" class="space-x-2">
          <span class="text-gray-400 line-through text-sm">
            {{ formatarPreco(product.price_regular) }}
          </span>
          <span class="text-pink-600 font-bold text-lg">
            {{ formatarPreco(product.price_sale) }}
          </span>
          <span class="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">
            -{{ discountPercentage }}%
          </span>
        </div>
        
        <div v-else>
          <span class="text-pink-600 font-bold text-lg">
            {{ formatarPreco(product.price_sale) }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
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