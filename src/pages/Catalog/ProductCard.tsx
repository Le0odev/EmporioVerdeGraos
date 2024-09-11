// ProductCard.tsx
import React from 'react';
import { useCart } from './CartContext';
import { Product } from './Product';

interface ProductCardProps {
  produto: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto }) => {
  const { addToCart } = useCart(); // Obtém a função addToCart do contexto

  return (
    <div className="product-card">
      <img src={produto.imageUrl} alt={produto.productName} />
      <h2>{produto.productName}</h2>
      <p>{produto.description}</p>
      <p>Preço: R${produto.productPrice.toFixed(2)}</p>
      <button onClick={() => addToCart(produto)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
