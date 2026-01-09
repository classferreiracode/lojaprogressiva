<script setup>
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { ref, onMounted, computed, watch } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { formatarPreco } from '@/utils/helpers'
import { setMeta, truncateText } from '@/utils/seo'
import Banner from '@/components/Banner.vue'
import Spinner from '@/components/Spinner.vue'

const route = useRoute()
const wishlist = useWishlistStore()
const { data: produto, loading, error, get } = useApi(`produtos/${route.params.slug}`)

const selectedImage = ref('')
const brandName = 'Loja Progressiva Fashion'
const baseUrl = 'https://www.lojaprogressivafashion.com.br'

onMounted(() => {
  get().then(() => {
    if (produto.value) {
      selectedImage.value = produto.value.image
    }
  })
})

watch(produto, (value) => {
  if (!value) return
  const title = `${value.title} | ${brandName}`
  const description = truncateText(value.description || `Conheça ${value.title} na ${brandName}.`)
  const image = value.image || `${baseUrl}/logo-progressiva.png`
  const slug = value.slug || route.params.slug
  const url = `${baseUrl}/produto/${slug}`
  setMeta({ title, description, image, url })
})

const isInWishlist = computed(() => {
  return produto.value ? wishlist.isInWishlist(produto.value) : false
})

const toggleWishlist = () => {
  if (produto.value) {
    wishlist.toggle(produto.value)
  }
}

const hasDiscount = computed(() => {
  return produto.value?.price_regular && 
         produto.value?.price_sale < produto.value?.price_regular
})

const discountPercentage = computed(() => {
  if (!produto.value) return 0
  return Math.round(
    ((produto.value.price_regular - produto.value.price_sale) / 
    produto.value.price_regular) * 100
  )
})
</script>

<template>
  <div>
    <Banner />
    
    <section v-if="loading" class="py-12 flex justify-center">
      <Spinner size="lg" color="pink" />
    </section>
    
    <section v-else-if="error" class="py-12 text-center">
      <p class="text-red-500">Erro ao carregar produto: {{ error }}</p>
      <button @click="get" class="mt-4 bg-pink-500 text-white px-4 py-2 rounded">
        Tentar novamente
      </button>
    </section>
    
    <section v-else-if="produto" class="py-12">
      <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        <!-- Galeria de Imagens -->
        <div class="w-full md:w-1/2">
          <img :src="selectedImage" :alt="produto.title" class="w-full rounded shadow-lg object-cover aspect-square" />
          <div v-if="produto.images && produto.images.length" class="grid grid-cols-4 gap-2 mt-4">
            <img 
              v-for="(img, index) in produto.images" 
              :key="index"
              :src="img" 
              @click="selectedImage = img"
              class="cursor-pointer border-2 rounded transition aspect-square object-cover"
              :class="selectedImage === img ? 'border-pink-500' : 'border-transparent'"
            />
          </div>
        </div>
        
        <!-- Informações do Produto -->
        <div class="flex-1 space-y-4">
          <div class="flex justify-between items-start">
            <h1 class="text-3xl font-bold text-gray-800">{{ produto.title }}</h1>
            <button @click="toggleWishlist" class="text-pink-600 hover:text-red-500 transition">
              <i :class="['text-2xl', isInWishlist ? 'fas fa-heart text-red-500' : 'far fa-heart']"></i>
            </button>
          </div>
          
          <div class="mt-2">
            <div v-if="hasDiscount" class="space-x-2 flex items-center">
              <span class="text-gray-400 line-through text-lg">{{ formatarPreco(produto.price_regular) }}</span>
              <span class="text-pink-600 font-bold text-3xl">{{ formatarPreco(produto.price_sale) }}</span>
              <span class="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">
                -{{ discountPercentage }}%
              </span>
            </div>
            <div v-else>
              <span class="text-pink-600 font-bold text-3xl">{{ formatarPreco(produto.price_regular) }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between mb-4">
            <a :href="produto.external_link" target="_blank" class="inline-block w-full bg-pink-600 text-white text-center px-6 py-3 rounded hover:bg-pink-700 transition">
              <i class="fas fa-shopping-cart mr-2"></i>
              Comprar agora
            </a>
          </div>
          
          <div v-if="produto.features" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold text-lg mb-2">Características:</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="(feature, index) in produto.features" :key="index">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 mt-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Descrição do Produto</h2>
        <p class="text-gray-600 whitespace-pre-line">{{ produto.description }}</p>
      </div>
    </section>
  </div>
</template>
