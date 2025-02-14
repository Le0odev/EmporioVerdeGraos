import styled, { keyframes } from 'styled-components';

// Animação de escala
const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Container do modal com efeito de sombra e borda
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${scaleIn} 0.3s ease-out;

`;

// Estilo do conteúdo do modal com borda brilhante
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: ${scaleIn} 0.4s ease-out;
  margin-top: -250px;

  h2 {
    margin-top: 0;
    font-size: 1.5rem;  
    color: #333;
  }

  
`;

// Botão de fechar com um ícone estilizado
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;  
  color: #ff4d4d; // Cor ousada
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg); // Animação de rotação no hover
  }

  &:focus {
    outline: none;
  }
`;


export const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
`;


export const FlavorTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 8px;
  color: #444;
`;

export const FlavorLabel = styled.label`
  font-size: 16px;
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
`;

export const FlavorInput = styled.input`
  margin-right: 8px;
`;


// Estilização para a imagem do produto
export const ProductImage = styled.img`
  width: 100%;
  max-width: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

// Nome do Produto
export const ProductTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

// Preço do Produto
export const ProductPrice = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #28a745; 
  margin-bottom: 10px;
`;

// Categoria como badge
export const ProductCategory = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

// Peso do Produto
export const ProductWeight = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 12px;
`;

// Botão de Comprar
export const BuyButton = styled.button`
  background: linear-gradient(45deg, #28a745, #218838); 
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background: linear-gradient(45deg, #218838, #1e7e34);
  }

  &:focus {
    outline: none;
  }
`;

// Seletor de Sabores
export const FlavorSelectorWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 18px;
`;