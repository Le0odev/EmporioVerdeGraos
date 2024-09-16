import styled from 'styled-components';

// Container do resumo do pedido
export const PixContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 15px;
    padding: 1rem;

    & p {
      font-size: 1.5rem;
    }

    
  }
`;


// Container do resumo do pedido
export const CheckoutContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 15px;
    padding: 1rem;

    & h1 {
      font-size: 1.5rem;
    }

    & h2 {
      font-size: 1.25rem;
      margin-bottom: 10px
    }
  }
`;

// Seções para endereço e pagamento
export const AddressSection = styled.section`
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  padding-top: 10px;

  & h2{
    margin-bottom: 12px;
  }
`;

export const PaymentSection = styled.section`
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  padding-top: 10px;
`;

// Seção do resumo do pedido
export const SummarySection = styled.section`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.25rem;
    }
  }
`;

// Detalhes do frete e preço total
export const FreightDetails = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: #333;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 1.25rem;
  font-weight: bold;
  border-top: 2px solid #ddd;
  margin-top: 15px;

  span {
    color: #28a745;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Estilização do resumo de itens do carrinho
export const CartItemSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;

  .item-details {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .item-name {
    font-size: 0.9rem;
    color: #333;
    flex: 3;
  }
  
  .item-price {
    font-size: 0.9rem;
    color: #555;
    flex: 2;
    text-align: center;
  }

  .item-info{
    font-size: 0.9rem;
    color: #555;
    flex: 2;
    text-align: center;

  }

  .item-quantity {
    font-size: 0.9rem;
    color: #555;
    flex: 2;
    text-align: center;
  }

  .item-unit {
    font-size: 0.9rem;
    color: #555;
    flex: 1;
    text-align: center;
  }

  .item-subtotal {
    font-size: 0.9rem;
    font-weight: 500;
    color: #28a745;
    flex: 2;
    text-align: right;
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 8px;

    .item-details {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-name, .item-quantity, .item-unit, .item-subtotal {
      margin-bottom: 4px;
    }
  }
`;

export const SuccessButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: #007bff;
  }

`;

// Botão de checkout
export const CheckoutButton = styled.button`
  background-color: #28a745;
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

// Campo de entrada
export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Botão de opção de pagamento
export const PaymentOptionButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f8f9fa')};
  color: ${({ selected }) => (selected ? '#fff' : '#343a40')};
  padding: 10px 22px;
  margin-right: 10px;
  border: 1px solid ${({ selected }) => (selected ? '#007bff' : '#ddd')};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '')};
  }
`;

// Detalhes do endereço
export const AddressDetails = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0;
`;

// Campo de entrada para quantidade
export const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Overlay para o modal
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  z-index: 999; /* Deve estar abaixo do modal */
`;

/// Modal de sucesso
// Modal de sucesso
export const SuccessModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #28a745; /* Verde mais escuro para maior contraste */
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000; /* Acima do overlay */
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  width: 300px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const MapContainer = styled.div`
position: relative;
margin-top: 20px;
margin-bottom: 20px;
`;


export const PickupInfo = styled.div`
background-color: #f8f9fa;
padding: 15px;
border-radius: 8px;
border: 1px solid #dee2e6;
margin-bottom: 20px;

h2 {
  margin-bottom: 10px;
}

p {
  margin: 0;
  font-size: 16px;
}
`;