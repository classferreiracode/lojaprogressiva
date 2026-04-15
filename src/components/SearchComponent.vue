<template>
  <div ref="searchRef" class="relative w-full">
    <div class="form-shell flex items-center gap-2 rounded-full px-2 py-2">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7ede8] text-[#782744]">
        <i class="fas fa-search text-sm"></i>
      </div>

      <input
        v-model="search"
        @input="debouncedSearch"
        @focus="handleFocus"
        @keydown.enter.prevent="searchProducts"
        @keydown.esc="closeResults"
        type="text"
        placeholder="Buscar por tratamento, kit, linha ou necessidade..."
        class="w-full bg-transparent px-2 text-sm text-[#1f1720] outline-none placeholder:text-[#8d7880]"
        aria-label="Buscar produtos"
        :aria-expanded="showDropdown ? 'true' : 'false'"
        aria-controls="search-results"
        aria-autocomplete="list"
      >

      <button v-if="search" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#6f5962] transition hover:bg-[#f7ede8] hover:text-[#782744]" @click="clearSearch" aria-label="Limpar busca">
        <i class="fas fa-times text-sm"></i>
      </button>

      <button class="primary-cta !px-5 !py-3" @click="searchProducts">
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>

    <div
      v-if="showDropdown"
      id="search-results"
      class="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-40 rounded-[1.5rem] border border-[#782744]/10 bg-white/95 p-4 shadow-[0_24px_50px_rgba(49,20,35,0.16)] backdrop-blur-xl"
      role="listbox"
    >
      <div class="mb-3 flex items-center justify-between gap-3">
        <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#782744]">Resultados para "{{ search }}"</p>
        <span v-if="results.length" class="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f5962]">
          {{ results.length }} item{{ results.length > 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="loading" class="rounded-3xl bg-[#fff8f1] px-4 py-5 text-sm text-[#6e5b64]">
        Procurando produtos relacionados ao seu objetivo.
      </div>

      <ul v-else-if="results.length" class="space-y-2">
        <li v-for="result in results" :key="result.id">
          <RouterLink
            :to="`/produto/${result.slug}`"
            class="flex items-center gap-3 rounded-3xl border border-transparent px-3 py-3 transition hover:border-[#782744]/10 hover:bg-[#fff8f1]"
            @click="closeResults"
            role="option"
          >
            <img v-if="result.image" :src="result.image" :alt="result.title" class="h-14 w-14 rounded-2xl object-cover">
            <div class="min-w-0">
              <span class="block truncate font-semibold text-[#1f1720]">{{ result.title }}</span>
              <span class="mt-1 block text-xs uppercase tracking-[0.16em] text-[#6f5962]">Ver produto</span>
            </div>
          </RouterLink>
        </li>
      </ul>

      <p v-else class="rounded-3xl bg-[#fff8f1] px-4 py-5 text-sm text-[#6e5b64]">
        Nenhum produto encontrado. Tente buscar pela linha, pelo tratamento ou pela necessidade do fio.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { apiBaseUrl } from '@/config/api'

const search = ref('')
const results = ref([])
const loading = ref(false)
const showDropdown = ref(false)
const searchRef = ref(null)

const debounce = (func, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

const closeResults = () => {
  showDropdown.value = false
}

const clearSearch = () => {
  search.value = ''
  results.value = []
  closeResults()
}

const handleFocus = () => {
  if (search.value.trim()) {
    showDropdown.value = true
  }
}

const handleClickOutside = (event) => {
  if (searchRef.value && !searchRef.value.contains(event.target)) {
    closeResults()
  }
}

const searchProducts = async () => {
  if (search.value.trim() === '') {
    results.value = []
    closeResults()
    return
  }

  loading.value = true
  showDropdown.value = true

  try {
    const response = await fetch(`${apiBaseUrl}/search`, {
      method: 'POST',
      body: JSON.stringify({ search: search.value }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = await response.json()
    results.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

const debouncedSearch = debounce(searchProducts, 280)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
