<template>
  <div>
    <Banner />
    <section class="py-12 container mx-auto max-w-lg px-4">
      <h1 class="text-3xl font-bold mb-6 text-center">Entre em Contato</h1>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="nome" class="sr-only">Nome</label>
          <input 
            v-model="form.nome" 
            type="text" 
            placeholder="Nome" 
            class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
        </div>
        
        <div>
          <label for="email" class="sr-only">E-mail</label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="E-mail" 
            class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
        </div>
        
        <div>
          <label for="telefone" class="sr-only">Telefone</label>
          <input 
            v-model="form.telefone" 
            type="tel" 
            placeholder="Telefone" 
            class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
        </div>
        
        <div>
          <label for="assunto" class="sr-only">Assunto</label>
          <input 
            v-model="form.assunto" 
            type="text" 
            placeholder="Assunto" 
            class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          >
        </div>
        
        <div>
          <label for="mensagem" class="sr-only">Mensagem</label>
          <textarea 
            v-model="form.mensagem" 
            placeholder="Mensagem" 
            rows="5"
            class="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-pink-600 text-white px-4 py-3 rounded-lg hover:bg-pink-700 transition flex justify-center items-center"
          :disabled="loading"
        >
          <Spinner v-if="loading" size="sm" color="white" class="mr-2" />
          {{ loading ? 'Enviando...' : 'Enviar' }}
        </button>
        
        <div v-if="success" class="bg-green-100 text-green-700 p-4 rounded-lg">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
        
        <div v-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
          {{ error }}
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from "@/components/Banner.vue"
import Spinner from '@/components/Spinner.vue'
import { useApi } from '@/composables/useApi'

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

const submitForm = async () => {
  loading.value = true
  error.value = null
  success.value = false
  
  try {
    // Substitua pela sua API real
    const response = await fetch('https://api.lojaprogressivafashion.com.br/public/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    if (!response.ok) throw new Error('Erro ao enviar mensagem')
    
    success.value = true
    form.value = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }
  } catch (err) {
    error.value = err.message || 'Erro ao enviar formulário'
  } finally {
    loading.value = false
  }
}
</script>