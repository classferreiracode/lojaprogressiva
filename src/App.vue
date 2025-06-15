<script setup>
    import Header from './components/HeaderComponent.vue';
    import Footer from './components/Footer.vue';
</script>

<template>
<Header />
<router-view />
<Footer />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap");


body {
    font-family: "Montserrat", sans-serif;
}

.hero-gradient {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.testimonial-card {
    transition: all 0.3s ease;
}

.testimonial-card:hover {
    transform: scale(1.03);
}

.discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ef4444;
    color: white;
    padding: 2px 8px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: bold;
}

/* Slider animations */
@keyframes fadeIn {
    from {
        opacity: 0.4;
    }

    to {
        opacity: 1;
    }
}

.fade {
    animation-name: fadeIn;
    animation-duration: 1.5s;
}
</style>
