// src/stores/wishlist.js
import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("wishlist")) || [],
  }),
  actions: {
    toggle(item) {
      const index = this.items.findIndex((p) => p.title === item.title);
      if (index >= 0) {
        this.items.splice(index, 1);
      } else {
        this.items.push(item);
      }
      this.save();
    },
    isInWishlist(item) {
      return this.items.some((p) => p.title === item.title);
    },
    save() {
      localStorage.setItem("wishlist", JSON.stringify(this.items));
    },
  },
});
