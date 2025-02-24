// ProductCards.tsx
import React from 'react';
import { PackageCheck } from 'lucide-react';
import {
  ProductsContainer,
  ProductsHeader,
  ProductsGrid,
  ProductCard,
  ProductTitle,
  ProductContent,
  ProductPrice,
  ProductButton
} from './ProductCardStyled';

interface Product {
  product_name: string;
  product_price: number;
}

interface ProductCardsProps {
  produtos: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ produtos }) => {
  if (!produtos?.length) return null;

  return (
    <ProductsContainer>
      <ProductsHeader>
        <PackageCheck size={16} />
        <h3>Produtos Recomendados</h3>
      </ProductsHeader>
      
      <ProductsGrid>
        {produtos.map((produto, index) => (
          <ProductCard key={index}>
            <ProductTitle>{produto.product_name}</ProductTitle>
            <ProductContent>
              <ProductPrice>
                <span className="currency">R$</span>
                <span className="amount">{produto.product_price.toFixed(2)}</span>
              </ProductPrice>
              <ProductButton>
                Ver Detalhes
              </ProductButton>
            </ProductContent>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default ProductCards;