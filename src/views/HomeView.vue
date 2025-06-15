<template>
    <div>
        <Banner />

        <section class="py-12 mb-4">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Produtos em Destaque</h2>
                <p class="text-gray-500">Confira os queridinhos da Progressiva Fashion</p>
            </div>

            <div
                ref="carousel"
                class="overflow-hidden max-w-7xl mx-auto px-4"
                @mouseenter="pause = true"
                @mouseleave="pause = false"
            >
                <div
                    ref="scrollContent"
                    class="flex space-x-4 transition-all duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${offset}px)` }"
                >
                    <div
                        v-for="(produto, index) in produtos"
                        :key="index"
                        class="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow hover:shadow-lg transition relative"
                    >
                        <router-link
                            :to="`/produto/${produto.slug}`"
                            class="text-pink-600 hover:underline"
                        >
                        <img :src="produto.img" class="w-full h-48 object-cover rounded-t-lg" />
                        <div class="absolute top-2 right-2">
                            <button @click="toggleWishlist(index)" class="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition">
                                <i :class="['fa-heart', wishlist.isInWishlist(produto) ? 'fas text-red-500' : 'far text-pink-600']" class="text-lg"></i>
                            </button>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-lg text-gray-800 mb-1">{{ produto.nome }}</h3>
                            <p class="text-pink-600 font-bold">R$ {{ produto.preco.toFixed(2) }}</p>
                        </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <Testimonials />
<!-- feature list -->
        <section class="py-16">
            <div class="max-w-6xl mx-auto px-4 ">
                <div
                    v-for="(item, index) in features"
                    :key="index"
                    :class="['flex flex-col md:flex-row items-center gap-8', index % 2 !== 0 ? 'md:flex-row-reverse' : '']"
                >
                    <img :src="item.img" class="w-full md:w-1/2 shadow-md object-cover" />
                    <div class="md:w-1/2">
                        <h3 class="text-2xl font-bold text-pink-600 mb-2">{{ item.titulo }}</h3>
                        <p class="text-gray-700 text-base">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </section>
<!-- end feature list -->
<!-- parallax -->
        <section
            class="relative bg-cover bg-center bg-fixed text-white py-28"
            :style="{ backgroundImage: `url(${imageUrl})` }"
        >
            <div class="bg-black/40 absolute inset-0"></div>

            <div class="relative z-10 text-center max-w-3xl mx-auto px-4">
                <h2 class="text-4xl font-bold mb-4">{{ titulo }}</h2>
                <p class="text-lg mb-6">{{ subtitulo }}</p>
                <button class="bg-white text-pink-600 font-bold py-2 px-6 rounded-full hover:bg-pink-100 transition">
                    {{ cta }}
                </button>
            </div>
        </section>
<!-- end parallax-->
        <ProductGrid :produtos="produtos" :porPagina="16" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import Testimonials from '@/components/Testimonials.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { useWishlistStore } from '@/stores/wishlist'

defineProps({
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1470&q=80'
    },
    titulo: {
        type: String,
        default: 'Transforme sua rotina de beleza',
    },
    subtitulo: {
        type: String,
        default: 'Descubra os produtos que estão revolucionando o cuidado capilar no Brasil',
    },
    cta: {
        type: String,
        default: 'Conheça a linha completa',
    }
})

const wishlist = useWishlistStore()
const carousel = ref(null)
const scrollContent = ref(null)
const offset = ref(0)
const pause = ref(false)
const itemWidth = 270 // 250px + 20px de gap
const visibleItems = 4

const produtos = ref([
    {
        nome: 'Shampoo Hidratação Profunda',
        preco: 49.9,
        img: 'https://source.unsplash.com/300x200/?hair',
        wishlist: false,
        slug: 'shampoo-hidratacao-profunda',
    },
    {
        nome: 'Máscara Capilar Nutritiva',
        preco: 59.9,
        precoOriginal: 129.9,
        img: 'https://source.unsplash.com/300x200/?cosmetics',
        wishlist: false,
        slug: 'mascara-capilar-nutritiva',
    },
    {
        nome: 'Óleo Reparador de Pontas',
        preco: 39.9,
        img: 'https://source.unsplash.com/300x200/?beauty',
        wishlist: false,
        slug: 'oleo-reparador-de-pontas',
    },
    {
        nome: 'Kit Manutenção Progressiva',
        preco: 99.9,
        img: 'https://source.unsplash.com/300x200/?spa,hair',
        wishlist: false,
        slug: 'kit-manutencao-progressiva',
    },
    {
        nome: 'Escova Fashion Gold 500ml',
        preco: 119.9,
        img: 'https://source.unsplash.com/300x200/?salon',
        wishlist: false,
        slug: 'escova-fashion-gold-500ml',
    },
    {
        nome: 'Leave-in Finalizador',
        preco: 34.9,
        img: 'https://source.unsplash.com/300x200/?makeup',
        wishlist: false,
        slug: 'leave-in-finalizador',
    }
])
const features = ref([
    {
        titulo: 'Elixir da FLORESTA',
        desc: 'O Shampoo Elixir da Floresta foi criado para cabelos frágeis e quebradiços, combinando o poder do guaraná, do óleo de açaí e da manteiga de cupuaçu em uma fórmula minimalista e equilibrada. Seus ativos naturais, presentes em sua forma mais pura, oferecem uma limpeza suave, respeitando a estrutura dos fios e equilibrando o couro cabeludo. Provenientes da rica biodiversidade da Amazônia, esses ingredientes atuam de forma sinérgica para fortalecer e proteger os fios, ajudando a aumentar sua resistência contra os danos diários. Com essência desenvolvida especialmente da Floresta Amazônica, esse shampoo deixa o cabelo macio, revitalizado e com mais resistência, sem pesar ou sobrecarregar os fios.',
        img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337487-1.webp',
    },
    {
        titulo: 'Elixir da PANTANAL',
        desc: 'O Shampoo Elixir do Pantanal foi desenvolvido para revitalizar cabelos secos e ressecados, unindo o poder do breu branco, da manteiga de murumuru e do óleo de babaçu. Com ativos naturais em sua forma mais pura e eficaz, ele nutre e protege os fios sem pesar. Sua limpeza suave respeita a estrutura capilar, restaurando maciez e brilho, enquanto mantém o couro cabeludo equilibrado e saudável, graças às propriedades nutritivas e emolientes dos ingredientes exclusivos do Pantanal. Com essência desenvolvida especialmente na região do Pantanal, esse shampoo traz um toque autêntico, conectando você à rica biodiversidade local e ao poder transformador da natureza.',
        img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337486-1.webp',
    },
    {
        titulo: 'Elixir da CERRADO',
        desc: 'O Shampoo Elixir do Pantanal foi desenvolvido para revitalizar cabelos secos e ressecados, unindo o poder do breu branco, da manteiga de murumuru e do óleo de babaçu. Com ativos naturais em sua forma mais pura e eficaz, ele nutre e protege os fios sem pesar. Sua limpeza suave respeita a estrutura capilar, restaurando maciez e brilho, enquanto mantém o couro cabeludo equilibrado e saudável, graças às propriedades nutritivas e emolientes dos ingredientes exclusivos do Pantanal. Com essência desenvolvida especialmente na região do Pantanal, esse shampoo traz um toque autêntico, conectando você à rica biodiversidade local e ao poder transformador da natureza.',
        img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337485-1.webp',
    }
])

function toggleWishlist(index) {
    wishlist.toggle(produtos.value[index])
}

onMounted(() => {
    const totalItems = produtos.value.length
    const totalWidth = itemWidth * totalItems
    const maxOffset = totalWidth - itemWidth * visibleItems

    setInterval(() => {
        if (!pause.value) {
            offset.value += itemWidth
            if (offset.value > maxOffset) {
                offset.value = 0
            }
        }
    }, 3000)
})
</script>
