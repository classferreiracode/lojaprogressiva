<template>
  <div>
      <Banner />
    <section class="py-12 container mx-auto">
      <h1 class="text-3xl font-bold mb-6">Nossa Loja</h1>
      <p>Aqui você encontra nossos produtos!</p>
    </section>

      <ProductGrid :produtos="produtos" />

  </div>
</template>

<script setup>
import ProductGrid from '@/components/ProductGrid.vue'
import {ref} from "vue";
import Banner from "@/components/Banner.vue";

const produtos = ref([
    {
        nome: 'Shampoo Hidratação Profunda',
        preco: 49.9,
        img: 'https://source.unsplash.com/300x200/?hair',
        wishlist: false,
    },
    {
        nome: 'Máscara Capilar Nutritiva',
        preco: 59.9,
        img: 'https://source.unsplash.com/300x200/?cosmetics',
        wishlist: false,
    },
    {
        nome: 'Óleo Reparador de Pontas',
        preco: 39.9,
        img: 'https://source.unsplash.com/300x200/?beauty',
        wishlist: false,
    },
    {
        nome: 'Kit Manutenção Progressiva',
        preco: 99.9,
        img: 'https://source.unsplash.com/300x200/?spa,hair',
        wishlist: false,
    },
    {
        nome: 'Escova Fashion Gold 500ml',
        preco: 119.9,
        img: 'https://source.unsplash.com/300x200/?salon',
        wishlist: false,
    },
    {
        nome: 'Leave-in Finalizador',
        preco: 34.9,
        img: 'https://source.unsplash.com/300x200/?makeup',
        wishlist: false,
    }
])
</script>