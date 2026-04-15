<template>
  <footer ref="footerRef" class="section-shell px-4 pb-8 pt-10 md:px-6 md:pt-12">
    <div
      class="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#21161d] text-white shadow-[0_32px_80px_rgba(20,8,14,0.35)]">
      <div class="grid gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1.1fr_0.7fr_0.75fr_0.95fr] lg:items-start lg:py-10">
        <div data-animate="footer-block">
          <span
            class="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">
            Marca com autoridade
          </span>
          <img src="/logo-progressiva.png" alt="Logo Progressiva Fashion"
            class="mt-5 h-18 w-auto rounded-2xl bg-white/90 p-2">
          <h3 class="brand-heading mt-5 text-4xl font-semibold">Progressiva Fashion</h3>
          <p class="mt-3 max-w-md text-sm leading-7 text-white/72">
            Vitrine comercial para quem busca alisamento, cronograma e tratamento com linguagem de marca forte,
            compra segura e percepção premium em cada contato.
          </p>

        </div>

        <div data-animate="footer-block">
          <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Navegação rápida</p>
          <ul class="mt-4 space-y-3 text-sm text-white/76">
            <li><a href="/" class="transition hover:text-white">Home</a></li>
            <li><a href="/loja" class="transition hover:text-white">Loja</a></li>
            <li><a href="/wishlist" class="transition hover:text-white">Favoritos</a></li>
            <li><a href="/contato" class="transition hover:text-white">Contato</a></li>
          </ul>
        </div>

        <div data-animate="footer-block">
          <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Ajuda ao cliente</p>
          <ul class="mt-4 space-y-3 text-sm text-white/76">
            <li><a href="/#faq" class="transition hover:text-white">Perguntas frequentes</a></li>
            <li><a href="https://www.b2cstore.com.br/politica-de-troca-e-devolucao?parceiro=50928" target="_blank"
                class="transition hover:text-white">Trocas e devoluções</a></li>
            <li><a href="https://www.b2cstore.com.br/rastreamento?parceiro=50928" target="_blank"
                class="transition hover:text-white">Rastreamento</a></li>
            <li><a href="https://chat.whatsapp.com/Fvp41d8vrTaBw81BxGAWk1" target="_blank"
                class="transition hover:text-white">Grupo VIP</a></li>
          </ul>
        </div>

        <div data-animate="footer-block">
          <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f6d5df]">Contato e confiança</p>
          <ul class="mt-4 space-y-3 text-sm text-white/76">
            <li class="flex items-start gap-3">
              <i class="fas fa-phone-alt mt-1 text-[#d4ad63]"></i>
              <a href="https://wa.me/5515992455005" target="_blank" class="transition hover:text-white">(15)
                99245-5005</a>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-envelope mt-1 text-[#d4ad63]"></i>
              <span>contato@lojaprogressivafashion.com.br</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-shield-alt mt-1 text-[#d4ad63]"></i>
              <span>Ambiente seguro e vendas sujeitas à análise e disponibilidade de estoque.</span>
            </li>
          </ul>

          <div class="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/76">
            <p class="font-semibold text-white">Atendimento, busca e favoritos integrados.</p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 px-6 py-5 text-sm text-white/64 md:px-10">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 <span class="font-bold text-white">Progressiva Fashion</span>. Somos afiliados da B2Club, e os
            produtos são vendidos e entregues direto da fábrica.
          </p>
          <p>
            Desenvolvimento por
            <a href="https://github.com/classFerreiraCode" target="_blank"
              class="font-semibold text-[#f6d5df] transition hover:text-white">
              @classFerreiraCode
            </a>
          </p>
        </div>
      </div>
    </div>

    <div data-animate="footer-block"
      class="mx-auto mt-5 max-w-7xl rounded-[1.75rem] bg-[#b6406f] px-6 py-5 text-sm leading-7 text-white/90">
      Todo o conteúdo do site, imagens e marcas pertencem aos seus respectivos titulares. Esta página atua como canal
      afiliado de divulgação comercial. Em caso de divergência, prevalece o valor exibido na tela de pagamento.
    </div>

    <div class="fixed bottom-6 right-6 z-50">
      <a href="https://chat.whatsapp.com/Fvp41d8vrTaBw81BxGAWk1" target="_blank"
        class="flex h-16 w-16 items-center justify-center rounded-full bg-[#19c37d] text-white shadow-[0_18px_35px_rgba(25,195,125,0.35)] transition hover:scale-105 hover:bg-[#14a86b]">
        <i class="fab fa-whatsapp text-3xl"></i>
      </a>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { animateReveal, gsap } from '@/utils/animations'

const footerRef = ref(null)
let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    animateReveal('[data-animate="footer-block"]', { y: 36 })
  }, footerRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
