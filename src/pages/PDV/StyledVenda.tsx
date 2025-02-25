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
  secondary: "'Roboto', sans-serif",
  stock: "Arial, sans-serif"
};

// Principal container da venda
export const VendaContainer = styled.div`
  display: flex;
  background-color: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  width: 100%;
  height: 90vh;
  box-shadow: 0 4px 8px ${colors.shadow};

  @media (max-width: 768px) {
    flex-direction: column;
    margin: auto;
    width: 90%;
    height: auto;
    margin-top: 5rem;
    margin-bottom: 1rem;
    padding: 8px;

  }

`;

// Seção de pesquisa de produtos
export const SearchSection = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${colors.border};
  background-color: ${colors.secondary};

   @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${colors.border};
    padding: 0.5rem;
    
  }
`;

// Seção do carrinho de compras
export const VendaSection = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

`;

// Estilos para rótulos
export const Label = styled.label`
  margin-bottom: 6px;
  color: ${colors.text};
  font-weight: bold;
  font-size: 0.9rem;
  font-family: ${fonts.primary};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

`;

export const LabelPeso = styled.label`
  margin-bottom: 6px;
  color: #777777db;
  font-weight: bold;
  font-size: 0.8rem;
  font-family: ${fonts.primary};

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const LabelPrice = styled.label`
  margin-left: 8px;
  font-weight: bold;
  color: ${colors.primary};
  font-family: ${fonts.primary};
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }


`;

// Input padrão
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  font-family: ${fonts.secondary};
  

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

   @media (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 1rem 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
`;

// Card de produto
export const ProductCard2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 2px 6px ${colors.shadow};

  &:hover {
    background-color: ${colors.secondary};
    box-shadow: 0 4px 12px ${colors.shadow};
   
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

// Imagem do produto
export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 5%;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

// Botão genérico
export const Button = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.primary}CC;
    transform: scale(1.01);
  }

   @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;



// Nome do produto
export const ProductName = styled.span`
  font-weight: bold;
  margin-bottom: 6px;
  text-align: center;
  font-size: 0.9rem;
  color: ${colors.text};
  font-family: ${fonts.secondary};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Preço do produto
export const ProductPrice = styled.span`
  font-size: 1.1rem;
  color: ${colors.primary};
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Mensagem de carrinho vazio
export const EmptyCartMessage = styled.p`
  font-size: 1rem;
  color: ${colors.lightText};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Lista de itens do carrinho
export const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  margin: 0;

   @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

// Item individual do carrinho


// Detalhes do item do carrinho
export const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0.5rem;
  }
`;

// Nome do produto no carrinho
export const CartItemName = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
  color: ${colors.text};
  font-size: 1rem;
  font-family: ${fonts.secondary};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Preço do produto no carrinho
export const CartItemPrice = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${colors.accent};
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const PriceDiv = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${colors.primary};
  margin-top: 2px;

   @media (max-width: 768px) {
    font-size: 0.75rem;
  }

`

export const QuantityControl = styled.div`
  display: flex;
  margin-top: 12px;
  margin-bottom: 4px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 70px;  /* Reduziu a largura */
  height: 18px; /* Reduziu a altura */
`;

export const QuantityDisplay = styled.span`
  margin: 0;
  padding: 0 0.2rem; /* Reduziu o padding */
  font-size: 0.75rem; /* Reduziu o tamanho da fonte */
  font-weight: bold;
  color: ${colors.text};
  background-color: #fff;
  flex-grow: 1;
  text-align: center;
  line-height: 22px; /* Alinha o texto verticalmente no centro */
`;

export const IncrementButton = styled.button`
  border: none;
  padding: 0 0.4rem; /* Reduziu o padding */
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.6rem; /* Reduziu o tamanho da fonte */
  width: 23px;  /* Reduziu a largura */
  height: 23px; /* Reduziu a altura */

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.1);
  }
`;

export const DecrementButton = styled.button`
  border: none;
  padding: 0 0.4rem; /* Reduziu o padding */
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.6rem; /* Reduziu o tamanho da fonte */
  width: 23px;  /* Reduziu a largura */
  height: 23px; /* Reduziu a altura */

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1.1);
  }
`;





// Input específico para granel
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
export const SubtotalLabel = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: ${colors.text};
`;

// Valor do subtotal
export const SubtotalAmount = styled.span`
  font-size: 1.1rem;
  color: ${colors.accent};
  font-weight: bold;
`;

// Seção de checkout
export const CheckoutSection = styled.div`
  margin-top: auto;
  padding: 1rem;
  background-color: ${colors.secondary};
  border-top: 1px solid ${colors.border};
  border-radius: 4px;
`;

// Botão de finalizar venda
export const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

// Modal Wrapper
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal content
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 300px;

  h2 {
    margin-bottom: 1rem;
    color: ${colors.text};
  }

  div {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  button {
    margin: 0 0.5rem;
  }
`;

// AlertMessage
export const AlertMessage = styled.div<{ error?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ error }) => (error ? "#ffcccc" : "#3cb043")};
  color: ${({ error }) => (error ? "#000000" : "#ffffff")};
`


// Ações do carrinho
export const CartActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  border-top: 1px solid ${colors.border};

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`;

// PaymentButtonsContainer
export const PaymentButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

// PaymentButton
export const PaymentButton = styled.button<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#007bff' : '#ffffff')};
  color: ${props => (props.selected ? '#ffffff' : '#007bff')};
  border: 1px solid #007bff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0056b3;
    color: #ffffff;
  }
`;

// Container do item do carrinho
export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid ${colors.border};
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 6px;
  box-shadow: 0 2px 4px ${colors.shadow};
  transition: background-color 0.3s ease;
  position: relative; /* Adiciona posição relativa para o container */

  &:hover {
    background-color: ${colors.secondary};
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-bottom: 4px;
  }
`;

// Ícone de lixeira
export const TrashIcon = styled(FaTrashAlt)`
  cursor: pointer;
  color: red;
  transition: color 0.3s ease;
  position: absolute; /* Define o posicionamento absoluto */
  top: 12px;           /* Ajusta para a parte superior */
  right: 8px;         /* Ajusta para a parte direita */
  
  &:hover {
    color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
const CancelButton = styled.button`
    background-color: #d9534f; /* Vermelho */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px;

    &:hover {
        background-color: #c9302c; /* Vermelho mais escuro para hover */
    }
    `;
