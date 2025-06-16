<template>
    <section class="py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                <div v-for="(produto, index) in paginated" :key="index"
                    class="bg-white rounded-lg shadow hover:shadow-lg transition relative">
                
                    <img :src="produto.image" class="w-full h-48 object-cover rounded-t" />
                    <div class="absolute top-2 right-2">
                        <button @click="toggleWishlist(produto)"
                            class="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition">
                            <i :class="['fa-heart', wishlist.isInWishlist(produto.id) ? 'fas text-red-500' : 'far text-pink-600']"
                                class="text-lg"></i>
                        </button>
                    </div>
                    <router-link :to="`/produto/${produto.slug}`" class="block">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ produto.title }}</h3>
                        <p class="text-sm text-gray-500 truncate">{{ produto.description }}</p>
                        <div v-if="produto.price_regular && produto.price_sale < produto.price_regular" class="space-x-2">
                            <span class="text-gray-400 line-through text-sm">
                                R$ {{ produto.price_regular }}
                            </span>
                            <span class="text-pink-600 font-bold text-lg">
                                R$ {{ produto.price_sale }}
                            </span>
                            <span class="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">
                                -{{ desconto(produto) }}%
                            </span>
                        </div>
                        <div v-else>
                            <span class="text-pink-600 font-bold text-lg">
                                R$ {{ produto.price_sale }}
                            </span>
                        </div>
                    </div>
                </router-link>
                </div>
            </div>

            <!-- Paginação -->
            <div class="flex justify-center space-x-2">
                <button @click="pagina--" :disabled="pagina === 1" class="px-4 py-2 border rounded disabled:opacity-30">
                    Anterior
                </button>
                <button @click="pagina++" :disabled="pagina >= totalPaginas"
                    class="px-4 py-2 border rounded disabled:opacity-30">
                    Próximo
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
const wishlist = useWishlistStore()

const props = defineProps({
    produtos: Array,
    porPagina: {
        type: Number,
        default: 16
    }
})

const pagina = ref(1)

const totalPaginas = computed(() => Math.ceil(props.produtos.length / props.porPagina))
const paginated = computed(() => {
    const start = (pagina.value - 1) * props.porPagina
    return props.produtos.slice(start, start + props.porPagina)
})

function toggleWishlist(produto) {
    wishlist.toggle(produto)
}

function desconto(produto) {
    const p = produto.price_sale
    const o = produto.price_regular
    return Math.round(((o - p) / o) * 100)
}
</script>
