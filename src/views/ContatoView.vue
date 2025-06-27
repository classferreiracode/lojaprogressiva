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

// URL base da API (corrigida para 'public' em vez de 'publik')
const baseApiUrl = 'https://api.lojaprogressivafashion.com.br/public/api'

// Durante desenvolvimento usa proxy, em produção usa URL direta
const apiUrl = import.meta.env.DEV ? '/api' : baseApiUrl

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
    const response = await fetch(`${apiUrl}/contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    
    // Verifica o status da resposta antes de tentar parsear JSON
    if (!response.ok) {
      // Tenta obter mensagem de erro se for JSON
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
      throw new Error(data.message || 'Erro ao enviar formulário')
    }
  } catch (err) {
    console.error('Erro completo:', err)
    
    // Mensagens amigáveis para erros comuns
    if (err.message.includes('Failed to fetch')) {
      error.value = 'Erro de conexão com o servidor. Verifique sua internet.'
    } else if (err.message.includes('CORS')) {
      error.value = 'Erro de configuração do servidor. Tente novamente mais tarde.'
    } else {
      error.value = err.message || 'Erro ao enviar formulário'
    }
  } finally {
    loading.value = false
  }
}
</script>