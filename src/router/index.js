import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LojaView from "@/views/LojaView.vue";
import ProdutoView from "@/views/ProdutoView.vue";
import ContatoView from "@/views/ContatoView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/loja", name: "Loja", component: LojaView },
  { path: "/produto/:id", name: "Produto", component: ProdutoView },
  { path: "/contato", name: "Contato", component: ContatoView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
