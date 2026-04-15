<template>
  <article :class="[
    'luxury-card grid gap-8 overflow-hidden rounded-[2rem] p-6 md:p-8 lg:grid-cols-2 lg:items-center',
    reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
  ]">
    <div class="relative overflow-hidden rounded-[1.75rem]">
      <img
        :src="feature.img"
        :alt="feature.titulo"
        class="h-full min-h-[320px] w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1f1720]/35 via-transparent to-transparent"></div>
    </div>

    <div class="w-full">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-[#782744]">Colecao especialista</p>
      <h3 class="brand-heading mt-4 text-4xl font-semibold text-[#1f1720]">{{ feature.titulo }}</h3>
      <p class="mt-5 text-base leading-8 text-[#6e5b64]">{{ feature.desc }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <span class="rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#782744]">Alta percepcao de valor</span>
        <span class="rounded-full bg-[#f6d5df] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#782744]">Escolha mais segura</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['titulo', 'desc', 'img'].every(prop => prop in value)
    }
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>
