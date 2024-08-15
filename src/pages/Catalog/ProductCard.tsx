// ProductCard.tsx
import React from 'react';
import { Product } from './Product';

interface ProductCardProps {
  produto: Product;
  addToCart: (produto: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto, addToCart }) => {
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
