import { IoAdd } from 'react-icons/io5';
import styled from 'styled-components';



// Container do carrinho
export const CartContainer = styled.div`
  width: 100%; // Diminui a largura do container
  max-width: 600px; // Define um tamanho máximo para não expandir muito em telas maiores
  margin: 0 auto; // Centraliza o container
  background-color: #fff;
  max-width: 600px; // Define um tamanho máximo para não expandir muito em telas maiores
  margin-top:
  background-color: #fff;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & h1{
  font-size: 20px;
  
  }

  @media (max-width: 768px) {
    width: 92%; // Para dispositivos móveis, ajusta a largura para ficar um pouco mais estreita
    margin-bottom: 10px;
  }
`;

// Item do carrinho
export const CartItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Imagem do item do carrinho
export const CartItemImage = styled.img`
  width: 70px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

// Detalhes do item do carrinho
export const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Nome do item do carrinho
export const CartItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.2rem;
  letter-spacing: 0.3px;
`;

// Preço do item do carrinho
export const CartItemPrice = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 0.2rem 0;
`;

// Quantidade do item do carrinho
export const CartItemQuantity = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0.2rem 0;
`;

// Container do resumo do carrinho
export const CartSummaryContainer = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  text-align: right;
  `;

// Total do resumo do carrinho
export const CartSummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 1rem;
  color: #222;
`;

// Botão de checkout
export const CheckoutButton = styled.button`
  background-color: #28a745;
  margin-top: 15px;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Peso do item do carrinho
export const CartItemWeight = styled.p`
  font-size: 0.85rem;
  color: #777;
  margin: 0.2rem 0;
`;

// Subtotal do item do carrinho
export const CartItemSubtotal = styled.p`
  font-size: 0.9rem;
  color: #444;
  font-weight: bold;
  margin: 0.2rem 0;
`;

// Título do resumo do carrinho
export const CartSummaryTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
`;

// Item do resumo do carrinho
export const CartSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #444;
`;

// Mensagem de carrinho vazio
export const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #999;
  margin-top: 1rem;
`;

// Botão de remover item
export const RemoveButton = styled.button`
  background-color: #ff4d4d;
  border: none;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  align-self: flex-start;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #e60000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;


// Container dos produtos sugeridos
export const SuggestedProductsContainer = styled.div`
  margin-top: 5px;
  padding: 0.4rem; // Reduzido para compactar
  border-radius: 8px;
.slick-list {margin: 0 -7px;}
  .slick-slide>div {padding: 0 7px;}
  
`;

// Título da seção de sugestões
export const SuggestionTitle = styled.h2`
  font-size: 1.2em; // Reduzido para um visual mais compacto
  color: #333;
  margin-bottom: 4px;
  font-family: 'Orbitron', sans-serif;
`;


// Ícone de adição ao carrinho
export const AddIcon = styled(IoAdd)`
  font-size: 24px; // Reduzido para compactar
  color: white;
  background-color: #28a745; // Verde para o ícone
  margin-left: 8px; // Espaço à esquerda do ícone
  padding: 4px; // Compactado
  border-radius: 50%; // Fundo redondo
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #218838; // Tom mais escuro no hover
    transform: scale(1.1); // Aumenta o ícone no hover
  }
`;



// Exemplo de estilização para o WeightInput
export const WeightInput = styled.input`
  width: 100px;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;


