import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LojaView from "@/views/LojaView.vue";
import ProdutoView from "@/views/ProdutoView.vue";
import ContatoView from "@/views/ContatoView.vue";
import WishlistView from "@/views/WishlistView.vue";
import { setMeta } from "@/utils/seo";

const brandName = "Loja Progressiva Fashion";
const baseUrl = "https://www.lojaprogressivafashion.com.br";
const defaultDescription =
  "Produtos oficiais, vendidos e entregues direto da fábrica. Compra segura, estoque atualizado e envio rápido.";
const defaultImage = `${baseUrl}/logo-progressiva.png`;

const buildTitle = (pageTitle) => {
  if (!pageTitle || pageTitle === brandName) return brandName;
  return `${pageTitle} | ${brandName}`;
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { title: brandName, description: defaultDescription },
  },
  {
    path: "/loja",
    name: "Loja",
    component: LojaView,
    meta: {
      title: "Loja",
      description: "Confira a linha completa de produtos Progressiva Fashion.",
    },
  },
  {
    path: "/produto/:slug",
    name: "produto",
    component: ProdutoView,
    meta: {
      title: "Produto",
      description: "Detalhes completos do produto, benefícios e compra segura.",
    },
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: WishlistView,
    meta: {
      title: "Wishlist",
      description: "Seus produtos favoritos salvos para comprar depois.",
    },
  },
  {
    path: "/contato",
    name: "Contato",
    component: ContatoView,
    meta: {
      title: "Contato",
      description: "Fale com a equipe e tire suas dúvidas rapidamente.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  const title = buildTitle(to.meta?.title);
  const description = to.meta?.description || defaultDescription;
  const image = to.meta?.image || defaultImage;
  const url = new URL(to.fullPath, baseUrl).toString();
  setMeta({ title, description, image, url });
});

export default router;
