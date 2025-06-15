<template>
  <div>
    <section class="py-12 container mx-auto">
      <h1 class="text-3xl font-bold mb-6">Detalhes do Produto</h1>
      <p>ID do produto: {{ id }}</p>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>