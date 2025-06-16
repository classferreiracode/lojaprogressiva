import { ref } from "vue";

const baseURL = "https://api.lojaprogressivafashion.com.br/public/api";

export function useApi(endpoint) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const get = async (params = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${baseURL}/${endpoint}?${query}`);
      if (!response.ok) throw new Error("Erro ao carregar os dados");
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    get,
  };
}
