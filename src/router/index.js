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
  "Loja parceira com curadoria Ybera e Fashion Gold para progressiva, cronograma capilar, hidratação, nutrição, reconstrução e manutenção diária.";
const defaultImage = `${baseUrl}/logo-progressiva.png`;
const defaultKeywords =
  "ybera, fashion gold, progressiva fashion gold, cronograma capilar, alisamento e controle de frizz, hidratação capilar, reconstrução capilar, nutrição capilar, loja ybera";

const buildTitle = (pageTitle) => {
  if (!pageTitle || pageTitle === brandName) return brandName;
  return `${pageTitle} | ${brandName}`;
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Ybera e Fashion Gold",
      description:
        "Curadoria de tratamentos Ybera e Fashion Gold para alisamento, cronograma capilar, hidratação, brilho espelhado, reconstrução e cuidado diário.",
      keywords:
        "ybera fashion gold, progressiva fashion gold, cronograma capilar fashion gold, liso perfeito, cacho perfeito, loja ybera",
      type: "website",
    },
  },
  {
    path: "/loja",
    name: "Loja",
    component: LojaView,
    meta: {
      title: "Loja Ybera e Fashion Gold",
      description:
        "Explore produtos Ybera e Fashion Gold por necessidade: alisamento e controle de frizz, cronograma capilar, hidratação, reconstrução, nutrição e manutenção.",
      keywords:
        "produtos ybera, produtos fashion gold, alisamento e controle de frizz, cronograma capilar, reconstrução anti-quebra, hidratação brilho espelhado",
      type: "website",
    },
  },
  {
    path: "/produto/:slug",
    name: "produto",
    component: ProdutoView,
    meta: {
      title: "Produto",
      description: "Detalhes do produto, benefícios, modo de uso, faixa de preço e compra segura.",
      keywords:
        "produto ybera, produto fashion gold, progressiva, mascara capilar, shampoo profissional, tratamento capilar",
      type: "product",
    },
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: WishlistView,
    meta: {
      title: "Favoritos",
      description: "Salve seus produtos Ybera e Fashion Gold favoritos para comparar tratamentos e comprar depois.",
      keywords:
        "favoritos ybera, wishlist fashion gold, produtos salvos, tratamentos capilares favoritos",
      type: "website",
    },
  },
  {
    path: "/contato",
    name: "Contato",
    component: ContatoView,
    meta: {
      title: "Contato",
      description:
        "Fale com a equipe para tirar dúvidas sobre progressiva, cronograma capilar, manutenção, pedidos e produtos Ybera e Fashion Gold.",
      keywords:
        "contato ybera, contato fashion gold, suporte progressiva, dúvidas cronograma capilar, atendimento loja ybera",
      type: "website",
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
  const keywords = to.meta?.keywords || defaultKeywords;
  const url = new URL(to.fullPath, baseUrl).toString();
  const type = to.meta?.type || "website";
  setMeta({
    title,
    description,
    image,
    url,
    keywords,
    type,
    schema: {
      "@context": "https://schema.org",
      "@type": type === "product" ? "WebPage" : "CollectionPage",
      name: title,
      description,
      url,
      image,
      inLanguage: "pt-BR",
      isPartOf: {
        "@type": "WebSite",
        name: brandName,
        url: baseUrl,
      },
    },
  });
});

export default router;
