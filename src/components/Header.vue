<template>
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <div class="flex items-center">
            <a href="#" class="text-2xl font-bold text-pink-600"
              >Progressiva<span class="text-gray-800"> Fashion</span></a
            >
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex items-center flex-1 mx-8">
            <div class="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Buscar produtos..."
                class="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 overflow-hidden"
              />
              <button
                class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white px-4 py-2 rounded-r-full hover:bg-pink-600 transition"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Icons -->
          <div class="flex items-center space-x-4">
            <!-- <a href="#" class="text-gray-700 hover:text-pink-500">
              <i class="fas fa-user text-xl"></i>
            </a> -->
            <a href="#" class="text-gray-700 hover:text-pink-500 relative">
              <i class="fas fa-heart text-xl"></i>
              <span
                class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >0</span
              >
            </a>
            <!-- <a href="#" class="text-gray-700 hover:text-pink-500 relative">
              <i class="fas fa-shopping-cart text-xl"></i>
              <span
                class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >0</span
              >
            </a> -->
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden text-gray-700">
            <i class="fas fa-bars text-2xl"></i>
          </button>
        </div>

        <!-- Mobile Search -->
        <div class="md:hidden pb-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              class="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- Nav Links -->
        <nav class="hidden md:block border-t border-gray-100 py-2">
          <ul class="flex space-x-8">
            <li>
              <a href="#" class="text-gray-700 hover:text-pink-500 font-medium"
                >Início</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-pink-500 font-medium"
                >Loja</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-pink-500 font-medium"
                >Contato</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </header>
</template>
<script setup>
</script>