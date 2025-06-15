<template>
    <section class="py-12">
        <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
            <img
                :src="produto?.img"
                class="w-full md:w-1/2 rounded shadow-lg object-cover h-80"
                alt="Imagem do produto"
            />

            <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ produto?.nome }}</h1>
                <p class="text-gray-600 text-lg mb-4">{{ produto?.desc }}</p>
                <p class="text-pink-600 text-2xl font-bold mb-6">R$ {{ produto?.preco.toFixed(2) }}</p>

                <div class="flex space-x-4">
                    <button
                        class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium transition"
                    >
                        Comprar agora
                    </button>

                    <button
                        @click="wishlist.toggle(produto)"
                        class="flex items-center px-4 py-3 border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition"
                    >
                        <i :class="['fa-heart mr-2', wishlist.isInWishlist(produto) ? 'fas text-red-500' : 'far']"></i>
                        Adicionar à wishlist
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
        img: 'https://source.unsplash.com/600x400/?hair',
    },
    {
        slug: 'mascara-nutritiva',
        nome: 'Máscara Nutritiva',
        desc: 'Nutrição intensa para fios opacos.',
        preco: 59.9,
        img: 'https://source.unsplash.com/600x400/?cosmetics',
    },
    {
        slug: 'condicionador-brilho',
        nome: 'Condicionador Brilho',
        desc: 'Deixa os cabelos radiantes e sedosos.',
        preco: 39.9,
        img: 'https://source.unsplash.com/600x400/?conditioner',
    },
    {
        slug: 'shampoo-hidratacao-profunda',
        nome: 'Óleo Capilar Reparador',
        desc: 'Para pontas duplas e frizz.',
        preco: 69.9,
        img: 'https://source.unsplash.com/600x400/?hair',
    },
    {
        slug: 'mascara-capilar-nutritiva',
        nome: 'Máscara Capilar Nutritiva',
        desc: 'Hidratação profunda para cabelos secos.',
        preco: 79.9,
        img: 'https://source.unsplash.com/600x400/?mask',
    },
    {
        slug: 'leave-in-finalizador',
        nome: 'Leave-in Finalizador',
        desc: 'Proteção térmica e controle de frizz.',
        preco: 34.9,
        img: 'https://source.unsplash.com/600x400/?leavein',
    },
    // ...mais produtos
]

onMounted(() => {
    produto.value = produtos.find(p => p.slug === route.params.slug)
})
</script>
