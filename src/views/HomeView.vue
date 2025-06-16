<template>
    <div>

        <Banner />

        <section class="py-12 mb-4">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Produtos em Destaque</h2>
                <p class="text-gray-500">Confira os queridinhos da Progressiva Fashion</p>
            </div>
            <div ref="carousel" class="overflow-hidden max-w-7xl mx-auto px-4" @mouseenter="pause = true"
                @mouseleave="pause = false">
                <div ref="scrollContent" class="flex space-x-4 transition-all duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${offset}px)` }">
                    <div v-for="produto in produtos" :key="produto.id"
                        class="min-w-[250px] max-w-[250px] bg-white rounded-lg shadow hover:shadow-lg transition relative">
                        <img :src="produto.image" class="w-full h-48 object-cover rounded-t-lg" />
                        <div class="absolute top-2 right-2">
                            <button @click="toggleWishlist(produto)"
                                :class="['bg-white rounded-full p-2 shadow hover:bg-pink-100 transition', wishlist.isInWishlist(produto.id) ? 'text-red-500' : 'text-pink-600']"
                                class="bg-white rounded-full p-2 shadow hover:bg-pink-100 transition">
                                <i :class="['fa-heart', wishlist.isInWishlist(produto.id) ? 'fas text-red-500' : 'far text-pink-600']"
                                    class="text-lg"></i>
                            </button>
                        </div>
                        <router-link :to="`/produto/${produto.slug}`" class="text-pink-600 hover:underline">
                            <div class="p-4">
                                <h3 class="font-semibold text-lg text-gray-800 mb-1">{{ produto.title }}</h3>
                                <div v-if="produto.price_regular && produto.price_sale < produto.price_regular"
                                    class="space-x-2">
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
            </div>
        </section>

        <Testimonials />

        <!-- feature list -->
        <section class="py-16">
            <div class="max-w-6xl mx-auto px-4 space-y-6">
                <div v-for="(item, index) in features" :key="index"
                    :class="['flex flex-col md:flex-row items-center gap-8', index % 2 !== 0 ? 'md:flex-row-reverse ' : '']">
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
        <section class="relative bg-cover bg-center bg-fixed text-white py-28"
            :style="{ backgroundImage: `url(${imageUrl})` }">
            <div class="bg-black/40 absolute inset-0"></div>

            <div class="relative z-10 text-center max-w-3xl mx-auto px-4">
                <h2 class="text-4xl font-bold mb-4">{{ titulo }}</h2>
                <p class="text-lg mb-6">{{ subtitulo }}</p>
                <a href="/loja"
                    class="bg-white text-pink-600 font-bold py-2 px-6 rounded-full hover:bg-pink-100 transition">
                    {{ cta }}
                </a>
            </div>
        </section>
        <!-- end parallax-->

        <!-- <ProductGrid :produtos="produtos" :porPagina="16" /> -->

        <section class="bg-gray-50 py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Perguntas Frequentes</h2>
                <div v-for="(faq, index) in faqs" :key="index"
                    class="mb-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <button @click="toggle(index)"
                        class="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:text-pink-600 transition">
                        {{ faq.pergunta }}
                        <i :class="[ativo === index ? 'fas fa-chevron-up' : 'fas fa-chevron-down']"
                            class="text-gray-400"></i>
                    </button>
                    <transition name="fade">
                        <div v-show="ativo === index" class="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                            {{ faq.resposta }}
                        </div>
                    </transition>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Banner from '@/components/Banner.vue'
import Testimonials from '@/components/Testimonials.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { useApi } from '@/composables/useApi'
import { useWishlistStore } from '@/stores/wishlist'

const { data: produtos, loading, error, get } = useApi('produtos')

defineProps({
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1556089437-500572924e64?auto=format&fit=crop&w=1470&q=80'
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
        default: 'Ir para a loja',
    }
})

const ativo = ref(null)
const wishlist = useWishlistStore()
const carousel = ref(null)
const scrollContent = ref(null)
const offset = ref(0)
const pause = ref(false)
const itemWidth = 270 // 250px + 20px de gap
const visibleItems = 4

const toggle = (index) => {
    ativo.value = ativo.value === index ? null : index
}

const faqs = ref([
    {
        pergunta: 'Qual a diferença entre a máscara educadora e a escova progressiva?',
        resposta: 'Nenhuma diferença, apenas houve uma atualização no nome para combater a falsificação. A formulação é a mesma!'
    },
    {
        pergunta: 'A Fashion Gold possui formol?',
        resposta: 'Não. A Progressiva Fashion Gold é livre de formol e segura para uso frequente.'
    },
    {
        pergunta: 'A Fashion Gold rende quantas aplicações?',
        resposta: 'Um frasco de 1L pode render até 25 aplicações, dependendo do comprimento e volume do cabelo.'
    },
    {
        pergunta: 'A Fashion Gold possui registro na Anvisa?',
        resposta: 'Sim, todos os produtos Progressiva Fashion são regularizados e aprovados pelos órgãos competentes.'
    },
    {
        pergunta: 'O site de compra é seguro?',
        resposta: 'Totalmente seguro. Usamos criptografia SSL e métodos de pagamento confiáveis.'
    },
    {
        pergunta: 'É compatível com todas as químicas?',
        resposta: 'Sim! Nossa fórmula é compatível com outras químicas como coloração, descoloração e alisamentos.'
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
    wishlist.toggle(produtos[index])
}

function desconto(produto) {
    const p = produto.price_sale
    const o = produto.price_regular
    return Math.round(((o - p) / o) * 100)
}

onMounted(() => {

    get({ featured: true })

    const totalItems = produtos.length
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
