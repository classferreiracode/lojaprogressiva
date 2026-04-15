<template>
  <div ref="pageRef" class="px-4 pb-16 pt-8 md:px-6 md:pt-10">
    <section class="mx-auto max-w-7xl space-y-10" aria-labelledby="contact-title">
      <div class="glass-panel rounded-[2.25rem] p-6 md:p-8">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-animate="contact-hero">
            <span class="eyebrow">Atendimento e relacionamento</span>
            <h1 id="contact-title" class="brand-heading mt-4 max-w-3xl text-4xl font-semibold text-[#1f1720] md:text-6xl">Fale com a equipe e resolva com rapidez.</h1>
            <p class="mt-4 max-w-2xl text-base leading-8 text-[#6e5b64]">
              Tire dúvidas sobre produtos, receba ajuda para encontrar o tratamento ideal e entre em contato sobre pedidos, rastreamento ou suporte pós-venda.
            </p>

            <div class="mt-8 grid gap-4 md:grid-cols-3">
              <article v-for="item in contactHighlights" :key="item.title" class="metric-card" data-animate="contact-card">
                <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
                  <i :class="item.icon"></i>
                </div>
                <h2 class="mt-4 text-sm font-bold text-[#1f1720]">{{ item.title }}</h2>
                <p class="mt-2 text-sm leading-6 text-[#6e5b64]">{{ item.description }}</p>
              </article>
            </div>
          </div>

          <div data-animate="contact-hero" class="rounded-[2rem] bg-[#782744] p-6 text-white md:p-8">
            <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Canais principais</p>
            <ul class="mt-6 space-y-4">
              <li>
              <a href="https://wa.me/5515992455005" target="_blank" class="flex items-center gap-4 rounded-[1.5rem] bg-white/10 px-5 py-4 transition hover:bg-white/15">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/16"><i class="fab fa-whatsapp text-xl"></i></span>
                <span>
                  <strong class="block text-base">WhatsApp comercial</strong>
                  <span class="text-sm text-white/75">Atendimento rápido para compra, dúvidas e acompanhamento</span>
                </span>
              </a>
              </li>

              <li class="flex items-center gap-4 rounded-[1.5rem] bg-white/10 px-5 py-4">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/16"><i class="fas fa-envelope text-lg"></i></span>
                <span>
                  <strong class="block text-base">E-mail de contato</strong>
                  <span class="text-sm text-white/75">Para mensagens detalhadas, suporte e solicitações gerais</span>
                </span>
              </li>

              <li>
              <a href="https://chat.whatsapp.com/Fvp41d8vrTaBw81BxGAWk1" target="_blank" class="flex items-center gap-4 rounded-[1.5rem] bg-white/10 px-5 py-4 transition hover:bg-white/15">
                <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/16"><i class="fas fa-users text-lg"></i></span>
                <span>
                  <strong class="block text-base">Grupo VIP</strong>
                  <span class="text-sm text-white/75">Receba novidades, ofertas e oportunidades especiais</span>
                </span>
              </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <aside class="space-y-6">
          <section data-animate="contact-reveal" class="rounded-[2rem] border border-[#782744]/10 bg-white/85 p-6 md:p-8">
            <span class="eyebrow">Fale com a equipe</span>
            <h2 class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720]">Como podemos ajudar você</h2>
            <div class="mt-6 space-y-4">
              <article v-for="item in supportBlocks" :key="item.title" class="rounded-[1.5rem] bg-[#fff8f1] p-5">
                <div class="flex items-start gap-4">
                  <div class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6d5df] text-[#782744]">
                    <i :class="item.icon"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-[#1f1720]">{{ item.title }}</h3>
                    <p class="mt-2 text-sm leading-7 text-[#6e5b64]">{{ item.description }}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section data-animate="contact-reveal" class="luxury-card rounded-[2rem] p-6 md:p-8">
            <span class="eyebrow">Atendimento objetivo</span>
            <h2 class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720]">Antes de enviar, conte o que você precisa</h2>
            <p class="mt-4 text-sm leading-7 text-[#6e5b64]">
              Se a dúvida for sobre a escolha de um produto, informe seu tipo de cabelo, objetivo e rotina atual. Se for sobre pedido, envie o máximo de detalhes para acelerar o retorno.
            </p>
          </section>
        </aside>

        <section data-animate="contact-reveal" class="luxury-card self-start rounded-[2rem] p-6 md:p-8">
          <span class="eyebrow">Formulário de contato</span>
          <h2 class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720]">Envie sua mensagem</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-[#6e5b64]">
            Preencha os campos abaixo para receber um atendimento mais rápido, claro e direcionado ao que você precisa.
          </p>

          <form @submit.prevent="submitForm" class="mt-8 space-y-5">
            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label for="nome" class="mb-2 block text-sm font-semibold text-[#4f4047]">Nome</label>
                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  placeholder="Seu nome"
                  class="w-full rounded-[1.25rem] border border-[#782744]/10 bg-white/90 px-4 py-4 text-[#1f1720] outline-none transition focus:border-[#b6406f] focus:ring-4 focus:ring-[#f6d5df]"
                  required
                >
              </div>

              <div>
                <label for="email" class="mb-2 block text-sm font-semibold text-[#4f4047]">E-mail</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="voce@email.com"
                  class="w-full rounded-[1.25rem] border border-[#782744]/10 bg-white/90 px-4 py-4 text-[#1f1720] outline-none transition focus:border-[#b6406f] focus:ring-4 focus:ring-[#f6d5df]"
                  required
                >
              </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div>
                <label for="telefone" class="mb-2 block text-sm font-semibold text-[#4f4047]">Telefone</label>
                <input
                  id="telefone"
                  v-model="form.telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  class="w-full rounded-[1.25rem] border border-[#782744]/10 bg-white/90 px-4 py-4 text-[#1f1720] outline-none transition focus:border-[#b6406f] focus:ring-4 focus:ring-[#f6d5df]"
                >
              </div>

              <div>
                <label for="assunto" class="mb-2 block text-sm font-semibold text-[#4f4047]">Assunto</label>
                <input
                  id="assunto"
                  v-model="form.assunto"
                  type="text"
                  placeholder="Como podemos ajudar?"
                  class="w-full rounded-[1.25rem] border border-[#782744]/10 bg-white/90 px-4 py-4 text-[#1f1720] outline-none transition focus:border-[#b6406f] focus:ring-4 focus:ring-[#f6d5df]"
                  required
                >
              </div>
            </div>

            <div>
              <label for="mensagem" class="mb-2 block text-sm font-semibold text-[#4f4047]">Mensagem</label>
              <textarea
                id="mensagem"
                v-model="form.mensagem"
                placeholder="Escreva sua mensagem com detalhes para acelerar o atendimento."
                rows="6"
                class="w-full rounded-[1.5rem] border border-[#782744]/10 bg-white/90 px-4 py-4 text-[#1f1720] outline-none transition focus:border-[#b6406f] focus:ring-4 focus:ring-[#f6d5df]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="primary-cta w-full"
              :disabled="loading"
            >
              <Spinner v-if="loading" size="sm" color="white" class="mr-2" />
              {{ loading ? 'Enviando mensagem...' : 'Enviar mensagem' }}
            </button>

            <div v-if="success" class="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Mensagem enviada com sucesso. Entraremos em contato em breve.
            </div>

            <div v-if="error" class="rounded-[1.5rem] border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {{ error }}
            </div>
          </form>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { animateIntro, animateReveal, gsap } from '@/utils/animations'
import { apiBaseUrl } from '@/config/api'

const pageRef = ref(null)
let ctx = null

const contactHighlights = [
  { icon: 'fas fa-comments', title: 'Dúvidas antes da compra', description: 'Entenda qual linha, kit ou tratamento faz mais sentido para seu objetivo.' },
  { icon: 'fas fa-box-open', title: 'Pedidos e rastreamento', description: 'Receba orientação sobre status, envio e acompanhamento do seu pedido.' },
  { icon: 'fas fa-headset', title: 'Suporte pós-venda', description: 'Fale com a equipe sobre uso, continuidade do tratamento e atendimento geral.' }
]

const supportBlocks = [
  { icon: 'fas fa-shopping-bag', title: 'Dúvidas antes da compra', description: 'Receba apoio para escolher o melhor kit, linha ou tratamento conforme seu objetivo e tipo de fio.' },
  { icon: 'fas fa-box-open', title: 'Pedidos e rastreamento', description: 'Se precisar de orientação sobre envio, status ou acompanhamento, o atendimento ajuda a direcionar rapidamente.' },
  { icon: 'fas fa-hand-holding-heart', title: 'Acompanhamento mais humano', description: 'Fale com um canal preparado para orientar compra, uso e pós-venda com mais clareza.' }
]

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  assunto: '',
  mensagem: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref(null)

onMounted(() => {
  ctx = gsap.context(() => {
    animateIntro('[data-animate="contact-hero"]')
    animateReveal('[data-animate="contact-card"]')
    animateReveal('[data-animate="contact-reveal"]')
  }, pageRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

const submitForm = async () => {
  loading.value = true
  error.value = null
  success.value = false

  try {
    const response = await fetch(`${apiBaseUrl}/contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`)
      } else {
        const text = await response.text()
        throw new Error(`Erro ${response.status}: ${text}`)
      }
    }

    const data = await response.json()

    if (data.success) {
      success.value = true
      form.value = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }
    } else {
      throw new Error(data.message || 'Erro ao enviar formulario')
    }
  } catch (err) {
    console.error('Erro completo:', err)

    if (err.message.includes('Failed to fetch')) {
      error.value = 'Erro de conexão com o servidor. Verifique sua internet.'
    } else if (err.message.includes('CORS')) {
      error.value = 'Erro de configuração do servidor. Tente novamente mais tarde.'
    } else {
      error.value = err.message || 'Erro ao enviar formulario'
    }
  } finally {
    loading.value = false
  }
}
</script>
