<template>
    <section class="w-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white py-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <div class="mb-6">
                <h2 class="text-3xl font-bold mb-2">O que nossas clientes dizem</h2>
                <p class="text-pink-100 text-sm">+5.000 avaliações com nota 4.9/5</p>
            </div>

            <!-- Transição -->
            <transition name="fade" mode="out-in">
                <div :key="current.nome" class="flex flex-col items-center space-y-4">
                    <img :src="current.img" alt="Foto" class="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
                    <div class="flex text-yellow-300 text-lg">
                        <i class="fas fa-star" v-for="n in 5" :key="n"></i>
                    </div>
                    <p class="italic text-lg max-w-xl">“{{ current.text }}”</p>
                    <p class="font-bold mt-2">{{ current.nome }}</p>
                </div>
            </transition>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const testimonials = ref([
    {
        nome: 'Maria Silva',
        text: 'A progressiva deixou meu cabelo liso e com muito brilho. Atendimento excelente!',
        img: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    {
        nome: 'Ana Oliveira',
        text: 'Uso a linha completa da Progressiva Fashion e amo o resultado. Super indico!',
        img: 'https://randomuser.me/api/portraits/women/43.jpg'
    },
    {
        nome: 'Camila Santos',
        text: 'Meu cabelo era super ressecado e agora está maravilhoso. Produto top!',
        img: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
        nome: 'Beatriz Ramos',
        text: 'Entrega rápida, embalagem linda e o cheirinho é incrível!',
        img: 'https://randomuser.me/api/portraits/women/75.jpg'
    },
    {
        nome: 'Juliana Costa',
        text: 'Notei resultado na primeira aplicação. Nunca mais troco!',
        img: 'https://randomuser.me/api/portraits/women/88.jpg'
    }
])

const index = ref(0)
const current = ref(testimonials.value[0])

onMounted(() => {
    setInterval(() => {
        index.value = (index.value + 1) % testimonials.value.length
        current.value = testimonials.value[index.value]
    }, 5000)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
