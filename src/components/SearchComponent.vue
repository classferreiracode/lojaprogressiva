<template>
    <div class="relative w-full md:w-1/2 mb-4 md:mb-0">
        <input
            v-model="search"
            @input="debouncedSearch"
            @keydown.enter="searchProducts"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full py-2 px-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
        <button
            class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white px-4 py-2.5 rounded-r-full hover:bg-pink-600 transition">
            <i class="fas fa-search"></i>
        </button>
        <div v-if="search" class="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4">
            <p class="text-gray-600">Resultados para "{{ search }}"</p>
            <ul class="mt-2">
                <li v-for="result in results" :key="result.id" class="py-1 hover:bg-gray-100 rounded cursor-pointer">
                    <a :href="`/produto/${result.slug}`" class="text-pink-600 hover:underline flex items-center">
                        <img v-if="result.image" :src="result.image" alt="Imagem do produto" class="w-12 h-12 object-cover mr-2">
                        <span class="font-medium">{{ result.title }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const search = ref('')
const router = useRouter()
const results = ref([])

const debounce = (func, delay) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), delay)
    }
}
const debouncedSearch = debounce(() => {
    searchProducts()
}, 300)

const searchProducts = () => {
    if (search.value.trim() === '') {
        results.value = []
        return
    }

    fetch(`https://api.lojaprogressivafashion.com.br/public/api/search`, {
        method: 'POST',
        body: JSON.stringify({ search: search.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            results.value = data
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error)
            results.value = []
        })
}

onMounted(() => {
    search.value = ''
})
</script>