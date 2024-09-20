// StyledModal.ts
import styled, { keyframes } from 'styled-components';

// Animação para o modal surgir suavemente
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Estilizando o container com fundo blur
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

// Estilo do conteúdo do modal mais compacto
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 85%;
  max-width: 400px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: ${fadeIn} 0.4s ease-out;

  h2 {
    margin-top: 0;
    font-size: 1.5rem;  // Tamanho da fonte menor
    color: #333;
  }

  p {
    font-size: 1rem;  // Ajuste no tamanho da fonte para descrições
    color: #666;
    line-height: 1.4;  // Menor espaçamento entre linhas
    margin-bottom: 15px;
  }
`;

// Botão de fechar ajustado
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #888;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

// Botão de Comprar reutilizável
export const BuyButton = styled.button`
  background-color: #28a745;  // Cor verde para o botão
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;  // Sombra mais escura no hover
  }

  &:active {
    background-color: #1e7e34;  // Cor mais intensa quando pressionado
  }

  &:focus {
    outline: none;
  }
`;
