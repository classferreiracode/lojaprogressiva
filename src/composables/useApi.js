import { ref } from "vue";

const baseURL = "https://api.lojaprogressivafashion.com.br/public/api";

export function useApi(endpoint) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const abortController = ref(null);

  const get = async (params = {}) => {
    if (abortController.value) {
      abortController.value.abort();
    }
    
    abortController.value = new AbortController();
    loading.value = true;
    error.value = null;
    
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${baseURL}/${endpoint}?${query}`, {
        signal: abortController.value.signal
      });
      
      if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
      
      data.value = await response.json();
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err.message || "Erro ao carregar os dados";
      }
    } finally {
      loading.value = false;
      abortController.value = null;
    }
  };

  return { data, error, loading, get, abort: () => abortController.value?.abort() };
}