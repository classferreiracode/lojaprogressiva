<template>
  <div
    ref="searchRef"
    class="relative shrink-0 transition-all duration-300 ease-out"
    :class="containerClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div :class="shellClasses">
      <button
        ref="iconButtonRef"
        type="button"
        :class="iconButtonClasses"
        @click="handleSearchIconClick"
        @focus="animateIconIn"
        @blur="animateIconOut"
        title="Buscar"
        aria-label="Abrir busca"
        :aria-expanded="isExpanded ? 'true' : 'false'"
        :aria-controls="showDropdown ? 'search-results' : undefined"
      >
        <i class="fas fa-search text-sm leading-none"></i>
      </button>

      <input
        ref="inputRef"
        v-model="search"
        @input="debouncedSearch"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter.prevent="searchProducts"
        @keydown.esc="closeResults"
        type="text"
        placeholder="Buscar por tratamento, kit, linha ou necessidade..."
        class="bg-transparent px-2 text-sm text-[#1f1720] outline-none placeholder:text-[#8d7880] transition-all duration-200"
        :class="inputClasses"
        aria-label="Buscar produtos"
        :aria-expanded="showDropdown ? 'true' : 'false'"
        aria-controls="search-results"
        aria-autocomplete="list"
      >

      <button
        v-if="showControls && search"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#6f5962] transition hover:bg-[#f7ede8] hover:text-[#782744]"
        @click="clearSearch"
        aria-label="Limpar busca"
      >
        <i class="fas fa-times text-sm"></i>
      </button>

      <button v-if="showControls" class="primary-cta !px-5 !py-3" @click="searchProducts">
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
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { apiBaseUrl } from '@/config/api'
import { gsap, prefersReducedMotion } from '@/utils/animations'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const search = ref('')
const results = ref([])
const loading = ref(false)
const showDropdown = ref(false)
const searchRef = ref(null)
const inputRef = ref(null)
const iconButtonRef = ref(null)
const isInteracting = ref(false)

const isExpanded = computed(() => {
  if (!props.compact) return true
  return isInteracting.value || !!search.value.trim() || showDropdown.value || loading.value
})

const showControls = computed(() => isExpanded.value)

const containerClasses = computed(() => {
  if (!props.compact) return 'w-full'
  return isExpanded.value ? 'w-full max-w-xl' : 'w-12'
})

const shellClasses = computed(() => {
  if (props.compact && !isExpanded.value) {
    return 'flex h-12 w-12 items-center justify-center p-0'
  }
  return 'form-shell flex items-center gap-2 rounded-full px-2 py-2'
})

const iconButtonClasses = computed(() => {
  if (props.compact && !isExpanded.value) {
    return 'inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#782744]/16 bg-white text-[#8b2f53] shadow-[0_10px_22px_rgba(49,20,35,0.12)] transition hover:bg-[#fff4ee] hover:shadow-[0_12px_24px_rgba(49,20,35,0.14)]'
  }
  return 'inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f7ede8] text-[#782744] transition hover:bg-[#f2dfd7]'
})

const animateIconIn = () => {
  if (prefersReducedMotion() || !iconButtonRef.value) return
  gsap.to(iconButtonRef.value, {
    scale: 1.05,
    rotate: -8,
    duration: 0.22,
    ease: 'power2.out'
  })
}

const animateIconOut = () => {
  if (prefersReducedMotion() || !iconButtonRef.value) return
  gsap.to(iconButtonRef.value, {
    scale: 1,
    rotate: 0,
    duration: 0.22,
    ease: 'power2.out'
  })
}

const inputClasses = computed(() => {
  if (showControls.value) return 'w-full opacity-100'
  return 'w-0 p-0 opacity-0 pointer-events-none'
})

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
  isInteracting.value = true
  if (search.value.trim()) {
    showDropdown.value = true
  }
}

const handleBlur = () => {
  if (!search.value.trim() && !showDropdown.value) {
    isInteracting.value = false
  }
}

const handleMouseEnter = () => {
  if (!props.compact) return
  isInteracting.value = true
  animateIconIn()
}

const handleMouseLeave = () => {
  if (!props.compact) return
  if (!search.value.trim() && !showDropdown.value) {
    isInteracting.value = false
  }
  animateIconOut()
}

const handleSearchIconClick = async () => {
  animateIconIn()
  isInteracting.value = true
  await nextTick()
  inputRef.value?.focus()
}

const handleClickOutside = (event) => {
  if (searchRef.value && !searchRef.value.contains(event.target)) {
    closeResults()
    if (!search.value.trim()) {
      isInteracting.value = false
    }
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
