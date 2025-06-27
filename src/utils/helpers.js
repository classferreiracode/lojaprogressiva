export const calcularDesconto = (precoOriginal, precoPromocional) => {
  return Math.round(((precoOriginal - precoPromocional) / precoOriginal) * 100)
}

export const formatarPreco = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

export const estaNaWishlist = (wishlistItems, produto) => {
  return wishlistItems.some(item => item.id === produto.id)
}