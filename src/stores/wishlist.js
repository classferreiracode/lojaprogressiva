import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  
  const toggle = (product) => {
    const index = items.value.findIndex(p => p.id === product.id);
    if (index >= 0) {
      items.value.splice(index, 1);
    } else {
      items.value.push(product);
    }
  };
  
  const isInWishlist = (product) => {
    return items.value.some(p => p.id === product.id);
  };
  
  watch(items, (newItems) => {
    localStorage.setItem("wishlist", JSON.stringify(newItems));
  }, { deep: true });
  
  return { items, toggle, isInWishlist };
});