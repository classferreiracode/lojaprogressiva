<template>
    <!-- Newsletter -->
    <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4 max-w-4xl">
            <div class="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 mb-6 md:mb-0">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">
                            Cadastre-se na nossa Newsletter
                        </h2>
                        <p class="text-gray-600">
                            Receba ofertas exclusivas e novidades em primeira mão!
                        </p>
                    </div>
                    <div class="md:w-1/2 w-full">
                        <form class="flex flex-col sm:flex-row gap-2">
                            <input type="email" placeholder="Seu melhor e-mail"
                                class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                            <button type="submit"
                                class="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#FDEFE1] text-white pt-12 pb-6">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 text-black">
                        Progressiva Fashion
                    </h3>
                    <p class="text-gray-700 mb-4">
                        Somos afiliados da B2Club e todos os produtos são entregues e
                        vendidos direto da Fabrica. Vendas sujeitas a análise e
                        disponibilidade de estoque.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-600 hover:text-pink-400 transition">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-pink-400 transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-pink-400 transition">
                            <i class="fab fa-tiktok"></i>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-pink-400 transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-4 text-black">Ajuda</h4>
                    <ul class="space-y-2">
                        <li>
                            <a href="#" class="text-gray-700 hover:text-pink-400 transition">FAQ</a>
                        </li>
                        <li>
                            <a href="#" class="text-gray-700 hover:text-pink-400 transition">Trocas e Devoluções</a>
                        </li>
                        <li>
                            <a href="#" class="text-gray-700 hover:text-pink-400 transition">Rastrear Pedido</a>
                        </li>
                        <li>
                            <a href="#" class="text-gray-700 hover:text-pink-400 transition">Grupo Vip</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-black font-bold text-lg mb-4">Contato</h4>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-phone-alt mr-2 text-pink-400"></i>
                            <span class="text-gray-800">(11) 4002-8922</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-envelope mr-2 text-pink-400"></i>
                            <span class="text-gray-800">contato@lojaprogressivafashion.com.br</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-900 text-sm mb-4 md:mb-0">
                    © 2025
                    <span class="font-bold text-[#E60976]">Progressiva Fashion</span>.
                    Todos os direitos reservados.
                </p>
                <div class="flex space-x-4">
                    <p class="text-gray-900 text-sm mb-4 md:mb-0">
                        by
                        <span class="font-bold text-[#E60976]">classFerreiraCode 🙏</span>
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <div class="bg-[#E60976] text-white text-center py-4">
        <div class="container mx-auto px-4">
            <p>
                Todo o conteúdo do site, todas as fotos, imagens, logotipos, marcas,
                dizeres, som, software, conjunto imagem, layout, trade dress, aqui
                veiculados são de propriedade exclusiva da GYP ou de suas Marcas. Esta
                pagina visa auxiliar nossos seguidores estar atentos a promoções e
                lançamentos da GYP. Somos afiliados da B2Club e todos os produtos são
                entregues e vendidos direto da Fabrica. Caso os produtos apresentem
                divergências de valores, o preço válido é o exibido na tela de
                pagamento. Vendas sujeitas a análise e disponibilidade de estoque.
            </p>
        </div>
    </div>

    <!-- WhatsApp Float Button -->
    <div class="fixed bottom-6 right-6 z-50">
        <a href="#"
            class="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>
    </div>
</template>
<script setup>
        
</script>