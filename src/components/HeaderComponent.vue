<template>
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
                <RouterLink to="/" class="text-2xl font-bold text-pink-600">Progressiva<span class="text-gray-800">Fashion</span>
                </RouterLink>

                <button class="md:hidden text-gray-700">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>

            <!-- Search bar -->
            <div class="relative w-full md:w-1/2 mb-4 md:mb-0 overflow-hidden">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Buscar produtos..."
                    class="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 overflow-hidden"
                >
                <button
                    class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white px-4 py-2 rounded-r-full hover:bg-pink-600 transition">
                    <i class="fas fa-search"></i>
                </button>
            </div>

            <!-- Icons -->
            <div class="relative" ref="dropdownRef">
                <div class="flex items-center space-x-4">
                    <!-- Ícone com contador -->
                    <button @click="showDropdown = !showDropdown" class="text-gray-700 hover:text-pink-500 relative">
                        <i class="fas fa-heart text-xl"></i>
                        <span v-if="wishlist.items.length" class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {{ wishlist.items.length }}
                        </span>
                    </button>
                </div>
                <!-- Dropdown -->
                <div
                    v-if="showDropdown"
                    class="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-50"
                >
                    <div v-if="wishlist.items.length" class="p-4 max-h-80 overflow-y-auto">
                        <div
                            v-for="(item, index) in wishlist.items"
                            :key="index"
                            class="flex items-center mb-4"
                        >
                            <img :src="item.img" alt="imagem" class="w-12 h-12 rounded object-cover mr-3" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-800">{{ item.nome }}</p>
                                <p class="text-sm text-pink-600 font-bold">R$ {{ item.preco.toFixed(2) }}</p>
                            </div>
                            <button @click="wishlist.toggle(item)" class="text-gray-400 hover:text-red-500 ml-2">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div v-else class="p-4 text-gray-500 text-sm">Sua lista está vazia.</div>
                    <div class="border-t px-4 py-2 text-right">
                        <a href="/wishlist" class="text-pink-600 text-sm hover:underline">Ver todos</a>
                    </div>
                </div>
            </div>
        </nav>

        <div class="hidden md:block border-t border-gray-100 py-2">
            <ul class="flex space-x-8 justify-center">
                <li>
                    <RouterLink to="/" class="text-gray-700 hover:text-pink-500 font-medium">Início</RouterLink>
                </li>
                <li>
                    <RouterLink to="/loja" class="text-gray-700 hover:text-pink-500 font-medium">Loja</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contato" class="text-gray-700 hover:text-pink-500 font-medium">Contato</RouterLink>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {RouterLink} from 'vue-router'
import {useWishlistStore} from '@/stores/wishlist'

const wishlist = useWishlistStore()
const showDropdown = ref(false)

const search = ref('')

const wishlistCount = ref(0)

const loadWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    wishlistCount.value = wishlist.length
}

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function useClickOutside(targetRef, callback) {
    const listener = (event) => {
        if (!targetRef.value || targetRef.value.contains(event.target)) return
        callback()
    }
    onMounted(() => document.addEventListener('mousedown', listener))
    onBeforeUnmount(() => document.removeEventListener('mousedown', listener))
}
const dropdownRef = ref(null)
useClickOutside(dropdownRef, () => { showDropdown.value = false })

</script>
