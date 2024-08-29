import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

// Define a color palette
const colors = {
  primary: '#007bff',
  secondary: '#f8f9fa',
  accent: '#28a745',
  background: '#fafafa',
  text: '#333',
  lightText: '#777',
  border: '#ddd',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Define typography
const fonts = {
  primary: "'Roboto', sans-serif",
  secondary: "'Open Sans', sans-serif",
};

// Principal container da venda
export const VendaContainer = styled.div`
  display: flex;
  background-color: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 90vh;
  box-shadow: 0 4px 8px ${colors.shadow};
`;

// Seção de pesquisa de produtos
export const SearchSection = styled.div`
  flex: 2;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  background-color: ${colors.secondary};
`;

// Seção do carrinho de compras
export const VendaSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
`;

// Estilos para rótulos
export const Label = styled.label`
  margin-bottom: 8px;
  color: ${colors.text};
  font-weight: bold;
  font-size: 1rem;
  font-family: ${fonts.primary};
`;

// Input padrão
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  font-family: ${fonts.secondary};

  &:focus {
    border-color: ${colors.primary};
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
  border: 1px solid ${colors.border};
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    box-shadow: 0 4px 8px ${colors.shadow};
    transform: scale(1.00);
  }
`;

// Imagem do produto
export const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 10%;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

// Botão genérico
export const Button = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.primary}CC;
    transform: scale(1.05);
  }
`;

// Nome do produto
export const ProductName = styled.span`
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
  font-size: 1.1rem;
  color: ${colors.text};
  font-family: ${fonts.secondary};
`;

// Preço do produto
export const ProductPrice = styled.span`
  font-size: 1.2rem;
  color: ${colors.primary};
  margin-top: 0.8rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

// Título da seção do carrinho
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
  border-bottom: 1px solid ${colors.border};
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px ${colors.shadow};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
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
  color: ${colors.text};
  font-size: 1rem;
  font-family: ${fonts.secondary};
`;

// Preço do produto no carrinho
export const CartItemPrice = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.primary};
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
    color: ${colors.text};
  }

  svg {
    cursor: pointer;
    color: ${colors.primary};
    transition: color 0.3s ease;
  }

  svg:hover {
    color: ${colors.primary}CC;
  }
`;

// Ícone de lixeira para excluir item do carrinho
export const TrashIcon = styled(FaTrashAlt)`
  cursor: pointer;
  color: red;
  transition: color 0.3s ease;
  margin-left: 0.5rem;

  &:hover {
    color: #c82333;
  }
`;

// Input específico para granel (reutiliza estilos de Input)
export const GranelInput = styled(Input)`
  width: 80%;
  margin-top: 10px;
`;

// Container para subtotal
export const SubtotalContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: ${colors.secondary};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Rótulo para subtotal
export const SubtotalLabel = styled.h3`
  margin-bottom: 0.8rem;
  color: ${colors.text};
  font-size: 1.2rem;
  font-family: ${fonts.primary};
`;

// Valor do subtotal
export const SubtotalAmount = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.primary};
`;

// Mensagem de carrinho vazio
export const EmptyCartMessage = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: ${colors.lightText};
  font-weight: bold;
  font-size: 1.2rem;
  font-family: ${fonts.secondary};
`;

// Botão para finalizar a venda
export const CheckoutButton = styled(Button)`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  background-color: ${colors.accent};

  &:hover {
    background-color: ${colors.accent}CC;
  }
`;

// Seção de finalização de compra
export const CheckoutSection = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 0.8rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Alerta para mensagens
export const AlertMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 10px;
  font-size: 1rem;
  text-align: center;
`;

// Input para desconto
export const DiscountInput = styled.input`
  width: 30%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  text-align: left;

  &:focus {
    border-color: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Container para os botões de pagamento
export const PaymentButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin: 0.8rem 0;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

// Botão de pagamento
export const PaymentButton = styled.button<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? colors.primary : colors.secondary)};
  color: ${({ selected }) => (selected ? '#fff' : colors.primary)};
  border: 0.5px solid ${colors.primary};
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s, color 0.3s;
  width: 150px;
  text-align: center;

  &:hover {
    background-color: ${colors.primary};
    color: #fff;
  }
`;

// Wrapper do modal
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  & > div {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 26px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    margin: 12px;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Label para peso
export const LabelPeso = styled(Label)`
  // Reutiliza estilos de Label
`;

export const CartTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  margin-top: -1rem; // Ajusta a margem superior
  color: #333;
`;

export const LabelEstoqueKg = styled.label`

color: red;


`;

export const LabelQuantidade = styled.label`
  font-size: 13px;
` 
