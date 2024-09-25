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

  p {
    font-size: 1rem;  
    color: #666;
    line-height: 1.4;  
    margin-bottom: 15px;
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

// Botão de Comprar com gradiente
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
    transform: scale(1.05); // Efeito de aumento no hover
  }

  &:active {
    background: linear-gradient(45deg, #218838, #1e7e34);
  }

  &:focus {
    outline: none;
  }
`;


// Estilos para os componentes
export const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
  color: #333;
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
`;

export const ProductWeight = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 12px;
`;

export const FlavorSelectorWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 18px;
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

