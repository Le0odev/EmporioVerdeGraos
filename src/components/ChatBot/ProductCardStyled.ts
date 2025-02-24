// ProductCardsStyled.ts
import styled from 'styled-components';

export const ProductsContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  max-width: 1200px; // Limita a largura máxima do container
  margin: 20px auto; // Centraliza o container
`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 4px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #000;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // Evita que os cards fiquem muito largos em telas muito grandes
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(250px, 1fr));
  }
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  padding: 12px;
  transition: all 0.2s ease;
  width: 100%; // Garante que o card ocupe todo o espaço disponível na grid
`;

export const ProductTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #000;
  margin: 0 0 16px 0;
  line-height: 1.2;
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const ProductContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const ProductPrice = styled.div`
  display: flex;
  flex-direction: column;
  
  span.currency {
    font-size: 0.75rem;
    color: #16a34a;
    font-weight: 500;
  }
  
  span.amount {
    font-size: 1rem;
    color: #16a34a;
    font-weight: 600;
  }
`;

export const ProductButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;