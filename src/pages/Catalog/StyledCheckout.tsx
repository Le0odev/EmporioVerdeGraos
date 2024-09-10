import styled from 'styled-components';

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
    }
  }
`;

export const AddressSection = styled.section`
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

export const PaymentSection = styled.section`
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
`;

export const SummarySection = styled.section`
  margin-bottom: 30px;
  padding-bottom: 20px;
`;

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

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const PaymentOptionButton = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f8f9fa')};
  color: ${({ selected }) => (selected ? '#fff' : '#343a40')};
  padding: 12px 24px;
  margin-right: 10px;
  border: 1px solid ${({ selected }) => (selected ? '#007bff' : '#ddd')};
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#e2e6ea')};
  }
`;

export const AddressDetails = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0;
`;

export const TotalPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

export const CartItemSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const FreightDetails = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: #333;
`;
