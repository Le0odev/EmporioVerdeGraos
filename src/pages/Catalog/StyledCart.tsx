import styled from 'styled-components';



// Container do carrinho
export const CartContainer = styled.div`
  width: 90%; // Diminui a largura do container
  max-width: 600px; // Define um tamanho máximo para não expandir muito em telas maiores
  margin: 0 auto; // Centraliza o container
  background-color: #fff;
  width: 90%; // Diminui a largura do container
  max-width: 600px; // Define um tamanho máximo para não expandir muito em telas maiores
  margin: 0 auto; // Centraliza o container
  background-color: #fff;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);


  & h1{
  font-size: 20px;
  
  }

  @media (max-width: 768px) {
    width: 95%; // Para dispositivos móveis, ajusta a largura para ficar um pouco mais estreita
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
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #218838;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

export const SuggestedProductsContainer = styled.div`
  margin-top: 20px;
`;

export const SuggestedProduct = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const SuggestedProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
`;

export const SuggestedProductName = styled.div`
  flex: 1;
  font-size: 16px;
`;

export const SuggestedProductPrice = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;

export const AddToCartButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const SuggestionContainer = styled.div`
  margin-top: 20px;
`;

export const SuggestionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const SuggestionCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SuggestionImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

export const SuggestionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SuggestionName = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

export const SuggestionPrice = styled.p`
  font-size: 0.9em;
  color: #333;
`;