import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

// Container principal da venda
export const VendaContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  height: 90vh;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Seção de pesquisa de produtos
export const SearchSection = styled.div`
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  background-color: #fdfdfd;
`;

// Seção do carrinho de compras
export const VendaSection = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

// Estilos para rótulos
export const Label = styled.label`
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  font-size: 1.1rem;
`;

// Rótulo específico para peso
export const LabelPeso = styled(Label)`
  // Reutiliza estilos de Label
`;

// Estilos para inputs
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Formulário geral
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Grade de produtos
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 1rem 0;
  overflow-y: auto;
`;

// Card de produto
export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// Imagem do produto
export const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 20%;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }

  
`;

// Botão genérico
export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

// Nome do produto
export const ProductName = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1rem;
  color: #333;
`;

// Preço do produto
export const ProductPrice = styled.span`
  font-size: 1.2rem;
  color: #007bff;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

// Lista de itens do carrinho
export const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  margin: 0;
`;

// Item individual do carrinho
export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
    transform: scale(1.00);
  }
`;

// Detalhes do item do carrinho
export const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

// Nome do produto no carrinho
export const CartItemName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  font-size: 1rem;
`;

// Preço do produto no carrinho
export const CartItemPrice = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  margin-top: 4px;
`;

// Ações do carrinho (como excluir item)
export const CartActions = styled.div`
  display: flex;
  align-items: center;
`;

// Controle de quantidade (adicionar/remover)
export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  span {
    margin: 0 0.5rem;
    font-size: 1rem;
    color: #333;
  }

  svg {
    cursor: pointer;
    color: #007bff;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

// Ícone de lixeira para excluir item do carrinho
export const TrashIcon = styled(FaTrashAlt)`
  cursor: pointer;
  color: red;
  transition: color 0.3s ease;

  &:hover {
    color: #c82333;
  }
`;

// Botão de checkout
export const CheckoutButton = styled(Button)`
  font-size: 1.2rem;
  width: 100%;
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
`;

// Input específico para granel (reutiliza estilos de Input)
export const GranelInput = styled(Input)`
  margin-top: 10px;
`;

// Container para subtotal
export const SubtotalContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Rótulo para subtotal
export const SubtotalLabel = styled.h3`
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.2rem;
`;

// Valor do subtotal
export const SubtotalAmount = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
`;

// Mensagem de carrinho vazio
export const EmptyCartMessage = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: #777;
  font-weight: bold;
  font-size: 1.2rem;
`;

// Seção de checkout
export const CheckoutSection = styled.div`
  padding: 2rem;
  margin-top: 1.5rem;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Título da seção de checkout
export const CheckoutTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
`;

// Mensagem de checkout
export const CheckoutMessage = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #555;
`;

// Detalhes do checkout (por exemplo, subtotal)
export const CheckoutDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

// Rótulo de checkout (por exemplo, "Subtotal:")
export const CheckoutLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

// Valor de checkout (por exemplo, valor do subtotal)
export const CheckoutValue = styled.span`
  color: #007bff;
  font-weight: bold;
`;

// Total de checkout (por exemplo, total a pagar)
export const CheckoutTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

// Rótulo para total de checkout
export const CheckoutTotalLabel = styled.h3`
  font-size: 1.5rem;
  color: #555;
`;

// Valor total de checkout
export const CheckoutTotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
`;
