<template>
  <div>
    <Banner />
    <section class="py-12">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Produtos em Destaque</h2>
        <p class="text-gray-500">Confira os queridinhos da Progressiva Fashion</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto">
        <div v-for="(produto, index) in produtos" :key="index" class="bg-white rounded-lg shadow hover:shadow-lg transition relative">
          <img :src="produto.img" class="w-full h-48 object-cover" />
          <div class="absolute top-2 right-2">
            <button @click="toggleWishlist(index)" class="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition">
              <i :class="['fa-heart', produto.wishlist ? 'fas text-red-500' : 'far text-pink-600']" class="text-lg"></i>
            </button>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg text-gray-800 mb-1">{{ produto.nome }}</h3>
            <p class="text-pink-600 font-bold">R$ {{ produto.preco.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from '@/components/Banner.vue'

const produtos = ref([
  {
    nome: 'Shampoo Hidratação Profunda',
    preco: 49.9,
    img: 'https://source.unsplash.com/300x200/?hair',
    wishlist: false,
  },
  {
    nome: 'Máscara Capilar Nutritiva',
    preco: 59.9,
    img: 'https://source.unsplash.com/300x200/?cosmetics',
    wishlist: false,
  },
  {
    nome: 'Óleo Reparador de Pontas',
    preco: 39.9,
    img: 'https://source.unsplash.com/300x200/?beauty',
    wishlist: false,
  },
  {
    nome: 'Kit Manutenção Progressiva',
    preco: 99.9,
    img: 'https://source.unsplash.com/300x200/?spa,hair',
    wishlist: false,
  },
])

function toggleWishlist(index) {
  produtos.value[index].wishlist = !produtos.value[index].wishlist
}
</script>
