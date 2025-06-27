<template>
    <div>
        <Banner />

        <section class="py-12 mb-4">
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Produtos em Destaque</h2>
                <p class="text-gray-500">Confira os queridinhos da Progressiva Fashion</p>
            </div>
            
            <Carousel 
                :items="featuredProducts" 
                v-if="!loading && !error"
                :item-width="266"
                :visible-items="visibleItems"
                :interval="5000"
            >
                <template #item="{ item }">
                    <ProductCard :product="item" @toggle-wishlist="toggleWishlist" />
                </template>
            </Carousel>
            
            <div v-if="loading" class="text-center py-12">
                <Spinner size="lg" color="pink" />
            </div>
            
            <div v-if="error" class="text-center py-12 text-red-500">
                <p>Erro ao carregar produtos: {{ error }}</p>
            </div>
        </section>

        <Testimonials />

        <section class="py-16">
            <div class="max-w-6xl mx-auto px-4 space-y-16">
                <FeatureCard 
                    v-for="(item, index) in features" 
                    :key="item.titulo" 
                    :feature="item" 
                    :reverse="index % 2 !== 0" 
                />
            </div>
        </section>

        <section class="bg-gray-50 py-16" id="faq">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Perguntas Frequentes</h2>
                <FAQAccordion :items="faqs" />
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useApi } from '@/composables/useApi'
import { useWishlistStore } from '@/stores/wishlist'
import Banner from '@/components/Banner.vue'
import Testimonials from '@/components/Testimonials.vue'
import Carousel from '@/components/Carousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import FAQAccordion from '@/components/FAQAccordion.vue'
import Spinner from '@/components/Spinner.vue'

const { data: produtos, loading, error, get } = useApi('produtos')
const wishlist = useWishlistStore()

const visibleItems = ref(4)

const updateVisibleItems = () => {
  if (window.innerWidth < 640) visibleItems.value = 1
  else if (window.innerWidth < 768) visibleItems.value = 2
  else if (window.innerWidth < 1024) visibleItems.value = 3
  else visibleItems.value = 4
}

onMounted(() => {
  updateVisibleItems()
  window.addEventListener('resize', updateVisibleItems)
  get({ featured: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleItems)
})

const featuredProducts = computed(() => {
  return produtos.value?.filter(p => p.featured) || []
})

const toggleWishlist = (produto) => {
  wishlist.toggle(produto)
}

// Static data
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
    titulo: 'Elixir do PANTANAL',
    desc: 'O Shampoo Elixir do Pantanal foi desenvolvido para revitalizar cabelos secos e ressecados, unindo o poder do breu branco, da manteiga de murumuru e do óleo de babaçu. Com ativos naturais em sua forma mais pura e eficaz, ele nutre e protege os fios sem pesar. Sua limpeza suave respeita a estrutura capilar, restaurando maciez e brilho, enquanto mantém o couro cabeludo equilibrado e saudável, graças às propriedades nutritivas e emolientes dos ingredientes exclusivos do Pantanal. Com essência desenvolvida especialmente na região do Pantanal, esse shampoo traz um toque autêntico, conectando você à rica biodiversidade local e ao poder transformador da natureza.',
    img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337486-1.webp',
  },
  {
    titulo: 'Elixir do CERRADO',
    desc: 'O Shampoo e Condicionador Elixir do Cerrado trabalham juntos para restaurar a leveza e o brilho natural dos fios. O shampoo limpa sem ressecar, regulando a oleosidade das raízes, enquanto o condicionador nutre as pontas sem pesar. A combinação perfeita para manter seu cabelo saudável, solto e macio. Além do brilho, fim das pontas duplas e da essência exclusiva do Cerrado, que te transporta para a região, revitalizando e cuidando dos seus fios, como eles merecem. Com o uso contínuo, você percebe que a oleosidade excessiva não volta tão rápido, as pontas ficam protegidas e os fios ganham um movimento natural que antes parecia impossível. Chega de lavar os cabelos todos os dias sem ver melhora. Experimente o Elixir do Cerrado e descubra o equilíbrio que seu cabelo merece.',
    img: 'https://lojafashionoficial.com/wp-content/uploads/2025/03/337485-1.webp',
  },
  {
    titulo: 'Escova Progressiva Fashion Gold',
    desc: 'Você encontrou a solução para alisar os seus cabelos de forma segura, sem precisar se preocupar com o mau odor ou se irá danificar o seu cabelo. A Escova Progressiva Fashion Gold proporciona cabelos totalmente alinhados, com brilho espelhado e sem frizz. É a solução perfeita para você que quer estar com os cabelos bonitos e alinhados a qualquer hora do dia. A Fashion Gold foi a primeira progressiva que entregou resultados de salão em casa de forma acessível, prática e sem danificar os seus fios, com resultado garantido por até 90 dias. Você não precisa se preocupar com o medo de afinar os fios, com cheiro forte, ardência ou casquinhas no couro cabeludo ao usar nossa Escova Progressiva. A fórmula exclusiva da Fashion Gold foi desenvolvida para alisar os seus cabelos desde a primeira aplicação, mantendo-os resistentes e saudáveis, com o ativo exclusivo Kerafive22® e ingredientes de alta  qualidade, como a proteína de quinoa, o óleo Inca e o óleo de coco, que nutrem profundamente seus fios, reduzindo a quebra e o frizz, deixando seus cabelos brilhantes e macios. Tenha cabelos lisos, saudáveis e deslumbrantes com a Progressiva Fashion Gold.',
    img: 'https://lojaybera.fbitsstatic.net/img/p/escova-progressiva-500g-fashion-gold-150264/336774-10.jpg',
  },
  {
    titulo: 'Kit Cronograma Capilar Fashion Gold',
    desc: 'Esses produtos separados são excepcionais, mas, juntos, vão deixar os seus cabelos saudáveis, com brilho e movimento irão te surpreender. Com o Kit Cronograma Capilar + Shampoo Multifunção, seus cabelos ficarão macios, saudáveis, brilhantes e perfumados, devolvendo a autoestima que os cabelos bonitos e bem cuidados podem proporcionar para uma mulher. Resultado que você nota desde a primeira aplicação. O inovador Shampoo Multifunção não resseca os seus cabelos, além de fortalecer os fios e reduzir a quebra. Sua poderosa ação otimiza os benefícios das máscaras capilares do Cronograma Capilar, potencializando os seus resultados a cada uso. A formulação exclusiva do Cronograma trata todas as camadas do fio, com rápida ação - em apenas 3 segundos. Oferecendo um tratamento intensivo para todas as camadas do fio (medula, córtex e cutícula), proporciona reconstrução, nutrição e hidratação profunda dos fios danificados. Com a Fashion Gold, em apenas um combo, você já encontra o seu Cronograma Capilar completo, com tudo o que seu cabelo precisa.',
    img: 'https://lojaybera.fbitsstatic.net/img/p/kit-cronograma-capilar-com-shampoo-500ml-fashion-gold-150454/336969-1.jpg',
  }
])
</script>