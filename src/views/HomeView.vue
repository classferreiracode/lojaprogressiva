<template>
  <div ref="pageRef" class="section-shell">
    <section class="ambient-grid overflow-hidden px-4 pb-12 pt-6 md:px-6 md:pb-20 md:pt-12" aria-labelledby="home-hero-title">
      <div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8">
        <div class="space-y-6 md:space-y-8">
          <span class="eyebrow" data-animate="hero-item">Curadoria parceira Ybera e Fashion Gold</span>

          <div class="space-y-4 md:space-y-5">
            <h1 id="home-hero-title" class="brand-heading max-w-4xl text-[2.8rem] font-semibold leading-[0.94] text-[#1f1720] sm:text-5xl md:text-7xl">
              Tratamentos Ybera e Fashion Gold organizados por necessidade real do fio.
            </h1>
            <p data-animate="hero-item" class="max-w-2xl text-base leading-7 text-[#6e5b64] md:text-lg md:leading-8">
              Progressivas, cronograma capilar, hidratação, reconstrução, nutrição, matização, cuidado diário e linhas
              pensadas para lisos, alisados, cacheados, loiros, cabelos danificados, oleosos e mistos.
            </p>
          </div>

          <div data-animate="hero-item" class="flex flex-col gap-4 sm:flex-row">
            <RouterLink to="/loja" class="primary-cta">
              Explorar produtos em destaque
              <i class="fas fa-arrow-right text-sm"></i>
            </RouterLink>
            <a href="#autoridade" class="secondary-cta">
              Ver como escolher melhor
              <i class="fas fa-shield-alt text-sm"></i>
            </a>
          </div>

          <div ref="metricsRef" class="grid gap-3 sm:grid-cols-3 md:gap-4">
            <article v-for="metric in heroMetrics" :key="metric.title" class="metric-card" data-animate="metric-card">
              <p class="text-3xl font-extrabold text-[#782744]">{{ metric.value }}</p>
              <p class="mt-2 text-sm font-semibold text-[#1f1720]">{{ metric.title }}</p>
              <p class="mt-1 text-sm text-[#6e5b64]">{{ metric.description }}</p>
            </article>
          </div>
        </div>

        <div data-animate="hero-item" class="relative">
          <div class="glass-panel relative overflow-hidden rounded-[2rem] p-3 sm:p-4 md:p-6">
            <div class="absolute inset-x-10 top-0 h-24 rounded-b-full bg-[#d4ad63]/20 blur-3xl"></div>
            <Banner :slides="bannerSlides" />

          <div class="mt-4 grid gap-3 md:mt-6 md:grid-cols-2">
            <div class="rounded-[1.5rem] border border-[#782744]/10 bg-white/85 p-4">
                <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#782744]">Seleção orientada</p>
                <p class="mt-2 text-base font-bold text-[#1f1720] md:text-lg">Mais vendidos e tratamentos com alta procura</p>
                <p class="mt-2 text-sm leading-6 text-[#6e5b64]">Progressiva Fashion Gold, kits de manutenção, hidratação e reconstrução organizados para facilitar a escolha.</p>
              </div>
              <div class="rounded-[1.5rem] border border-[#782744]/10 bg-[#782744] p-4 text-white">
                <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Diferencial</p>
                <p class="mt-2 text-base font-bold md:text-lg">Encontre mais rápido por necessidade, tipo de cabelo, linha ou etapa do tratamento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="autoridade" class="px-4 py-8 md:px-6 md:py-10" aria-labelledby="autoridade-title">
      <div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
        <article v-for="item in authorityPillars" :key="item.title" class="luxury-card rounded-[1.75rem] p-5 md:p-6" data-animate="authority-card">
          <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
            <i :class="item.icon"></i>
          </div>
          <h3 class="text-lg font-bold text-[#1f1720]">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-[#6e5b64]">{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="px-4 py-8 md:px-6 md:py-10" aria-labelledby="quick-paths-title">
      <div class="mx-auto max-w-7xl rounded-[2.25rem] border border-[#782744]/10 bg-white/80 p-5 md:p-8">
        <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div class="section-heading">
            <span class="eyebrow section-kicker">Encontre mais rápido</span>
            <h2 id="quick-paths-title" class="brand-heading text-3xl font-semibold text-[#1f1720] sm:text-4xl md:text-5xl">Entradas claras para quem já sabe o que procura.</h2>
            <p class="mt-3 text-base leading-7 text-[#6e5b64]">
              Escolha seu caminho pela necessidade do fio e chegue mais rápido ao tratamento que faz sentido para sua rotina.
            </p>
          </div>
          <RouterLink to="/loja" class="secondary-cta">Explorar toda a curadoria</RouterLink>
        </div>

        <div class="grid gap-4 md:grid-cols-4">
          <RouterLink
            v-for="item in quickPaths"
            :key="item.title"
            to="/loja"
            class="luxury-card rounded-[1.5rem] p-4 transition duration-300 hover:-translate-y-1 md:p-5"
          >
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
              <i :class="item.icon"></i>
            </div>
            <h3 class="mt-4 text-lg font-bold text-[#1f1720]">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-[#6e5b64]">{{ item.description }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="px-4 py-12 md:px-6 md:py-14" aria-labelledby="mais-vendidos-title">
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
          <span class="eyebrow">Mais vendidos</span>
          <h2 id="mais-vendidos-title" class="brand-heading mt-4 text-3xl font-semibold text-[#1f1720] sm:text-4xl md:text-5xl">Produtos que sustentam reputação e recompra</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-[#6e5b64]">
              Itens com alta procura para quem quer comprar com mais segurança e partir de escolhas já bem aceitas pelo público.
            </p>
          </div>
          <RouterLink to="/loja" class="secondary-cta">Ver catálogo completo</RouterLink>
        </div>

        <Carousel
          v-if="showCarousel"
          :items="featuredProducts"
          :item-width="290"
          :visible-items="visibleItems"
          :interval="5000"
        >
          <template #item="{ item }">
            <div class="px-2 pb-4" data-animate="carousel-card">
              <ProductCard :product="item" @toggle-wishlist="toggleWishlist" />
            </div>
          </template>
        </Carousel>

        <div v-else-if="loading" class="py-12 text-center">
          <Spinner size="lg" color="pink" />
        </div>

        <div v-else-if="error" class="rounded-[1.75rem] border border-red-200 bg-white/80 px-6 py-12 text-center text-red-500">
          <p>Erro ao carregar produtos: {{ error }}</p>
        </div>

        <div v-else class="rounded-[1.75rem] border border-[#782744]/10 bg-white/80 px-6 py-12 text-center text-[#6e5b64]">
          <p>Nenhum produto em destaque no momento.</p>
        </div>
      </div>
    </section>

    <section class="px-4 py-12 md:px-6 md:py-14" aria-labelledby="posicionamento-title">
      <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="glass-panel rounded-[2rem] p-6 md:p-8">
          <span class="eyebrow">Posicionamento premium</span>
            <h2 id="posicionamento-title" class="brand-heading mt-6 text-3xl font-semibold text-[#1f1720] sm:text-4xl md:text-5xl">
            Escolha com mais critério e menos dúvida.
          </h2>
          <p class="mt-5 text-base leading-8 text-[#6e5b64]">
            Aqui você encontra linhas como Fashion Gold, tratamentos por benefício e organização por necessidade para comparar melhor antes de comprar.
          </p>

          <div class="mt-8 space-y-4">
            <div v-for="point in strategicPoints" :key="point.title" class="rounded-[1.5rem] border border-[#782744]/10 bg-white/70 p-5" data-animate="strategy-card">
              <div class="flex items-start gap-4">
                <div class="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
                  <i :class="point.icon"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-[#1f1720]">{{ point.title }}</h3>
                  <p class="mt-2 text-sm leading-6 text-[#6e5b64]">{{ point.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Testimonials :items="testimonials" />
      </div>
    </section>

    <section class="px-4 py-12 md:px-6 md:py-14" aria-labelledby="linhas-title">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 max-w-3xl">
          <span class="eyebrow">Linhas em destaque</span>
          <h2 id="linhas-title" class="brand-heading mt-4 text-3xl font-semibold text-[#1f1720] sm:text-4xl md:text-5xl">Tratamentos apresentados como coleções de autoridade</h2>
          <p class="mt-3 text-base leading-7 text-[#6e5b64]">
            Conheça as linhas com mais contexto sobre benefício, perfil de uso e momento certo para entrar na sua rotina.
          </p>
        </div>

        <div class="space-y-10">
          <FeatureCard
            v-for="(item, index) in features"
            :key="item.titulo"
            :feature="item"
            :reverse="index % 2 !== 0"
            data-animate="feature-card"
          />
        </div>
      </div>
    </section>

    <section id="faq" class="px-4 pb-16 pt-12 md:px-6 md:pb-20 md:pt-14" aria-labelledby="faq-title">
      <div class="mx-auto max-w-4xl rounded-[2rem] border border-[#782744]/10 bg-white/85 p-6 shadow-[0_18px_50px_rgba(49,20,35,0.08)] md:p-12">
        <div class="text-center">
          <span class="eyebrow">Segurança e credibilidade</span>
          <h2 id="faq-title" class="brand-heading mt-4 text-3xl font-semibold text-[#1f1720] sm:text-4xl md:text-5xl">Perguntas frequentes antes da decisão de compra</h2>
          <p class="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#6e5b64]">
            Respostas claras sobre uso, compatibilidade, rotina e segurança para reduzir dúvidas antes da compra.
          </p>
        </div>
        <div class="mt-10">
          <FAQAccordion :items="faqs" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useWishlistStore } from '@/stores/wishlist'
import homeContent from '@/data/homeContent.json'
import Banner from '@/components/Banner.vue'
import Testimonials from '@/components/Testimonials.vue'
import Carousel from '@/components/Carousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import FeatureCard from '@/components/FeatureCard.vue'
import FAQAccordion from '@/components/FAQAccordion.vue'
import Spinner from '@/components/Spinner.vue'
import { animateIntro, animateReveal, animateStaggerChildren, gsap, prefersReducedMotion } from '@/utils/animations'

const { data: homeData, loading, error, get } = useApi('home')
const wishlist = useWishlistStore()

const features = homeContent.features || []
const pageRef = ref(null)
const metricsRef = ref(null)
let ctx = null

const bannerSlides = computed(() => {
  if (!homeData.value?.banners?.length) return homeContent.bannerSlides || []

  return homeData.value.banners.map((banner) => ({
    text: banner.alt_text || 'Banner Ybera e Fashion Gold',
    link: banner.link || '/loja',
    img: banner.image
  }))
})

const testimonials = computed(() => {
  if (!homeData.value?.testimonials?.length) return homeContent.testimonials || []

  return homeData.value.testimonials.map((item) => ({
    nome: item.name,
    text: item.content,
    img: item.photo
  }))
})

const faqs = computed(() => {
  if (!homeData.value?.faqs?.length) return homeContent.faqs || []

  return homeData.value.faqs.map((item) => ({
    pergunta: item.question,
    resposta: item.answer
  }))
})

const heroMetrics = [
  { value: 'Por necessidade', title: 'Navegação mais relevante', description: 'Alisamento, cronograma, hidratação, nutrição, reconstrução e cuidado diário.' },
  { value: 'Fashion Gold', title: 'Linha com alta procura', description: 'Progressivas, manutenção pós-progressiva e kits com forte apelo comercial.' },
  { value: 'Tipo de cabelo', title: 'Busca mais orientada', description: 'Lisos, alisados, cacheados, loiros, danificados, oleosos e mistos.' }
]

const authorityPillars = [
  { icon: 'fas fa-crown', title: 'Repertório oficial da marca', description: 'Conteúdo orientado por categorias, necessidades e linhas que aparecem no site da Ybera.' },
  { icon: 'fas fa-flask', title: 'Tratamento por benefício', description: 'A comunicação prioriza frizz, brilho, reconstrução, nutrição, crescimento e manutenção.' },
  { icon: 'fas fa-truck-fast', title: 'Mais leitura de catálogo', description: 'A vitrine deixa de ser genérica e passa a parecer um e-commerce capilar especializado.' },
  { icon: 'fas fa-repeat', title: 'Melhor base para SEO', description: 'As palavras-chave se aproximam do universo real de busca da marca e do consumidor.' }
]

const quickPaths = [
  { icon: 'fas fa-wind', title: 'Alisamento e frizz', description: 'Entre por tratamentos voltados a controle de volume, alinhamento e efeito disciplinado.' },
  { icon: 'fas fa-droplet', title: 'Hidratação e brilho', description: 'Para fios opacos, ressecados ou sem vida, com foco em maciez e toque sedoso.' },
  { icon: 'fas fa-shield-heart', title: 'Reconstrução e força', description: 'Escolha produtos para cabelos fragilizados, danificados ou com quebra frequente.' },
  { icon: 'fas fa-layer-group', title: 'Kits e cronograma', description: 'Monte uma rotina mais completa com linhas pensadas para manutenção e recompra.' }
]

const strategicPoints = [
  { icon: 'fas fa-star', title: 'Mais aderência à busca', description: 'Os textos agora conversam com termos como progressiva, cronograma capilar, hidratação, reconstrução e cuidado diário.' },
  { icon: 'fas fa-gem', title: 'Mais coerência com a Ybera', description: 'A comunicação foi ajustada para refletir marcas, categorias e necessidades mostradas na vitrine oficial.' },
  { icon: 'fas fa-bolt', title: 'Mais clareza comercial', description: 'O usuário entende melhor para que serve cada linha e encontra mais rápido a rotina de tratamento que procura.' }
]

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
  get()
  ctx = gsap.context(() => {
    animateIntro('[data-animate="hero-item"]')
    animateStaggerChildren(metricsRef.value, '[data-animate="metric-card"]')
    animateReveal('[data-animate="authority-card"]')
    animateReveal('[data-animate="strategy-card"]')
    animateReveal('[data-animate="feature-card"]', { y: 56 })
  }, pageRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleItems)
  ctx?.revert()
})

const featuredProducts = computed(() => {
  return homeData.value?.destaques || []
})

const showCarousel = computed(() => {
  return !loading.value && !error.value && featuredProducts.value.length > 0
})

const toggleWishlist = (produto) => {
  wishlist.toggle(produto)
}

watch(showCarousel, async (value) => {
  if (!value || prefersReducedMotion()) return
  await nextTick()
  gsap.fromTo(
    '[data-animate="carousel-card"]',
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }
  )
})
</script>
