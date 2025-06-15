<template>
    <Banner />
    <section class="py-12" v-if="produto">
        <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">

            <img :src="produto?.img" class="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
                alt="Imagem do produto" />

            <div class="flex-1 space-y-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ produto?.nome }}</h1>
                <p class="text-gray-600 text-lg mb-4">{{ produto?.desc }}</p>
                <div class="mt-2">
                    <div v-if="produto.precoOriginal && produto.preco < produto.precoOriginal" class="space-x-2">
                        <span class="text-gray-400 line-through text-sm">
                            R$ {{ produto.precoOriginal.toFixed(2) }}
                        </span>
                        <span class="text-pink-600 font-bold text-lg">
                            R$ {{ produto.preco.toFixed(2) }}
                        </span>
                        <span class="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">
                            -{{ desconto(produto) }}%
                        </span>
                    </div>
                    <div v-else>
                        <span class="text-pink-600 font-bold text-lg">
                            R$ {{ produto.preco.toFixed(2) }}
                        </span>
                    </div>
                </div>

                <div class="flex space-x-4">
                    <a href="#"
                        class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium transition">
                        Comprar agora
                    </a>

                    <button @click="wishlist.toggle(produto)"
                        class="flex items-center px-4 py-3 border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition">
                        <i :class="['fa-heart mr-2', wishlist.isInWishlist(produto) ? 'fas text-red-500' : 'far']"></i>
                        {{ wishlist.isInWishlist(produto) ? 'Remover da Wishlist' : 'Adicionar à Wishlist' }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Banner from '@/components/Banner.vue'
import { useWishlistStore } from '@/stores/wishlist'

const route = useRoute()
const wishlist = useWishlistStore()
const produto = ref(null)

const produtos = [
    {
        slug: 'shampoo-hidratacao',
        nome: 'Shampoo Hidratação',
        desc: 'Para cabelos secos e danificados.',
        preco: 49.9,
        precoOriginal: 89.9,
        img: 'https://source.unsplash.com/600x400/?hair',
    },
    {
        slug: 'mascara-nutritiva',
        nome: 'Máscara Nutritiva',
        desc: 'Nutrição intensa para fios opacos.',
        preco: 59.9,
        precoOriginal: 99.9,
        img: 'https://source.unsplash.com/600x400/?cosmetics',
    },
    {
        slug: 'condicionador-brilho',
        nome: 'Condicionador Brilho',
        desc: 'Deixa os cabelos radiantes e sedosos.',
        preco: 39.9,
        precoOriginal: 69.9,
        img: 'https://source.unsplash.com/600x400/?conditioner',
    },
    {
        slug: 'shampoo-hidratacao-profunda',
        nome: 'Óleo Capilar Reparador',
        desc: 'Para pontas duplas e frizz.',
        preco: 69.9,
        precoOriginal: 109.9,
        img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337487-1.webp',
    },
    {
        slug: 'mascara-capilar-nutritiva',
        nome: 'Máscara Capilar Nutritiva',
        desc: 'Hidratação profunda para cabelos secos.',
        preco: 79.9,
        precoOriginal: 129.9,
        img: 'https://source.unsplash.com/600x400/?mask',
    },
    {
        slug: 'leave-in-finalizador',
        nome: 'Leave-in Finalizador',
        desc: 'Proteção térmica e controle de frizz.',
        preco: 34.9,
        precoOriginal: 59.9,
        img: 'https://source.unsplash.com/600x400/?leavein',
    },
    // ...mais produtos
]

function desconto(produto) {
  const p = produto.preco
  const o = produto.precoOriginal
  return Math.round(((o - p) / o) * 100)
}

onMounted(() => {
    produto.value = produtos.find(p => p.slug === route.params.slug)
    if (!produto.value) {
        console.error('Produto não encontrado:', route.params.slug)
    }
})
</script>
