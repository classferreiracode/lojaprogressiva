<template>
  <div>
      <Banner/>
    <section class="py-12 container mx-auto max-w-lg">
      <h1 class="text-3xl font-bold mb-6">Entre em Contato</h1>
      <form class="space-y-4">
        <input v-model="nome" type="text" placeholder="Nome" class="w-full border p-2 rounded" />
        <input v-model="email" type="email" placeholder="E-mail" class="w-full border p-2 rounded" />
        <input v-model="telefone" type="tel" placeholder="Telefone" class="w-full border p-2 rounded" />
        <input v-model="assunto" type="text" placeholder="Assunto" class="w-full border p-2 rounded" />
        <textarea v-model="mensagem" placeholder="Mensagem" class="w-full border p-2 rounded"></textarea>
        <button type="submit" class="bg-pink-600 text-white px-4 py-2 rounded">Enviar</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from "@/components/Banner.vue";

const nome = ref('')
const email = ref('')
const telefone = ref('')
const assunto = ref('')
const mensagem = ref('')
</script>