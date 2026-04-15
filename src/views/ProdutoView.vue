<script setup>
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import { formatarPreco } from '@/utils/helpers'
import { setMeta, truncateText } from '@/utils/seo'
import Spinner from '@/components/Spinner.vue'
import { animateIntro, animateReveal, gsap } from '@/utils/animations'

const route = useRoute()
const wishlist = useWishlistStore()
const { data: produto, loading, error, get } = useApi(`produtos/${route.params.slug}`)

const selectedImage = ref('')
const pageRef = ref(null)
const brandName = 'Loja Progressiva Fashion'
const baseUrl = 'https://www.lojaprogressivafashion.com.br'
let ctx = null

const trustPillars = [
  { icon: 'fas fa-shield-alt', title: 'Compra segura', description: 'Checkout protegido e comunicação clara em toda a jornada.' },
  { icon: 'fas fa-flask', title: 'Curadoria especialista', description: 'Seleção focada em alisamento, tratamento e performance capilar.' },
  { icon: 'fas fa-truck', title: 'Entrega nacional', description: 'Venda afiliada com envio direto da operação parceira.' }
]

onMounted(() => {
  get().then(() => {
    if (produto.value) {
      selectedImage.value = produto.value.image
    }
  })
  ctx = gsap.context(() => {
    animateIntro('[data-animate="product-hero"]')
    animateReveal('[data-animate="product-reveal"]')
  }, pageRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

watch(produto, (value) => {
  if (!value) return
  const title = `${value.title} | ${brandName}`
  const description = truncateText(
    value.description ||
    `${value.title} com curadoria Ybera e Fashion Gold para tratamento capilar, manutenção e compra segura.`
  )
  const image = value.image || `${baseUrl}/logo-progressiva.png`
  const slug = value.slug || route.params.slug
  const url = `${baseUrl}/produto/${slug}`
  const keywords = [
    value.title,
    'ybera',
    'fashion gold',
    'tratamento capilar',
    'progressiva',
    'cronograma capilar',
    'hidratação capilar',
    'reconstrução capilar'
  ].join(', ')

  setMeta({
    title,
    description,
    image,
    url,
    type: 'product',
    keywords,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: value.title,
      description,
      image,
      sku: String(value.id || slug),
      url,
      brand: {
        '@type': 'Brand',
        name: value.title?.toLowerCase().includes('fashion gold') ? 'Fashion Gold' : 'Ybera'
      },
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'BRL',
        price: String(value.price_sale ?? value.price_regular ?? ''),
        availability: 'https://schema.org/InStock'
      }
    }
  })
})

const galleryImages = computed(() => {
  if (!produto.value) return []
  const images = [produto.value.image, ...(produto.value.images || [])].filter(Boolean)
  return [...new Set(images)]
})

const isInWishlist = computed(() => {
  return produto.value ? wishlist.isInWishlist(produto.value) : false
})

const toggleWishlist = () => {
  if (produto.value) {
    wishlist.toggle(produto.value)
  }
}

const formatFeatureNumber = (value) => String(value).padStart(2, '0')

const hasDiscount = computed(() => {
  return produto.value?.price_regular && produto.value?.price_sale < produto.value?.price_regular
})

const currentPrice = computed(() => {
  if (!produto.value) return ''
  return formatarPreco(produto.value.price_sale ?? produto.value.price_regular)
})

const regularPrice = computed(() => {
  if (!produto.value?.price_regular) return ''
  return formatarPreco(produto.value.price_regular)
})

const discountPercentage = computed(() => {
  if (!produto.value || !hasDiscount.value) return 0
  return Math.round(((produto.value.price_regular - produto.value.price_sale) / produto.value.price_regular) * 100)
})

const parsedDescription = computed(() => {
  if (!produto.value?.description) return []
  return produto.value.description.split('\n').map((item) => item.trim()).filter(Boolean)
})

const featureList = computed(() => {
  if (produto.value?.features?.length) return produto.value.features
  if (!produto.value?.description) return []

  return produto.value.description
    .split('.')
    .map((item) => item.trim())
    .filter((item) => item.length > 40)
    .slice(0, 4)
})
</script>

<template>
  <div ref="pageRef" class="px-4 pb-14 pt-6 md:px-6 md:pb-16 md:pt-10">
    <section v-if="loading" class="mx-auto flex max-w-7xl justify-center py-20">
      <Spinner size="lg" color="pink" />
    </section>

    <section v-else-if="error" class="mx-auto max-w-4xl rounded-[2rem] border border-red-200 bg-white/85 px-6 py-14 text-center">
      <p class="text-red-500">Erro ao carregar produto: {{ error }}</p>
      <button @click="get" class="primary-cta mt-5">Tentar novamente</button>
    </section>

    <article v-else-if="produto" class="mx-auto max-w-7xl space-y-8 md:space-y-10" aria-labelledby="product-title">
      <div class="glass-panel rounded-[2.25rem] p-5 md:p-8">
        <div class="mb-6 md:mb-8">
          <div data-animate="product-hero">
            <span class="eyebrow">Produto em destaque</span>
            <h1 id="product-title" class="brand-heading mt-4 text-[2.7rem] font-semibold leading-[0.95] text-[#1f1720] sm:text-5xl md:text-6xl">{{ produto.title }}</h1>
            <p class="mt-3 max-w-3xl text-sm leading-7 text-[#6e5b64] md:text-base">
              Veja benefícios, faixa de preço e pontos principais para entender se este tratamento faz sentido para o seu objetivo.
            </p>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div data-animate="product-reveal" class="space-y-4">
            <div class="luxury-card flex min-h-[20rem] items-center justify-center overflow-hidden rounded-[2rem] p-4 md:min-h-[31rem] md:p-6">
              <img
                :src="selectedImage || produto.image"
                :alt="produto.title"
                class="max-h-[18rem] w-full rounded-[1.5rem] object-contain md:max-h-[27rem]"
              />
            </div>

            <div v-if="galleryImages.length > 1" class="grid grid-cols-4 gap-2 md:gap-3">
              <button
                v-for="(img, index) in galleryImages"
                :key="`${img}-${index}`"
                @click="selectedImage = img"
                class="overflow-hidden rounded-[1.25rem] border-2 bg-white/80 transition"
                :class="selectedImage === img ? 'border-[#b6406f] shadow-[0_10px_30px_rgba(120,39,68,0.16)]' : 'border-transparent'"
                :aria-label="`Selecionar imagem ${index + 1} de ${produto.title}`"
              >
                <img :src="img" :alt="`${produto.title} ${index + 1}`" class="aspect-square w-full object-cover" />
              </button>
            </div>
          </div>

          <div data-animate="product-reveal" class="space-y-5 md:space-y-6">
            <div class="luxury-card rounded-[2rem] p-5 md:p-8">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#782744]">
                  Curadoria profissional
                </span>
                <span v-if="hasDiscount" class="rounded-full bg-[#782744] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                  Economia de {{ discountPercentage }}%
                </span>
              </div>

              <div class="mt-6 flex flex-wrap items-end gap-3">
                <span class="text-3xl font-extrabold text-[#b6406f] sm:text-4xl md:text-5xl">{{ currentPrice }}</span>
                <span v-if="hasDiscount" class="pb-1 text-lg text-[#9d8a93] line-through">{{ regularPrice }}</span>
              </div>

              <p class="mt-4 text-sm leading-7 text-[#6e5b64]">
                Uma leitura clara para avaliar resultado esperado, segurança na compra e encaixe na sua rotina de cuidados.
              </p>

              <div class="mt-6 grid gap-3 sm:grid-cols-3">
                <article v-for="item in trustPillars" :key="item.title" class="rounded-[1.5rem] border border-[#782744]/10 bg-white/80 p-4">
                  <div class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
                    <i :class="item.icon"></i>
                  </div>
                  <h2 class="mt-3 text-sm font-bold text-[#1f1720]">{{ item.title }}</h2>
                  <p class="mt-2 text-xs leading-6 text-[#6e5b64]">{{ item.description }}</p>
                </article>
              </div>

              <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                <a :href="produto.external_link" target="_blank" class="primary-cta flex-1">
                  <i class="fas fa-shopping-bag text-sm"></i>
                  Comprar agora
                </a>
                <button @click="toggleWishlist" class="secondary-cta flex-1" :class="isInWishlist ? '!border-[#b6406f]/30 !bg-[#fdf1f5] !text-[#782744]' : ''" :aria-pressed="isInWishlist ? 'true' : 'false'">
                  <i :class="[isInWishlist ? 'fas text-red-500' : 'far text-[#b6406f]', 'fa-heart text-sm']"></i>
                  {{ isInWishlist ? 'Remover dos favoritos' : 'Favoritar produto' }}
                </button>
              </div>
            </div>

            <div v-if="featureList.length" class="rounded-[2rem] border border-[#782744]/10 bg-white/85 p-5 md:p-8">
              <span class="eyebrow">Destaques do produto</span>
              <div class="mt-5 grid gap-3 md:mt-6 md:gap-4 md:grid-cols-2">
                <article v-for="(feature, index) in featureList" :key="index" class="rounded-[1.5rem] bg-[#fff8f1] p-4">
                  <div class="flex items-start gap-3">
                    <span class="mt-1 inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#782744] px-2 text-xs font-extrabold tracking-[0.08em] text-white">
                      {{ formatFeatureNumber(index + 1) }}
                    </span>
                    <p class="text-sm leading-7 text-[#4f4047]">{{ feature }}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <section data-animate="product-reveal" class="rounded-[2rem] border border-[#782744]/10 bg-white/85 p-5 md:p-8">
          <span class="eyebrow">Descrição detalhada</span>
          <h2 class="brand-heading mt-4 text-3xl font-semibold text-[#1f1720] md:text-4xl">Entenda melhor este produto</h2>
          <div class="mt-5 space-y-4 text-sm leading-7 text-[#5d4d55] md:mt-6 md:space-y-5 md:text-base md:leading-8">
            <p v-for="(paragraph, index) in parsedDescription" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <aside data-animate="product-reveal" class="space-y-5 md:space-y-6">
          <section class="luxury-card rounded-[2rem] p-5 md:p-8">
            <span class="eyebrow">Experiência premium</span>
            <h2 class="brand-heading mt-4 text-3xl font-semibold text-[#1f1720] md:text-4xl">Por que escolher este tratamento</h2>
            <div class="mt-5 space-y-3 md:mt-6 md:space-y-4">
              <div class="rounded-[1.5rem] border border-[#782744]/10 bg-white/70 p-4">
                <h3 class="text-lg font-bold text-[#1f1720]">Resultado com aparência de salão</h3>
                <p class="mt-2 text-sm leading-6 text-[#6e5b64]">Fórmula pensada para entregar alinhamento, brilho e toque disciplinado, valorizando a beleza dos fios desde a primeira aplicação.</p>
              </div>
              <div class="rounded-[1.5rem] border border-[#782744]/10 bg-white/70 p-4">
                <h3 class="text-lg font-bold text-[#1f1720]">Cuidado direcionado para sua rotina</h3>
                <p class="mt-2 text-sm leading-6 text-[#6e5b64]">A curadoria combina performance e praticidade para quem busca tratar, controlar o frizz e manter os cabelos bonitos por mais tempo.</p>
              </div>
              <div class="rounded-[1.5rem] border border-[#782744]/10 bg-white/70 p-4">
                <h3 class="text-lg font-bold text-[#1f1720]">Compra segura com seleção profissional</h3>
                <p class="mt-2 text-sm leading-6 text-[#6e5b64]">Você encontra uma escolha de alto padrão, com entrega nacional e apoio de uma seleção focada em tratamento capilar de alta performance.</p>
              </div>
            </div>
          </section>

          <section class="rounded-[2rem] bg-[#782744] p-5 text-white md:p-8">
            <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Pronto para comprar</p>
            <h2 class="brand-heading mt-4 text-3xl font-semibold md:text-4xl">Leve este cuidado para sua rotina</h2>
            <p class="mt-4 text-sm leading-7 text-white/80">
              Se este produto combina com o que você procura, avance para a compra e conclua seu pedido com segurança.
            </p>
            <a
              :href="produto.external_link"
              target="_blank"
              class="primary-cta mt-6 w-full !bg-white !text-[#21161d] hover:!opacity-95"
            >
              <span class="!text-[#21161d]">Finalizar compra</span>
              <i class="fas fa-arrow-right text-sm !text-[#21161d]"></i>
            </a>
          </section>
        </aside>
      </div>
    </article>
  </div>
</template>
