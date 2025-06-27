import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.lojaprogressivafashion.com.br",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/public/api"),
        secure: false,
      },
    },
  },
});
